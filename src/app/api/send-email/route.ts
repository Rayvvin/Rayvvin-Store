import { NextResponse } from "next/server"
import { transporter } from "@lib/mailer"
import {
  buildOrderEmailContext,
  buildCustSignupContext,
  buildNewsletterContext,
} from "@lib/context-builders"
import pug from "pug"
import path from "path"

export async function POST(req: Request) {
  if (req.method !== "POST")
    return new NextResponse("Method Not Allowed", { status: 405 })

  const { type, data } = await req.json()
  if (!type || !data)
    return NextResponse.json(
      { message: "Missing type or data." },
      { status: 400 }
    )

  let templateName = ""
  let subject = ""
  let toEmail = ""
  let context: any

  try {
    switch (type) {
      case "order":
        templateName = "orderPlaced"
        subject = `Order Confirmation - ${data.id}`
        toEmail = data.email
        context = buildOrderEmailContext(data)
        break
      case "invite":
        templateName = "inviteCreated"
        subject = "You are Invited!"
        toEmail = data.email
        context = data
        break
      case "customer_signup":
        templateName = "customerSignup"
        subject = "Welcome to Afriomarkets!"
        toEmail = data.email
        context = buildCustSignupContext(data)
        break
      case "newsletter":
        templateName = "newsletter"
        subject = data.title
        toEmail = data.email
        context = buildNewsletterContext(data)
        break
      default:
        return NextResponse.json(
          { message: "Unsupported email type." },
          { status: 400 }
        )
    }

    const templatePath = path.join(
      process.cwd(),
      "templates",
      templateName,
      "html.pug"
    )
    const htmlContent = pug.renderFile(templatePath, context)

    await transporter.sendMail({
      from: `"Afriomarket Stores" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject,
      html: htmlContent,
    })

    return NextResponse.json(
      { message: `Email sent to ${toEmail}` },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Email error:", error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
