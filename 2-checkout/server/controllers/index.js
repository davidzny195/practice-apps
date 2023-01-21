const models = require('../models')

module.exports = {
  checkout: {
    populate: (req, res) => {
      // get userInput from database
      res.json('hello')
    },

    update: (req, res) => {
      // update during each step of the form
    }
  },

  session: {
    handler: (req, res) => {
      return models.session.handler(req.session_id).then((result) => {
        res.status(200).json('Session initiated')
      }).catch((err) => res.status(400).send('Unsuccessfuly init'))

      // use cookie to get session -> return page / if submitted -> res.redirect to populate?
      // if no session ->
      // create session

    },

    update: (req, res) => {
      // update page number / completed / userId
    }

  }
}