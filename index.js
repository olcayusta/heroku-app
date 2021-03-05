import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/port', (req, res) => {
    res.send(process.env.PORT)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Node.js uygulaması ${PORT} üzerinden ayağa kaldırıldı.`)
})
