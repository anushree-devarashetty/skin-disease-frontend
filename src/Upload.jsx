import { useState } from "react"
import axios from "axios"
import { supabase } from "./supabase"
import jsPDF from "jspdf"

export default function Upload({ user }) {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  // -------------------------
  // CONFIDENCE HELPERS
  // -------------------------
  const confidenceLabel = (c) => {
    if (c >= 0.4) return "High"
    if (c >= 0.2) return "Moderate"
    return "Low"
  }

  const similarityScore = (c) =>
    Math.min(100, ((c / 0.15) * 100)).toFixed(1)

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  // -------------------------
  // PDF REPORT
  // -------------------------
  const generateReport = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Skin Condition AI Analysis Report", 20, 20)

    doc.setFontSize(12)
    doc.text(`Generated for educational assistance`, 20, 35)
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 45)

    doc.setFontSize(14)
    doc.text("AI Visual Analysis Result", 20, 65)

    doc.setFontSize(12)
    doc.text(`Detected Condition:`, 20, 80)
    doc.text(result.predicted_disease, 20, 90)

    doc.text(
      `Confidence Level: ${confidenceLabel(result.confidence)}`,
      20,
      105
    )

    doc.text(
      `Similarity Score: ${similarityScore(result.confidence)}%`,
      20,
      115
    )

   doc.text("Top Visually Similar Conditions:", 20, 135)

result.top_3_predictions.forEach((p, i) => {
  doc.text(
    `${i + 1}. ${p.disease}`,
    20,
    150 + i * 10
  )
})

doc.setFontSize(10)
doc.text(
  "Disclaimer: This system provides AI-assisted visual similarity analysis only. "
  + "It is NOT a medical diagnosis. Always consult a certified dermatologist.",
  20,
  190,
  { maxWidth: 170 }
)
    doc.save("skin-ai-report.pdf")
  }

  // -------------------------
  // UPLOAD + PREDICT
  // -------------------------
  const uploadAndPredict = async () => {
    if (!file) {
      alert("Please select an image")
      return
    }

    setLoading(true)

    try {
      const fileName = `${user.id}-${Date.now()}.jpg`
      await supabase.storage.from("skin-images").upload(fileName, file)

      const formData = new FormData()
      formData.append("file", file)

     const res = await axios.post(
  "https://skin-disease-api.onrender.com/predict",
  formData
)

      setResult(res.data)
    } catch (err) {
      alert("Prediction failed")
    }

    setLoading(false)
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div style={{ maxWidth: 540, margin: "0 auto" }}>
      <h2>Upload Skin Image</h2>

      <button
  onClick={logout}
  style={{
    background: "linear-gradient(135deg, #ff6ec4, #ff5c5c)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  }}
  onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
>
  Logout
</button>


      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadAndPredict} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Detected Condition</h3>
          <p style={{ color: "#aab7ff" }}>
            {result.predicted_disease}
          </p>

          <p>
            <strong>Confidence Level:</strong>{" "}
            {confidenceLabel(result.confidence)}
          </p>

          <p>
            <strong>Similarity Score:</strong>{" "}
            {similarityScore(result.confidence)}%
          </p>

          <p style={{ color: "#ffd36a", fontSize: 14 }}>
            ℹ️ Result based on visual similarity patterns.  
            Low confidence indicates overlapping symptoms across conditions.
          </p>

          <h4>Visually Similar Conditions</h4>
          <ul>
            {result.top_3_predictions.map((p, i) => (
              <li key={i}>
                {p.disease} — {(p.confidence * 100).toFixed(2)}%
              </li>
            ))}
          </ul>

          <button onClick={generateReport}>
            📄 Download Doctor-Ready Report
          </button>

          {/* ---------------- MAPS EMBED ---------------- */}
          <h3 style={{ marginTop: 40 }}>Dermatologists Near You</h3>

          <iframe
            title="Dermatologists Near Me"
            src="https://www.google.com/maps?q=dermatologist+near+me&output=embed"
            width="100%"
            height="300"
            style={{ borderRadius: 12, border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
      )}

      {/* ---------------- ABOUT US ---------------- */}
      <div style={{ marginTop: 60 }}>
        <h3>About This Project</h3>
       <p style={{ fontSize: 14, lineHeight: 1.6 }}>
  This project is being developed by
  <strong> Anushree Devarashetty, Swara Wairkar, and Saumya Shah</strong>,
  B.Tech 3rd year students, to explore how Artificial Intelligence can
  assist in preliminary visual analysis of skin conditions. The system
  leverages a large, publicly available dermatology image dataset
  covering multiple skin disease categories, and involved extensive
  work in data understanding, preprocessing, model training,
  confidence interpretation, and responsible result presentation.
  The application is designed strictly for educational and research
  purposes, aiming to promote early awareness and informed medical
  consultation rather than diagnosis.
</p>


        <p style={{ fontSize: 14 }}>
          The system is designed for educational and research purposes
          and aims to promote awareness, early observation, and informed
          medical consultation.
        </p>
      </div>

      {/* ---------------- FEEDBACK ---------------- */}
      <div style={{ marginTop: 30 }}>
        <h4>Feedback & Support</h4>
        <p style={{ fontSize: 14 }}>
          We welcome feedback to improve this system.
        </p>

        <a
          href="mailto:help@gmail.com"
          style={{ color: "#8faaff", fontWeight: "bold" }}
        >
          📧 Mail us at help@gmail.com
        </a>
      </div>
    </div>
  )
}
