/* eslint-disable no-undef */
const Book = require('../modeles/Books');
const mongoose = require('mongoose');

exports.createBook = async (req, res) => {
    try {
        const bookObject = JSON.parse(req.body.book);
        delete bookObject._id;
        delete bookObject.userId;

        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });

        const saved = await book.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getOneBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book id' });
        }

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



/* exports.modifyBook = (req, res, next) => {

};

exports.deleteBook = (req, res, next) => {

};



exports.getOneBook = (req, res, next) => {

}; */