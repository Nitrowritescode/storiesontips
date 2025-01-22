import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const input = {
      prompt: prompt,
      aspect_ratio: "1:1",
      output_format: "png",
      output_quality: 80,
    };

    console.log("Calling Replicate API...");
    const output:any = await replicate.run("black-forest-labs/flux-schnell", {
      input,
    });
  
    return NextResponse.json({"imageUrl":output[0].url().href}) // to be checked for further optimized, not optimized code
}
