const app = require('express')

const router = app.Router()

const {blogController} = require('./controllers')


router.get('/', (req,res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

router.get('/blogs', blogController.showBlogs)

router.post('/insert-blog', blogController.addBlog)

router.post('/', blogController.addImage)

module.exports = router