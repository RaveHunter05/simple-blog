const app = require('express');
const router = app.Router();

// const db = require('./settings')

router.use('/blog', require('../blog/urls'))

function dataBase(){
    // db.authenticate()
    // .then(()=>console.log('Connected'))
    // .catch(err => console.log('There was an error', err))
    console.log('hacer esto despues')
}

module.exports = {router, dataBase}