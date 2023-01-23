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
    updateForm: async (req, res) => {

      try {
        const update = await models.checkout.updateForm(req.body, req.session_id)
        res.status(203).send('Update Successful')

      } catch (err) {
        res.status(404).send(err)
      }
    }
  },

  session: {
    handler: (req, res) => {
      return models.session.handler(req.session_id).then((result) => {
        if (result[0].length) {
          return res.status(200).send(result[0][0])
        }
        res.status(200).json('Session initiated')
      }).catch((err) => res.status(400).send('Session not initiated'))
    },

    update: (req, res) => {
      return models.session.update(req.body.page, req.session_id)
        .then((result) => res.status(203).send('Update Session Success'))
        .catch((err) => res.status(404).send('Update Session Unsuccessful'))
    }

  }
}