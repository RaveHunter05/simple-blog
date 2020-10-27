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
        
    }
}

module.exports = {userController}