import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log("[v0] Received form data:", JSON.stringify(data, null, 2))
    
    const webhookData = {
      projectType: data.projectType,
      space: data.space,
      budget: data.budget,
      budgetFlexibility: data.budgetFlexibility,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      submittedAt: new Date().toISOString(),
      source: "AZ ELITE Granite Website"
    }

    console.log("[v0] Sending to webhook:", JSON.stringify(webhookData, null, 2))

    const webhookResponse = await fetch(
      "https://services.leadconnectorhq.com/hooks/NPdnad9F1iKmofsmCJ1l/webhook-trigger/b1bfbeab-7afb-458e-b949-ad7d712de2ac",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      }
    )

    console.log("[v0] Webhook response status:", webhookResponse.status)
    
    const responseText = await webhookResponse.text()
    console.log("[v0] Webhook response body:", responseText)

    if (!webhookResponse.ok) {
      console.error("[v0] Webhook error:", webhookResponse.status, responseText)
      return NextResponse.json(
        { success: false, error: "Webhook failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API route error:", error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
