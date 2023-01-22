const db = require('../db')

module.exports = {
  checkout: {
    populate: (params) => {
      console.log('hello')
    },

    create: async (username, email, password, session_id) => {
      const query = `INSERT INTO users (username, email, password) VALUES('${username}', '${email}', '${password}')`

      try {
        const newUser = await db.queryAsync(query)
        const userId = newUser[0].insertId

        const insertQuery = `UPDATE sessions SET user_id = ${userId} WHERE session_id = '${session_id}'`

        return db.queryAsync(insertQuery)
      } catch (error) {
        throw new Error ('Cannot create user')
      }

    },

    update: (params) => {

    }

  },
  session: {
    handler: async (id) => {
      const query = `SELECT * FROM sessions WHERE session_id = '${id}'`
      try {
        const session = await db.queryAsync(query)
        if (session[0].length) {
          return module.exports.checkout.populate()
        }

        const createQuery = `INSERT INTO sessions (session_id, page) VALUES('${id}', 'checkout')`

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