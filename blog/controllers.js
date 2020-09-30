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
    }
}

module.exports = {blogController}