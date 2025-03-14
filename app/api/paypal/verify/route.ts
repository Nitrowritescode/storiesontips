import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ success: false, message: "Missing order ID." }, { status: 400 });
    }

    // ✅ Capture payment from PayPal
    const response = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
        ).toString("base64")}`,
      },
    });

    const data = await response.json();

    if (data.status === "COMPLETED") {
      return NextResponse.json({ success: true, message: "Payment successful!", orderID });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed." }, { status: 500 });
    }
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
