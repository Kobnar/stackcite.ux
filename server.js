const express = require('express')
const path = require('path')

const port = process.env.PORT || 8080

const app = express()

// Serve static assets
app.use(
    express.static(
        path.resolve(__dirname, 'build')
    )
)

// Always return index.html
app.get('*', (request, response) => {
    response.sendFile(
        path.resolve(__dirname, 'build', 'index.html')
    )
})

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
})

module.exports = app;