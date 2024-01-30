const express = require("express")
const {host, port} = require("./settings")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.delete("/api/v1/tasks/:uuid", (req, res) => {
    const {uuid} = req.params
    console.log(`DELETE Task('${uuid}')`)
    res.status(200).end()
})

app.patch("/api/v1/tasks/:uuid", (req, res) => {
    const {uuid} = req.params
    const {completed} = req.body
    console.log(`PATCH Task('${uuid}') switch completed to ${completed}`)
    res.status(200).json({completed:completed})
})

app.listen(port, host, () => {
    // noinspection HttpUrlsUsage
    console.log(`Running Express server at http://${host}:${port}`)
})
