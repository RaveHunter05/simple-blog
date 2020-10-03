var models = require('./urls')

const {Blog} = require('./models')

let blogController = {
    showBlogs(req,res){
        Blog.findAll()
        .then(blogs=>{
            res.json({"respuestas": blogs})
        })
        .catch(err=> console.error(err))
    },
    addBlog(req,res){
        let {title, content} =  req.body
    
        Blog.create({title,content})
        .then(response => res.json({"respuesta": response}))
        .catch(err => console.error("There was an error", err))
    },
    addImage(req,res){

        let {image} = req.body

        if(req.files){
            let file = req.files.image
            let fileName = file.name
            file.mv(__dirname+ '/uploads/mainImages/' + fileName, function(err){
                if(err){
                    res.send(err)
                }else{
                    res.send("File Uploaded")
                }
            })
        }
    }
}

module.exports = {blogController}