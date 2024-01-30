const express = require("express")
const {host, port} = require("./settings")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.delete("/api/v1/tasks/:pk", (req, res) => {
    res.status(200).end()
})

app.patch("/api/v1/tasks/:pk", (req, res) => {
    const {pk} = req.params
    const completed = req.body.completed === "true"
    res.status(200).json({pk, completed})
})

app.listen(port, host, () => {
    // noinspection HttpUrlsUsage
    console.log(`Running Express server at http://${host}:${port}`)
})
