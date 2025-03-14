import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userEmail, creditsToAdd } = await req.json();

    // ✅ Validate input data
    if (!userEmail || !creditsToAdd) {
      return NextResponse.json({ success: false, message: "Invalid input data." }, { status: 400 });
    }

    // ✅ Ensure creditsToAdd is a number
    const parsedCredits = Number(creditsToAdd);
    if (isNaN(parsedCredits) || parsedCredits <= 0) {
      return NextResponse.json({ success: false, message: "Invalid credits value." }, { status: 400 });
    }

    // ✅ Fetch current user data to ensure credit is a number
    const user = await db.select().from(Users).where(eq(Users.userEmail, userEmail)).limit(1);
    if (!user.length) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    const currentCredits = user[0].credit || 0; // Default to 0 if undefined

    // ✅ Update user credits safely
    await db
      .update(Users)
      .set({ credit: currentCredits + parsedCredits })
      .where(eq(Users.userEmail, userEmail));

    return NextResponse.json({ success: true, message: "Coins added successfully!" });
  } catch (error) {
    console.error("Update Coins Error:", error);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
