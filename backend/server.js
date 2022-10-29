const express = require('express')
const port = process.env.PORT || 5000

app = express()

app.listen(port, console.log(`Server is listening at port ${port}`))