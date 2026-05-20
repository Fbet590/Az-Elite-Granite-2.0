import { NextResponse } from "next/server"

const LEAD_CONNECTOR_WEBHOOK = "https://services.leadconnectorhq.com/hooks/NPdnad9F1iKmofsmCJ1l/webhook-trigger/GXzefzp1ntL07TbhnYRl"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const payload = {
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

    // Log form submission
    console.log("Lead form submission:", JSON.stringify(payload, null, 2))

    // Send to Lead Connector webhook
    const webhookResponse = await fetch(LEAD_CONNECTOR_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      console.error("Lead Connector webhook error:", webhookResponse.status, await webhookResponse.text())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
