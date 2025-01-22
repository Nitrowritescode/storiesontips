import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { url } = data;

    // Get base64 without data URI prefix
    const base64Image = await convertImage(url);

    if (!base64Image) {
      throw new Error("Failed to convert image to base64");
    }

    const fileName = "/ai-story/" + Date.now() + ".png";

    const imageRef = ref(storage, fileName);

    // Upload directly without data URI prefix

    await uploadString(imageRef, base64Image, "base64");

    const downloaderUrl = await getDownloadURL(imageRef);

    return NextResponse.json({ imageUrl: downloaderUrl });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to process image." },
      { status: 500 }
    );
  }
}

export const convertImage = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");

    return base64Image;
  } catch (error) {
    console.error("Error converting image:", error);
    return null;
  }
};
