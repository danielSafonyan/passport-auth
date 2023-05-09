const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const path = require('path');

const router = express.Router();

router.get('/login', getLogin);

function getLogin(req, res, next) {
    const loginHtml = path.join(__dirname, 'pages', 'login.html')
    res.status(200).sendFile(loginHtml)
}

module.exports = router;