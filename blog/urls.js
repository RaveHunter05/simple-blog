const app = require('express')

const router = app.Router()

const { blogController } = require('./controllers')


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

// Related to blog

router.get('/blogs', checkAuthentication,  blogController.showBlogs)

router.post('/insert-blog', checkAuthentication, blogController.addBlog)

router.put('/edit-blog', checkAuthentication, blogController.editBlog)

router.delete('/delete-blog', checkAuthentication, blogController.deleteBlog)

router.post('/mainImage', blogController.addImage)

router.get('/blog-user/:users_id', checkAuthentication, blogController.blogUsers)

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

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){return next()}
    res.send('is not authenticated')
}

module.exports = router