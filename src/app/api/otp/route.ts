import { NextApiRequest, NextApiResponse } from "next"
import AWS from "aws-sdk"
import { NextResponse } from "next/server"

const otpMemory: Record<string, { count: number; time: number }> = {}

export async function GET(req: Request) {
  const url = new URL(req.url)
  // Fallback to "unknown" if the IP cannot be determined
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  const now = Date.now()
  const windowMs = 60 * 1000

  if (!otpMemory[ip as string]) {
    otpMemory[ip as string] = { count: 1, time: now }
  } else {
    const data = otpMemory[ip as string]
    if (now - data.time < windowMs) {
      if (data.count >= 3)
        return NextResponse.json(
          { message: "Too many OTP requests from this IP." },
          { status: 429 }
        )
      data.count++
    } else {
      otpMemory[ip as string] = { count: 1, time: now }
    }
  }

  const otp = Math.floor(1000 + Math.random() * 9000)

  const params = {
    Message: `Your verification code is ${otp}`,
    PhoneNumber: "+" + url.searchParams.get("phone"),
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: url.searchParams.get("subject") as string,
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  }

  try {
    const result = await new AWS.SNS({ apiVersion: "2010-03-31" })
      .publish(params)
      .promise()
    return NextResponse.json({ MessageID: result.MessageId, OTP: otp })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
