const express = require("express")
const {host, port} = require("./settings")

const app = express()

app.use(express.json())

app.delete("/api/v1/tasks/:uuid", (req, res) => {
    const {uuid} = req.params
    console.log(`DELETE Task('${uuid}')`)
    res.status(200).end()
})

app.patch("/api/v1/tasks/:uuid", (req, res) => {
    const {uuid} = req.params
    console.log(`PATCH Task('${uuid}')`)
    res.status(200).end()
})

app.listen(port, host, () => {
    // noinspection HttpUrlsUsage
    console.log(`Running Express server at http://${host}:${port}`)
})
