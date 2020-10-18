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

passport.use(new PassportLocal(function(username, password, done){
    // if(username === "codigofacilito" && password === "123"){
    //     return done(null, {id: 1, name: "Paul"})
    // }
    // done(null, false)
    User.findOne({where:{email:username, password}})
    .then(x=>{
        (x) ? done(null,x) : done(null,false)
    })
    .catch(err=>{
        return done(err)
    })
}))

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    done(null, id)
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

router.get('/users', (req,res) =>{
    User.findAll()
        .then(blogs=>{
            res.json({"respuestas": blogs})
        })
        .catch(err=> console.error(err))
})

module.exports = router