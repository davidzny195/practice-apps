require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const db = require('../database')

// middleware
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes.js')


app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', router)
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
