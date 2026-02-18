"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [messages, setMessages] = useState([])
  const [replyText, setReplyText] = useState("")
  const [selectedPhone, setSelectedPhone] = useState("")

  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(data => setMessages(data))
  }, [])

  const sendReply = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: selectedPhone, text: replyText })
    })

    alert("Reply sent")
    setReplyText("")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>WhatsApp Dashboard</h1>

      <h2>Messages</h2>

      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <strong>{msg.phone}</strong>: {msg.text}
          <button onClick={() => setSelectedPhone(msg.phone)}>
            Reply
          </button>
        </div>
      ))}

      {selectedPhone && (
        <div style={{ marginTop: 20 }}>
          <h3>Reply to {selectedPhone}</h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={sendReply}>Send</button>
        </div>
      )}
    </div>
  )
}
