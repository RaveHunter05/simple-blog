const app = require('express');
const router = app.Router();

const passport = require('passport')
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy

const {db, forceTable, alterTable} = require('./settings')

const {User} = require('../users/models')

// A partir de aquí va el login y demas

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

router.use(session({
    secret: 'lorem ipsum dolor sit amet',
    resave: true,
    saveUninitialized: true
}))

router.use(passport.initialize())
router.use(passport.session())

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

// Aqui las rutas, por alguna razon de la vida
// tengo que ponerlas después de la autentificación y todo ese desvergue

router.use('/blog', checkAuthentication, require('../blog/urls'))

router.use('/', require('../users/urls'))

//Aqui funciones

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){return next()}
    res.send('is not authenticated')
}

// Esto esta hardcodeado, hay que componerlo alv

function dataBase(){
    db.authenticate()
    .then(()=>console.log('Connected'))
    .catch(err => console. log('There was an error', err))
    alterTable()
}

module.exports = {router, dataBase}