const express = require('express')
const path = require('path')

const app = express()


const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log('Server started at port 8000'))