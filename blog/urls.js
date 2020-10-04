const app = require('express')

const router = app.Router()

const {blogController} = require('./controllers')


router.get('/', (req,res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

router.get('/blogs', blogController.showBlogs)

router.post('/insert-blog', verifyToken, blogController.addBlog)

router.post('/mainImage', blogController.addImage)

function verifyToken(req, res, next){
    const bearerHeader = req.headers.authorization
    // res.send(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        //Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        //Next middleware
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = router