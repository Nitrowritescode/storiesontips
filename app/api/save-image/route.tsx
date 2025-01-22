import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { convertImage } from "@/app/utils/convertImage";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { url } = data;

    const base64Image = await convertImage(url);

    if (!base64Image) {
      throw new Error("Failed to convert image to base64");
    }

    const fileName = "/ai-story/" + Date.now() + ".png";
    const imageRef = ref(storage, fileName);

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
