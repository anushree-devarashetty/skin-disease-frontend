import { useState } from "react"
import Auth from "./Auth"
import Upload from "./Upload"

function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, #ff6ec4, transparent 40%)," +
            "radial-gradient(circle at bottom right, #4d7cff, transparent 45%)," +
            "#0b0f2b",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            padding: "30px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 20px 50px rgba(77,124,255,0.35)," +
              "0 10px 30px rgba(255,110,196,0.25)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#f5f7ff",
              letterSpacing: "0.5px",
            }}
          >
            Skin Disease Detection
          </h2>

          <Auth onLogin={setUser} />
        </div>
      </div>
    )
  }

  return <Upload user={user} />
}

export default App
