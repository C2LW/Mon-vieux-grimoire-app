/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const booksRoutes = require('./routes/books');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://main_db_user:HTDLW0bjKMeXkinm@cluster-001.dfhq8gi.mongodb.net/?appName=cluster-001',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes);


module.exports = app;
