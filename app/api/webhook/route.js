import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req) {
  const VERIFY_TOKEN = "myverifytoken"

  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }

  return new Response("Verification failed", { status: 403 })
}

export async function POST(req) {
  const body = await req.json()

  const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

  if (message) {
    const client = await clientPromise
    const db = client.db("whatsapp")

    await db.collection("messages").insertOne({
      phone: message.from,
      text: message.text?.body || "",
      timestamp: new Date(),
    })
  }

  return NextResponse.json({ success: true })
}
