// app/api/generate-story/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { db } from "@/config/db";
import { StoryData, Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";
import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// Initialize Gemini AI with your exact configuration
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

// Safety settings for production
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Utility function to convert image URL to base64
async function convertImageToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; StoryGenerator/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return base64;
  } catch (error) {
    throw new Error("Failed to convert image to base64");
  }
}

// Enhanced error handling
class APIError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = "APIError";
  }
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(
  userId: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const requestId = uuidv4().substring(0, 8);

  try {
    console.log(
      `[${requestId}] Story generation request started at ${new Date().toISOString()}`
    );

    // Parse and validate request body
    const body = await req.json();
    const { formData } = body;

    if (!formData || typeof formData !== "object") {
      throw new APIError(
        "Invalid request body. Form data is required.",
        400,
        "INVALID_REQUEST"
      );
    }

    const { storySubject, storyType, ageGroup, imageStyle } = formData;

    // Validate required fields
    const requiredFields = { storySubject, storyType, ageGroup, imageStyle };
    const missingFields = Object.entries(requiredFields)
      .filter(
        ([_, value]) =>
          !value || typeof value !== "string" || value.trim() === ""
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new APIError(
        `Missing or invalid required fields: ${missingFields.join(", ")}`,
        400,
        "MISSING_FIELDS"
      );
    }

    // Authentication and user validation
    const { userId } = await auth();
    const userData = await currentUser();

    if (!userId || !userData) {
      throw new APIError(
        "Authentication required. Please log in.",
        401,
        "UNAUTHORIZED"
      );
    }

    // Rate limiting
    if (!checkRateLimit(userId)) {
      throw new APIError(
        "Rate limit exceeded. Please wait before making another request.",
        429,
        "RATE_LIMITED"
      );
    }

    const userEmail =
      userData?.primaryEmailAddress?.emailAddress ??
      userData?.emailAddresses?.[0]?.emailAddress ??
      "";

    if (!userEmail) {
      throw new APIError(
        "User email not found. Please ensure your account is properly configured.",
        400,
        "MISSING_EMAIL"
      );
    }

    // Fetch user from database with error handling
    let userInDb;
    try {
      userInDb = await db
        .select()
        .from(Users)
        .where(eq(Users.userEmail, userEmail))
        .limit(1);
    } catch (dbError) {
      throw new APIError(
        "Database error. Please try again.",
        500,
        "DATABASE_ERROR"
      );
    }

    const user = userInDb?.[0];
    if (!user) {
      throw new APIError(
        "User not found. Please ensure your account is registered.",
        404,
        "USER_NOT_FOUND"
      );
    }

    // Check credits
    if (!user.credit || user.credit <= 0) {
      throw new APIError(
        "Insufficient credits. Please purchase more credits to continue.",
        403,
        "INSUFFICIENT_CREDITS"
      );
    }

    // Create chat session with your exact history template
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Create kids story on description for ${ageGroup} kids, ${storyType} story, and all images in ${imageStyle} style: ${storySubject}, give me 5 chapters, With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format.`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '```json\n{\n  "bookTitle": "Sample Story Title",\n  "cover": {\n    "imagePrompt": "A whimsical illustration in the specified art style featuring the main theme and characters, perfect for a book cover.",\n    "chapter": null,\n    "imageText": "Cover illustration description."\n  },\n  "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Chapter Title",\n      "storyText": "Engaging story content appropriate for the age group...",\n      "imagePrompt": "Detailed scene description in the specified art style.",\n      "imageText": "Brief scene description.",\n      "difficultWords": [\n        {\n          "word": "example",\n          "meaning": "definition"\n        }\n      ]\n    }\n  ],\n  "moralOfTheStory": {\n    "moral": "The positive lesson taught by this story."\n  }\n}\n```',
            },
          ],
        },
      ],
    });

    // Generate the actual story
    const prompt = `Create a ${storyType} story for ${ageGroup} kids in ${imageStyle} art style about: ${storySubject}. Make it engaging, educational, and age-appropriate with 5 chapters. Include detailed image prompts for each chapter and the cover. Return in the exact JSON format as shown in the example.`;

    let result;
    try {
      result = await chatSession.sendMessage(prompt);
    } catch (geminiError: any) {
      console.error(`[${requestId}] Gemini API error:`, geminiError);

      if (geminiError.message?.includes("quota")) {
        throw new APIError(
          "AI service quota exceeded. Please try again later.",
          503,
          "QUOTA_EXCEEDED"
        );
      }
      if (geminiError.message?.includes("rate")) {
        throw new APIError(
          "AI service rate limit exceeded. Please try again in a moment.",
          429,
          "AI_RATE_LIMITED"
        );
      }

      throw new APIError(
        `Story generation failed: ${geminiError.message}`,
        500,
        "GEMINI_ERROR"
      );
    }

    const responseText = result?.response?.text();
    if (!responseText) {
      throw new APIError(
        "No story generated from AI service.",
        500,
        "EMPTY_RESPONSE"
      );
    }

    // Parse and validate story JSON
    let story;
    try {
      // Clean the response text (remove markdown code blocks if present)
      const cleanedText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      story = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error(`[${requestId}] JSON Parse Error:`, parseError);
      console.error(
        `[${requestId}] Raw response:`,
        responseText.substring(0, 500)
      );
      throw new APIError(
        "Invalid story format received from AI. Please try again.",
        500,
        "INVALID_JSON"
      );
    }

    // Validate story structure
    if (
      !story?.bookTitle ||
      !story?.cover?.imagePrompt ||
      !Array.isArray(story?.chapters)
    ) {
      console.error(`[${requestId}] Invalid story structure:`, {
        hasTitle: !!story?.bookTitle,
        hasCover: !!story?.cover?.imagePrompt,
        hasChapters: Array.isArray(story?.chapters),
        chaptersCount: story?.chapters?.length,
      });
      throw new APIError(
        "Invalid story structure received from AI.",
        500,
        "INVALID_STRUCTURE"
      );
    }

    //Generating Cover Image with Replicate

    const imagePrompt = `Create a beautiful book cover illustration. Title: "${story.bookTitle}". Style: ${imageStyle}. Description: ${story.cover.imagePrompt}. High quality, detailed, perfect for a children's book cover.`;

    let imageOutput;
    try {
      imageOutput = await replicate.run("black-forest-labs/flux-schnell", {
        input: {
          prompt: imagePrompt,
          aspect_ratio: "1:1",
          output_format: "png",
          output_quality: 90,
          num_inference_steps: 4,
        },
      });
    } catch (replicateError: any) {
      console.error(`[${requestId}] Replicate API error:`, replicateError);
      throw new APIError(
        `Image generation failed: ${replicateError.message}`,
        500,
        "IMAGE_GENERATION_ERROR"
      );
    }

    if (!imageOutput || !Array.isArray(imageOutput) || !imageOutput[0]) {
      throw new APIError(
        "No image generated from AI service.",
        500,
        "NO_IMAGE_GENERATED"
      );
    }

    const aiImageUrl = imageOutput[0];
    console.log(`[${requestId}] Cover image generated successfully`);

    //Convert and Save Image to Firebase
    let base64Image;
    try {
      base64Image = await convertImageToBase64(aiImageUrl);
    } catch (conversionError) {
      console.error(`[${requestId}] Image conversion error:`, conversionError);
      throw new APIError(
        "Failed to process generated image.",
        500,
        "IMAGE_CONVERSION_ERROR"
      );
    }

    const fileName = `/ai-story/${Date.now()}-${requestId}.png`;
    const imageRef = ref(storage, fileName);

    let firebaseImageUrl;
    try {
      await uploadString(imageRef, base64Image, "base64");
      firebaseImageUrl = await getDownloadURL(imageRef);
    } catch (firebaseError) {
      console.error(`[${requestId}] Firebase storage error:`, firebaseError);
      throw new APIError(
        "Failed to save image. Please try again.",
        500,
        "STORAGE_ERROR"
      );
    }

    // Step 4: Save Story to Database
    const storyId = uuidv4();

    let insertResult;
    try {
      insertResult = await db
        .insert(StoryData)
        .values({
          storyId,
          ageGroup,
          imageStyle,
          storyType,
          storySubject,
          output: story,
          coverImage: firebaseImageUrl,
          userEmail: user.userEmail,
          userName: user.userName || userData.fullName || "",
          userImage: user.userImage || userData.imageUrl || "",
        })
        .returning({ storyId: StoryData.storyId });
    } catch (dbError) {
      console.error(`[${requestId}] Database insertion error:`, dbError);
      throw new APIError(
        "Failed to save story to database.",
        500,
        "DATABASE_SAVE_ERROR"
      );
    }

    if (!insertResult || !insertResult[0]) {
      throw new APIError(
        "Failed to save story to database.",
        500,
        "DATABASE_SAVE_FAILED"
      );
    }

    // Step 5: Update User Credits

    try {
      await db
        .update(Users)
        .set({ credit: user.credit - 1 })
        .where(eq(Users.userEmail, userEmail));
    } catch (creditError) {
      console.error(`[${requestId}] Credit update error:`, creditError);
      // Don't fail the request if credit update fails, but log it
      console.warn(`[${requestId}] Story was created but credit update failed`);
    }

    const endTime = Date.now();
    const processingTime = endTime - startTime;

    // Return success response
    return NextResponse.json(
      {
        success: true,
        requestId,
        storyId: insertResult[0].storyId,
        story: {
          bookTitle: story.bookTitle,
          coverImage: firebaseImageUrl,
          chaptersCount: story.chapters?.length || 0,
          moral: story.moralOfTheStory?.moral || null,
        },
        processingTime,
        creditsRemaining: user.credit - 1,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Request-ID": requestId,
        },
      }
    );
  } catch (error: any) {
    const endTime = Date.now();
    const processingTime = endTime - startTime;

    // Handle specific error types
    if (error instanceof APIError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
          requestId,
          processingTime,
          timestamp: new Date().toISOString(),
        },
        {
          status: error.status,
          headers: {
            "X-Request-ID": requestId,
          },
        }
      );
    }

    // Handle unexpected errors

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
        code: "INTERNAL_ERROR",
        requestId,
        processingTime,
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "X-Request-ID": requestId,
        },
      }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "story-generation-api",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
