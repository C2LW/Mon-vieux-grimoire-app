/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/books');
const auth = require('../middleware/auth')

router.post('/', auth, booksCtrl.createBook);
/* router.put('/', booksCtrl.modifyBook);
router.delete('/', booksCtrl.deleteBook);
router.get('/', booksCtrl.getAllBooks);
router.get('/:id', booksCtrl.getOneBook); */

module.exports = router;