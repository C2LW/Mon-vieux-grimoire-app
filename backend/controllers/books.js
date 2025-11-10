/* eslint-disable no-undef */
const Book = require('../modeles/Books');

exports.createBook = async (req, res) => {
    try {
        console.log('POST /api/books body:', req.body);
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Body:', req.body);

        const { userId, title, author, imageUrl, year, genre, grade, averageRating } = req.body;

        const ratings = [];

        if (grade !== undefined) {
            ratings.push({ userId, grade: Number(grade) });
        };

        const book = await Book.create({
            userId,
            title,
            author,
            imageUrl,
            year,
            genre,
            ratings,
            averageRating
        });

        res.status(201).json(book);

    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};




/* exports.modifyBook = (req, res, next) => {

};

exports.deleteBook = (req, res, next) => {

};

exports.getAllBooks = (req, res, next) => {
    
};

exports.getOneBook = (req, res, next) => {

}; */