const express = require('express')
const {Client} = require('pg')

const client = new Client({
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

app.get('/db', (req, res) => {
    client.connect()

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Node.js uygulaması ${PORT} üzerinden ayağa kaldırıldı.`)
})
