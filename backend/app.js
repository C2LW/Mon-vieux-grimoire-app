/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://main_db_user:HTDLW0bjKMeXkinm@cluster-001.dfhq8gi.mongodb.net/?appName=cluster-001',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


module.exports = app;
