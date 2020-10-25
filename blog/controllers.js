const {Blog} = require('./models')
const jwt = require('jsonwebtoken')

let blogController = {
    showBlogs(req,res){
        Blog.findAll()
        .then(blogs=>{
            res.json({"respuestas": blogs})
        })
        .catch(err=> console.error(err))
    },
    addBlog(req,res){
        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                let {title, content} =  req.body
                console.log(content)
                if(req.files){
                    
                    let {image} = req.files
                    let fileName = image.name
                    let direction = __dirname + '/uploads/mainImages/' + fileName
                    image.mv(direction , function(err){
                        if(err){
                            res.send(err)
                        }else{
                            Blog.create({title, content, mainImage: direction })
                            .then(response => res.json({"respuesta": response}))
                            .catch(err => console.error("There was an error", err))
                        }
                    })
                }else{
                    Blog.create({title,content})
                    .then(response => res.json({"respuesta": response}))
                    .catch(err => console.error("There was an error", err))
                }
            }
        })
    },
    editBlog(req,res){
        let {id, title, content, mainImage} = req.body
        Blog.update({
            title, content, mainImage
        },{
            where:{
                id
            }
        })
        .then(response=>{
            res.json({"respuestas": response})
        })
        .catch(err=> console.error(err))
    },
    deleteBlog(req,res){
        let {id} = req.body
        Blog.destroy({
            where:{
                id
            }
        })
        .then(response =>{
            res.json({"respuestas": "sucessfully deleted " + id})
        })
        .catch(err=> console.error(err))
    },
    addImage(req,res){

        let {image} = req.files
        console.log(image)
        // if(req.files){
        //     let file = req.files.image
        //     let fileName = file.name
        //     file.mv(__dirname+ '/uploads/mainImages/' + fileName, function(err){
        //         if(err){
        //             res.send(err)
        //         }else{
        //             res.send("File Uploaded")
        //         }
        //     })
        // }
    },
    blogUsers(req,res){
        let {users_id} = req.params
        Blog.findAll({where:{users_id}})
        .then(x=>{
            if(x.length>0){res.send(x)}
            res.sendStatus(404)
        })
        .catch(err=>{
            console.error(err)
        })
    }
}

module.exports = {blogController}