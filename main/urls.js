const app = require('express')
const router = app.Router();

router.use('/blog', require('../blog/urls'))

module.exports = router