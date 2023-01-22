const models = require('../models')

module.exports = {
  checkout: {
    populate: (req, res) => {
      // get userInput from database
      res.json('hello')
    },

    create: (req, res) => {
      const { username, email, password } = req.body

      return models.checkout.create(username, email, password, req.session_id).then((result) => {
        res.status(201).send('Create successful')
      }).catch((err) => res.status(400).send('Create unsuccessful'))
    },

    update: (req, res) => {
      // update during each step of the form
    }
  },

  session: {
    handler: (req, res) => {
      return models.session.handler(req.session_id).then((result) => {
        res.status(200).json('Session initiated')
      }).catch((err) => res.status(400).send('Session not initiated'))

    },

    update: (req, res) => {
      // update page number / completed / userId
    }

  }
}