const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useNewUrlParser:true
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.on('open', () => {
  console.log('CONNECTED TO MONGO')
})
// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

let glossarySchema = new mongoose.Schema({
  term: String,
  definition: String
}, {collection: 'Glossaries'})

let Glossary = mongoose.model('Glossary', glossarySchema)

module.exports.Glossary = Glossary