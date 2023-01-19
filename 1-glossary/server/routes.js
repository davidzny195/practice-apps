const controller = require('./controllers')
const router = require('express').Router()


router.get('/glossary', controller.glossary.get)

router.post('/glossary', controller.glossary.create)

router.delete('/glossary', controller.glossary.delete)

router.put('/glossary', controller.glossary.update)

module.exports = router