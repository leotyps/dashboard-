const express = require('express')
const { Pool } = require('pg')

const app = express()

// Koneksi ke PostgreSQL menggunakan URL yang disediakan
const pool = new Pool({
  connectionString: 'postgresql://valzyy:_aZGK-UPaPUEsHuYnayfEA@dashboard-8638.j77.aws-ap-southeast-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
  ssl: {
    rejectUnauthorized: false
  }
})

app.use(express.json())

app.post('/api/auth/save-data', async (req, res) => {
  const { team_id, apikey } = req.query

  if (!team_id || !apikey) {
    return res.status(400).json({ error: 'team_id and apikey are required' })
  }

  try {
    // Query untuk menyimpan data ke tabel pengguna
    const query = `
      INSERT INTO pengguna (team_id, apikey)
      VALUES ($1, $2)
      ON CONFLICT (team_id) DO UPDATE
      SET apikey = EXCLUDED.apikey;
    `

    const result = await pool.query(query, [team_id, apikey])

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'User data saved successfully' })
    } else {
      res.status(500).json({ error: 'Failed to save user data' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
