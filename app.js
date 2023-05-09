require('dotenv').config();

const express = require('express');
const path = require('path');
const createError = require('http-errors');

const router = require('./router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Set the status code based on the error type or use a default status code
  const statusCode = err.statusCode || 500;

  // Set the response content type
  res.set('Content-Type', 'application/json');

  // Send the error response with the status code and error message
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})