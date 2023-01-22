const models = require('../models')

module.exports = {
  user: {
    create: (req, res) => {
      const { username, email, password } = req.body

      return models.user.create(username, email, password, req.session_id).then((result) => {
        res.status(201).send('Create successful')
      }).catch((err) => res.status(400).send('Create unsuccessful'))
    },
  },

  checkout: {
    populate: (req, res) => {
      // get userInput from database
      res.json('hello')
    },


    updateForm: (req, res) => {
      return models.checkout.updateForm(req.body, req.session_id)
        .then(() => res.status(203).send('Update Successful'))
        .catch((err) => res.status(400).send('Update Unsuccessful'))

      // .then(() => {
      //   res.status(203).send('Update Successful')
      // }).catch((err) => res.status(400).send('Update Unsuccessful'))
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