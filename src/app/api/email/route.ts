import { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "@lib/mailer";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER!,
      to,
      subject,
      text,
    });
    res.status(200).send("Email sent: " + info.response);
  } catch (error: any) {
    res.status(500).send(error.toString());
  }
}
