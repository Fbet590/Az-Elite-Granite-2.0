import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Log form submission (can be connected to your preferred CRM/webhook later)
    console.log("Lead form submission:", JSON.stringify({
      projectType: data.projectType,
      space: data.space,
      budget: data.budget,
      budgetFlexibility: data.budgetFlexibility,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      submittedAt: new Date().toISOString(),
      source: "AZ ELITE Granite Website"
    }, null, 2))

    // Return success - integrate with your preferred CRM/email service here
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
