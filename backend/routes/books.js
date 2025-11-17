/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/books');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, booksCtrl.createBook);
router.get('/', booksCtrl.getAllBooks);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
/* router.get('/:id/rating', auth, booksCtrl.ratingBook); */
/* router.get('/:id/bestrating', auth, booksCtrl.bestRatingBook); */

module.exports = router;