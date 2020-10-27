const app = require('express');
const router = app.Router();

const jwt = require('jsonwebtoken')

const {User} = require('./models')

let {userController} = require('./controllers')

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

router.post('/register', userController.userRegister)

//Ejemplo de middleware para restringir el acceso a solo gente logeada

router.get('/users', checkAuthentication , userController.showUsers)

router.get('/current', checkAuthentication, userController.showCurrentUser)

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){return next()}
    res.send('is not authenticated')
}

module.exports = router