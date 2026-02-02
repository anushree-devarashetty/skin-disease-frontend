import { useState } from "react"
import { supabase } from "./supabase"

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      onLogin(data.user)
    }
    setLoading(false)
  }

  const signup = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful! Please login.")
    }
    setLoading(false)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        marginTop: "20px",
      }}
    >
      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(255,255,255,0.12)",
          color: "#ffffff",
          fontSize: "14px",
          outline: "none",
        }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(255,255,255,0.12)",
          color: "#ffffff",
          fontSize: "14px",
          outline: "none",
        }}
      />

      {/* LOGIN BUTTON */}
      <button
        onClick={login}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          fontWeight: "600",
          fontSize: "15px",
          cursor: "pointer",
          background: "linear-gradient(135deg, #ff6ec4, #4d7cff)",
          color: "white",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* SIGNUP BUTTON */}
      <button
        onClick={signup}
        disabled={loading}
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          fontWeight: "600",
          fontSize: "15px",
          cursor: "pointer",
          background: "linear-gradient(135deg, #ff9ad5, #7f8cff)",
          color: "white",
        }}
      >
        Signup
      </button>
    </div>
  )
}
