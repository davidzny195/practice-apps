const db = require('../db')


module.exports = {
  getUserId: (sessionId) => {
    return db.queryAsync(`SELECT id FROM users WHERE session_id = '${sessionId}'`)
  },

  user: {
    create: async (username, email, password, session_id) => {
      try {
        let userId;
        const getUser = await module.exports.getUserId(session_id)
        if (!getUser[0].length) {
          const newUser = await db.queryAsync(`INSERT INTO users (session_id, username, email, password) VALUES('${session_id}','${username}', '${email}', '${password}')`)
              userId = newUser[0].insertId
        } else {
          const updateUser = await db.queryAsync(`UPDATE users SET username='${username}', email='${email}', password='${password}'`)
              userId = getUser[0][0].id
        }

        return db.queryAsync(`UPDATE sessions SET user_id = ${userId}, page = 'userInfo'  WHERE session_id = '${session_id}'`)
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
        const getUser = await module.exports.getUserId(session_id)
        const userId = getUser[0][0].id

        const getUserInfo = await db.queryAsync(`SELECT * FROM user_info WHERE user_id = ${userId}`)
        if (getUserInfo[0].length) {
          await db.queryAsync(`UPDATE user_info SET address_line1 = '${params.address_line1}', address_line2 = '${params.address_line2}', city = '${params.city}', state = '${params.state}', zip = '${params.zip}', phone_number = '${params.phone_number}' WHERE user_id = ${userId}`)
        } else {
          await db.queryAsync(`INSERT INTO user_info (user_id, address_line1, address_line2, city, state, zip, phone_number) VALUES ((SELECT user_id FROM sessions WHERE session_id = '${session_id}'), '${params.address_line1}', '${params.address_line2}', '${params.city}', '${params.state}', '${params.zip}', '${params.phone_number}')`)
        }

        return db.queryAsync(`UPDATE sessions SET page = '${params.page}'  WHERE session_id = '${session_id}'`)
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