const app = require('express');
const router = app.Router();

const jwt = require('jsonwebtoken')
const passport = require('passport')

const {User} = require('./models')

// router.post('/login', (req,res) =>{
//     // Mock user
//     const user = {
//         id: 1,
//         username: 'paul',
//         email: 'paul@gmail.com'
//     }
     
//     jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token)=>{
//         res.json({
//             token
//         })
//     })
// })

router.post('/login', (req,res) =>{
    const {email} = req.body
    User.findOne({where:{email}})
    .then(user =>{
        if(user){
            res.send('user already exists')
        }else{
            res.send("user doesn't exist")
        }
    })
    .catch(err => console.error(err))
    
})

router.post('/logout', (req,res) =>{
    
})

router.get('/register', (req,res) =>{
    User.findAll()
        .then(blogs=>{
            res.json({"respuestas": blogs})
        })
        .catch(err=> console.error(err))
})

module.exports = router