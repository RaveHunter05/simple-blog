const {User} = require('./models')

let userController = {
    userRegister(req,res){
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