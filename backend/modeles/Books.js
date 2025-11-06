/* eslint-disable no-undef */
const mongoose = require('mongoose');
const ratingsSchema = require('Rating');

const booksSchema = mongoose.Schema({
    userId : {Type: String, require: true},            // - identifiant MongoDB unique de l'utilisateur qui a créé le livre
    title : {Type: String, require: true},             // - titre du livre
    author : {Type: String, require: true},            // - auteur du livre
    imageUrl : {Type: String, require: true},          // - illustration/couverture du livre
    year: {Type: Number, require: true},               // - année de publication du livre
    genre: {Type: String, require: true},              // - genre du livre
    ratings : [ratingsSchema],
    averageRating : {Type: String, require: false},     // - note moyenne du livre
});

module.exports = mongoose.model('Books', booksSchema);