import clientPromise from "@/lib/mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db("whatsapp")

  const messages = await db
    .collection("messages")
    .find({})
    .sort({ timestamp: -1 })
    .toArray()

  return Response.json(messages)
}
