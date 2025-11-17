/* eslint-disable no-undef */
const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

function slugifyFileName(original) {

    const extractName = path.extname(original);
    const base = path.basename(original, extractName);

    const cleanName = base
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')       // diacritiques
        .replace(/[^a-zA-Z0-9_-]/g, '_')        // caractères non sûrs
        .replace(/_+/g, '_')                    // multiples _
        .replace(/^_+|_+$/g, '')                // trim
        .toLowerCase();

    return cleanName || 'image';
};


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = path.join(__dirname, '..', 'images');
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        const name = slugifyFileName(file.originalname);
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');