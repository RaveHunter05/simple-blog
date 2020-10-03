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
            // console.log(req.files.image)
            let file = req.files.image
            let fileName = file.name
            // console.log(fileName + 'asdfasdfasdf')
        }
    }
}

module.exports = {blogController}