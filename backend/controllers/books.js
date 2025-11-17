/* eslint-disable no-undef */
const Book = require('../modeles/Books');
const mongoose = require('mongoose');
const fs = require('fs');

function computeAverageRating(ratings) {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((total, r) => total + r.grade, 0);
    return Math.round((sum / ratings.length) * 10) / 10; // arrondi à 0.1 près
}

exports.getBestRating = async (req, res) => {
    try {
        const bestBooks = await Book
            .find()
            .sort({ averageRating: -1 })
            .limit(3);

        res.status(200).json(bestBooks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.rateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.auth.userId;
        const grade = Number(req.body.rating ?? req.body.grade);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book id' });
        }

        if (Number.isNaN(grade) || grade < 0 || grade > 5) {
            return res.status(400).json({ error: 'La note doit être un nombre entre 0 et 5' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const existingRating = book.ratings.find(r => r.userId === userId);
        if (existingRating) {
            return res.status(400).json({ error: 'Vous avez déjà noté ce livre' });
        } else {
            book.ratings.push({ userId, grade });
        }

        book.averageRating = computeAverageRating(book.ratings);

        const updated = await book.save();

        res.status(201).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


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
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getOneBook = (req, res) => {
    Book.findOne({
        _id: req.params.id
    }).then(
        (book) => {
            res.status(200).json(book);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
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


exports.modifyBook = (req, res) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


exports.deleteBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};