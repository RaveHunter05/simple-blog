const app = require('express');
const router = app.Router();

const jwt = require('jsonwebtoken')

const {db, forceTable, alterTable} = require('./settings')

router.use('/blog', require('../blog/urls'))

// Esto esta hardcodeado, hay que componerlo alv
router.post('/login', (req,res) =>{
    // Mock user
    const user = {
        id: 1,
        username: 'paul',
        email: 'paul@gmail.com'
    }
    
    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token)=>{
        res.json({
            token
        })
    })
})

function dataBase(){
    db.authenticate()
    .then(()=>console.log('Connected'))
    .catch(err => console. log('There was an error', err))
    alterTable()
}

module.exports = {router, dataBase}