const controller = require('./controllers')
const router = require('express').Router()

router.get('/checkout', controller.checkout.populate)

router.post('/user', controller.user.create)

router.post('/checkout', controller.checkout.updateForm)

router.get('/session', controller.session.handler)


module.exports = router