import { useState } from "react";

function App() {
  const [chat, setChat] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

 const analyzeChat = async () => {
  setLoading(true);

  const response = await fetch(
    "http://127.0.0.1:8000/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: chat,
      }),
    }
  );

  const data = await response.json();
  setResult(data);

  setLoading(false);
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Replify AI 🚀
      </h1>
<p className="subtitle">
  Generate smart replies for any conversation.
</p>
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
       <textarea
  value={chat}
  onChange={(e) => setChat(e.target.value)}
  placeholder="Paste chat here..."
  style={{
    width: "100%",
    minHeight: "180px",
    padding: "15px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "16px",
    resize: "vertical",
  }}
/>
        

        <button
  onClick={analyzeChat}
  style={{
  marginTop: "15px",
  width: "100%",
  padding: "15px",
  borderRadius: "15px",
  cursor: "pointer",
  background: "#4f46e5",
  color: "white",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
}}
>
  {loading ? "🔄 Analyzing..." : "Analyze Conversation"}
</button>

        {result && (
          <div
            style={{
              marginTop: "30px",
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
           <div className="stats-container">
  <div className="stat-card">
    <h3>😊 Emotion</h3>
    <p>{result.friend_emotion}</p>
  </div>

  <div className="stat-card">
    <h3>💚 Health</h3>
    <p>{result.conversation_health}/100</p>
  </div>

  <div className="stat-card">
    <h3>⚠️ Risk</h3>
    <p>{result.misunderstanding_risk}</p>
  </div>
</div>

<hr
  style={{
    margin: "30px 0",
    border: "1px solid rgba(255,255,255,0.15)",
  }}
/>

<h2>💬 Suggested Replies</h2>

<div className="reply-card">
  <h3>😊 Friendly</h3>
  <p>{result.reply_styles?.friendly}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.friendly)}>
    📋 Copy
  </button>
</div>

<div className="reply-card">
  <h3>🤝 Supportive</h3>
  <p>{result.reply_styles?.supportive}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.supportive)}>
    📋 Copy
  </button>
</div>

<div className="reply-card">
  <h3>😂 Funny</h3>
  <p>{result.reply_styles?.funny}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.funny)}>
    📋 Copy
  </button>
</div>

<div className="reply-card">
  <h3>💼 Professional</h3>
  <p>{result.reply_styles?.professional}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.professional)}>
    📋 Copy
  </button>
</div>

<div className="reply-card">
  <h3>🔥 Confident</h3>
  <p>{result.reply_styles?.confident}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.confident)}>
    📋 Copy
  </button>
  </div>
  <div className="reply-card">
  <h3>😉 Flirty</h3>
  <p>{result.reply_styles?.flirty}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.flirty)}>
    📋 Copy
  </button>
</div>
<div className="reply-card">
  <h3>🎩 Formal</h3>
  <p>{result.reply_styles?.formal}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.formal)}>
    📋 Copy
  </button>
</div>
<div className="reply-card">
  <h3>🙏 Apologetic</h3>
  <p>{result.reply_styles?.apologetic}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.apologetic)}>
    📋 Copy
  </button>
</div>
<div className="reply-card">
  <h3>🚀 Motivational</h3>
  <p>{result.reply_styles?.motivational}</p>
  <button onClick={() => copyToClipboard(result.reply_styles?.motivational)}>
    📋 Copy
  </button>
</div>


            <div className="reply-card">
  <h3>💡 Communication Tip</h3>
  <p>{result.communication_tip}</p>
</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;