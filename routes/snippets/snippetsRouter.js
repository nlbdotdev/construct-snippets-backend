var express = require('express');
var router = express.Router();

// Snippet Functions
const { createSnippet, updateSnippet, getAllSnippets, getMySnippets, getSnippet } = require('./controller/snippetsController')
// Middleware
const { checkIsEmpty, jwtMiddleware } = require('../lib/validationMiddleware/index')

// Need to define get routes - ALL, USER, ID

// Routes
// router.get('/', function (req, res, next) { res.send('hello from snippets router'); });

router.get('/', getAllSnippets);
router.get('/my-snippets', jwtMiddleware, getMySnippets)

router.post('/create-snippet', jwtMiddleware, checkIsEmpty, createSnippet)
// router.get('/snippet:id', jwtMiddleware, getCurrentUser)
router.put('/update-snippet', jwtMiddleware, updateSnippet)

module.exports = router