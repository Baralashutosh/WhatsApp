export const dynamic = "force-dynamic"

import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("whatsapp")

    const messages = await db
      .collection("messages")
      .find({})
      .sort({ timestamp: -1 })
      .toArray()

    return Response.json(messages)
  } catch (error) {
    console.error(error)
    return Response.json([])
  }
}
