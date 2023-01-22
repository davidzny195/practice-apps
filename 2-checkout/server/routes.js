const controller = require('./controllers')
const router = require('express').Router()

router.get('/checkout', controller.checkout.populate)

router.post('/checkout', controller.checkout.create)

router.put('/checkout', controller.checkout.update)

router.get('/session', controller.session.handler)

router.put('/session', controller.session.update)

module.exports = router