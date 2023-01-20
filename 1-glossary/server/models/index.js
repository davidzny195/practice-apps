const { Glossary } = require('../../database/index.js')

module.exports = {
  glossary: {
    get: (page) => {
      let skip = 5 * (page - 1)
      return Glossary.find().skip(skip).limit(5).exec()
    },

    getCount: () => {
      return Glossary.count().exec()
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