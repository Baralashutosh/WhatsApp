"use client"
import { useState } from "react"

export default function Home() {
  const [phone, setPhone] = useState("")
  const [text, setText] = useState("")

  const sendMessage = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, text })
    })

    alert("Message Sent!")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>WhatsApp Manual Reply</h1>

      <input
        placeholder="Customer Phone (91xxxxxxxxxx)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <textarea
        placeholder="Type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
