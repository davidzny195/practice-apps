const models = require('../models')


module.exports = {
  glossary: {
    get: async (req, res) => {
      const { page } = req.query

      const count = await models.glossary.getCount()
      return models.glossary.get(page)
      .then((data) => {
        res.status(200).json({ total: count, data})
      }).catch((error) => {
        res.status(404).send('Error get res')
      })
    },

    create: (req, res) => {
      const { term, definition } = req.body
      return models.glossary.create({ term, definition })
      .then((result) => {
        res.status(201).json('Posted successfully')
      }).catch((error) => {
        res.status(404).send('Error create res')
      })
    },

    delete: (req, res) => {
      const { id } = req.body
      return models.glossary.delete(id)
      .then((result) => {
        res.status(203).json('Deleted successfully')
      }).catch((error) => {
        res.status(404).send('Error delete res')
      })
    },

    update: (req, res) => {
      return models.glossary.update(req.body)
      .then((result) => {
        res.status(203).json('Updated successfully')
      }).catch((error) => {
        res.status(404).send('Error update res')
      })
    }
  }
}