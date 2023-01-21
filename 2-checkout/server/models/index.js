const db = require('../db')

module.exports = {
  checkout: {
    submit: (params) => {

    },

    populate: (params) => {
      console.log('hello')
    }
  },
  session: {
    handler: async (id) => {
      const query = `SELECT * FROM sessions WHERE session_id = '${id}'`
      const createQuery = `INSERT INTO sessions (session_id, page) VALUES('${id}', 'checkout')`

      try {
        const session = await db.queryAsync(query)
        if (session[0].length) {
          return module.exports.checkout.populate()
        }

        return  db.queryAsync(createQuery)
      } catch (error) {
        throw new Error ('Cannot create new session')
      }
    },

    update: (params) => {
      // update page number / completed / userId
    }

  }
}