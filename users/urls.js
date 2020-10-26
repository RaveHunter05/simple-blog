const app = require('express');
const router = app.Router();

const jwt = require('jsonwebtoken')

const session = require('express-session')

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

router.get('/', (req,res) =>{
    res.send('redirigido correctamente')
})

router.get('/error', (req,res) =>{
    res.send('redirigido incorrectamente')
})

router.post('/register', (req,res) =>{
    const {name, password, email, nickname} = req.body
    User.findOne({where:{email}})
    .then(user =>{
        if(user){
            res.send('user already exists')
        }else{
            User.create({name, password, email, nickname})
            // Aquí hace falta 
            .then(response => res.json({"respuesta": response}))
            .catch(err => console.error("There was an error", err))
        }
    })
    .catch(err => console.error(err))
    
})

//Ejemplo de middleware para restringir el acceso a solo gente logeada

router.get('/users', checkAuthentication , (req,res) =>{
    User.findAll()
        .then(blogs=>{
            res.json({"respuestas": blogs})
        })
        .catch(err=> console.error(err))
})

router.get('/current', checkAuthentication, (req,res)=>{
    // req.user contains the information provided by deserializeUser
    let variable = req.user
    res.send(variable)
})

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){return next()}
    res.send('is not authenticated')
}

module.exports = router