const app = require('express');
const router = app.Router();

const jwt = require('jsonwebtoken')
const passport = require('passport')
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy

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

// Login dinámico

passport.use(new PassportLocal(function(username, password, done){
    User.findOne({where:{email:username, password}})
    .then(x=>{
        (x) ? done(null,x) : done(null,false)
    })
    .catch(err=>{
        return done(err)
    })
}))

// Este es el dato que se guarda del usuario en la cookie (hasta donde tengo entendido)

passport.serializeUser(function(user, done){
    done(null, user.id)
})

// Este es el dato que se retorna del usuario cuando escribe req.user posteriormente

passport.deserializeUser(function(id, done){
    User.findOne({where:{id}})
    .then(x=> done(null, x))
    .catch(err=> console.error(err))
})

router.get('/', (req,res) =>{
    res.send('redirigido correctamente')
})

router.get('/error', (req,res) =>{
    res.send('redirigido incorrectamente')
})

router.use(session({
    secret: 'lorem ipsum dolor sit amet',
    resave: true,
    saveUninitialized: true
}))

router.use(passport.initialize())
router.use(passport.session())

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

router.get('/isLogged', (req,res,next)=>{
    if(req.isAuthenticated()){
        res.send('yes')
    }
    res.send('no')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/error"
}))

router.post('/logout', (req,res) =>{
    req.logout()
    res.send('deslogeado')
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