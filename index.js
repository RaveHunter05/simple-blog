const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

//Inicializar express
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('/', require('./main/urls'))

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log('Server started at port 8000'))