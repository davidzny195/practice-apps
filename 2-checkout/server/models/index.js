const db = require('../db')

module.exports = {
  user: {
    create: async (username, email, password, session_id) => {
      // NEED TO CHECK IF USER ALREADY EXISTS BEFORE CREATING A NEW ONE
      try {
        let userId;
        const getUser = await db.queryAsync(`SELECT id FROM users WHERE session_id = '${session_id}'`)

        if (!getUser[0].length) {
          console.log('NOT UPDATE')
          const newUser = await db.queryAsync(`INSERT INTO users (session_id, username, email, password) VALUES('${session_id}','${username}', '${email}', '${password}')`)
              userId = newUser[0].insertId
        } else {
          console.log('UPDATE')
          const updateUser = await db.queryAsync(`UPDATE users SET username='${username}', email='${email}', password='${password}'`)
              userId = getUser[0][0].id
        }

        const insertQuery = `UPDATE sessions SET user_id = ${userId}, page = 'signup'  WHERE session_id = '${session_id}'`

        return db.queryAsync(insertQuery)
      } catch (error) {
        throw new Error ('Cannot create user')
      }

    },
  },

  checkout: {
    populate: (params) => {
      console.log('hello')
    },


    updateForm: async (params, session_id) => {

      try {
        const createUserInfoQuery = `INSERT INTO user_info (user_id, address_line1, address_line2, city, state, zip, phone_number) VALUES ((SELECT user_id FROM sessions WHERE session_id = '${session_id}'), '${params.address_line1}', '${params.address_line2}', '${params.city}', '${params.state}', '${params.zip}', '${params.phone_number}')`

        const updated = await db.queryAsync(createUserInfoQuery)
      } catch (err) {
        throw new Error ('Cannot create new form')
      }
    },
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