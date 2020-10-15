const app = require('express');
const router = app.Router();

const {db, forceTable, alterTable} = require('./settings')

router.use('/blog', require('../blog/urls'))

router.use('/', require('../users/urls'))

// Esto esta hardcodeado, hay que componerlo alv


function dataBase(){
    db.authenticate()
    .then(()=>console.log('Connected'))
    .catch(err => console. log('There was an error', err))
    alterTable()
}

module.exports = {router, dataBase}