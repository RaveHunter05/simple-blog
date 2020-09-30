const app = require('express')

const router = app.Router()

const {blogController} = require('./controllers')


router.get('/', (req,res) => {
    res.json({"respuesta":"HOLA HIJUEPUTAS XDXDD"})
})

router.get('/blogs', blogController.showBlogs)

router.post('/insert-blog', blogController.addBlog)


module.exports = router