const bodyParser = require('body-parser')
const express = require('express')

// Redirectioning to main app
const main = require('./main/urls')

// Adding express-fileupload
const upload = require('express-fileupload')

//  Adding JWT
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// Using dotenv
const dotenv=require('dotenv').config()

//Inicializar express
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser)

app.use(upload())

//Para inicializar la base de datos y redirigir a la ruta principal
main.dataBase();
app.use('/', main.router)

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log('Server started at port 8000'))