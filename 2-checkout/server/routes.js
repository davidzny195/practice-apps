const controller = require('./controllers')
const router = require('express').Router()

router.get('/checkout', controller.checkout.populate)

router.post('/checkout', controller.checkout.submit)

// router.get('/', controller.session.handle)

module.exports = router