const app = require('express')

const router = app.Router()

const { blogController } = require('./controllers')


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

// Related to blog

router.get('/blogs',  blogController.showBlogs)

router.post('/insert-blog', blogController.addBlog)

router.put('/edit-blog', blogController.editBlog)

router.delete('/delete-blog',  blogController.deleteBlog)

router.post('/mainImage', blogController.addImage)

router.get('/blog-user/:users_id', blogController.blogUsers)

function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization
    // res.send(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        //Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        //Next middleware
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = router