const { Glossary } = require('../../database/index.js')

module.exports = {
  glossary: {
    get: () => {
      return Glossary.find()
    },

    create: (params) => {
      let newEntry = new Glossary(params)
      return newEntry.save().catch((error) => {
        console.log('Error create in models')
      })
    },
    delete: (param) => {
      return Glossary.deleteOne({ _id: param})
    },

    update: (params) => {
      const { id, term, definition } = params
      return Glossary.findOneAndUpdate(
        { _id: id},
        { $set: { term: term, definition: definition}}
      )
    }
  }
}