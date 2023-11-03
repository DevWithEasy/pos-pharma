const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const middlewares = [
  express.urlencoded({extended: true}),
  express.json(),
  morgan("dev"),
  cors(),
]

const applyMiddleware = (app) =>{
  middlewares.map(m=>app.use(m))
}

module.exports = applyMiddleware
