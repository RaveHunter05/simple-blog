const app = require('express')

const router = app.Router()

router.get('/', (req,res) => {
    res.json({"respuesta":"HOLA HIJUEPUTAS XDXDD"})
})

module.exports = router