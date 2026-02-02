import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export default function History({ user }) {
  const [data, setData] = useState([])

  useEffect(() => {
    supabase
      .from("predictions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(res => setData(res.data))
  }, [])

  return (
    <div>
      <h2>Prediction History</h2>
      {data.map(item => (
        <div key={item.id}>
          <img src={item.image_url} width="100" />
          <p>{item.disease} ({(item.confidence * 100).toFixed(1)}%)</p>
        </div>
      ))}
    </div>
  )
}
