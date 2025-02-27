import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, message, category } = body;

    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const apiToken = process.env.WHATSAPP_API_TOKEN;
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

    if (!phoneNumberId || !apiToken || !templateName) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }
    const recipientPhone = process.env.BUSINESS_PHONE_NUMBER || "919034061629";
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: "en",
            },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: fullName },
                  { type: "text", text: category || "General Inquiry" },
                  { type: "text", text: message },
                  { type: "text", text: phone },
                  { type: "text", text: email },
                ],
              },
            ],
          },
        }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", result);
      return NextResponse.json(
        { error: "Failed to send WhatsApp message", details: result },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messages[0].id,
    });
  } catch (error) {
    console.error("Error in send-whatsapp API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
