const express = require('express')
const {Client} = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/port', (req, res) => {
    res.send(process.env.PORT)
})

app.get('/db', async (req, res) => {
    client.connect()
    const result = await client.query('SELECT table_schema,table_name FROM information_schema.tables;')
    res.send(result.rows)
    client.end()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Node.js uygulaması http://localhost:${PORT} üzerinden ayağa kaldırıldı.`)
})
