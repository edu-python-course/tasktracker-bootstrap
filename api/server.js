const express = require("express")
const {host, port} = require("./settings")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.delete("/api/v1/tasks/:uuid", (req, res) => {
    res.status(204).end()
})

app.patch("/api/v1/tasks/:uuid", (req, res) => {
    const {uuid} = req.params
    const completed = req.body.completed === "true"
    res.status(202).json({uuid, completed})
})

app.listen(port, host, () => {
    // noinspection HttpUrlsUsage
    console.log(`Running Express server at http://${host}:${port}`)
})
