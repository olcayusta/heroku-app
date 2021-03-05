const express = require('express')
const {Client, Pool} = require('pg')

/*DATABASE_URL = 'postgres://postgres:123456@localhost:5432/postgres'
const client = new Client({
    connectionString: DATABASE_URL
})*/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/port', (req, res) => {
    res.send(process.env.PORT)
})

app.get('/db', async (req, res) => {
    /*    const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect()
        const {rows} = await client.query('SELECT table_schema,table_name FROM information_schema.tables;')
        res.send(rows)
        await client.end()*/

    const {rows} = await pool.query('SELECT table_schema,table_name FROM information_schema.tables;')
    res.send(rows)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Node.js uygulaması http://localhost:${PORT} üzerinden ayağa kaldırıldı.`)
})
