const {User} = require('./models')
const bcrypt = require('bcrypt')
const { json } = require('body-parser')

const saltRounds = 10

let userController = {
    userRegister(req,res){
        const {name, password, email, nickname} = req.body
        User.findOne({where:{email}})
        .then(user =>{
            if(user){
                res.send('user already exists')
            }else{
                bcrypt.genSalt(saltRounds, (err, salt) =>{
                    if(err){return json({"error": err})}
                    bcrypt.hash(password,salt,(err, hash)=>{
                        if(err){return json({"error": err})}
                        User.create({name, password:hash, email, nickname})
                        // Aquí hace falta 
                        .then(response => res.sendStatus(200))
                        .catch(err => console.error("There was an error", err))
                    })
                })
            }
        })
        .catch(err => console.error(err))
        
    },
    showUsers(req,res){
        User.findAll()
            .then(blogs=>{
                res.json({"respuestas": blogs})
            })
            .catch(err=> console.error(err))
    },
    showCurrentUser(req,res){
        // req.user contains the information provided by deserializeUser
        let variable = req.user
        res.send(variable)
    }
}

module.exports = {userController}