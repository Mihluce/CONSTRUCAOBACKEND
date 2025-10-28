const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'O título é obrigatório.'],
        trim: true,
    },
    autor: {
        type: String,
        required: [true, 'O autor é obrigatório.'],
        trim: true,
    },
    editora: {
        type: String,
        required: [true, 'A editora é obrigatória.'],
        trim: true,
    },
    ano: {
        type: Number,
        required: [true, 'O ano é obrigatório.'],
    },
    preco: {
        type: Number,
        required: [true, 'O preço é obrigatório.'],
    },
}, {
    timestamps: true, // Adiciona campos createdAt e updatedAt
});

module.exports = mongoose.model('Livro', LivroSchema);