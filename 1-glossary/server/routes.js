import controller = require('./controllers')
const router = require('express').Router()


router.get('/glossary', controller.glossary.get)

router.post('/gloosary', controller.glossary.post)

module.exports = router