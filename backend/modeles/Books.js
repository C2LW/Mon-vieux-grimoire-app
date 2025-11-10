/* eslint-disable no-undef */
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    grade: { type: Number, required: true, min: 0, max: 5 }
}, { _id: false });

const booksSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // id de l'utilisateur créateur
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: { type: [ratingSchema], default: [] },
    averageRating: { type: Number, default: 0 }        // mieux en Number qu'en String
}, { timestamps: true });

module.exports = mongoose.model('Book', booksSchema);
