import express from "express"
import cors from "cors"
import pg from "pg"
import "dotenv/config"

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const app = express()
const PORT = process.env.PORT || 3001
const WORDS = ["apple", "grape", "mango", "peach", "melon", "berry", "olive", "plumb".slice(0,5)]

app.use(cors())
app.use(express.json())

app.get("/api/word", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT word FROM words ORDER BY RANDOM() LIMIT 1"
    )
    res.json({ word: result.rows[0].word })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})

app.get("/api/word", (req, res) => {
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
  res.json({ word: randomWord })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})