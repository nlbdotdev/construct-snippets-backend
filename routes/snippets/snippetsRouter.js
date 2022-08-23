var express = require('express');
var router = express.Router();

const { createSnippet, updateSnippet, getSnippet } = require('./controller/snippetsController')

const { checkIsEmpty, jwtMiddleware } = require('../lib/validationMiddleware/index')

// Routes
router.get('/', function (req, res, next) { res.send('hello from snippets router'); });
router.post('/create-snippet',jwtMiddleware, checkIsEmpty, createSnippet)
// router.get('/snippet:id', jwtMiddleware, getCurrentUser)
router.put('/update-snippet', jwtMiddleware, updateSnippet)

module.exports = router