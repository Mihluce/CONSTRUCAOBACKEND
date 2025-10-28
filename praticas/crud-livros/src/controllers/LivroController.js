const { Router } = require('express');
const Livro = require('../models/Livro');
const IDValidator = require('../validators/IDValidator');
const { validaNovoLivro, validaAtualizacaoLivro } = require('../validators/LivroValidator');

const livroRouter = Router();

// POST /livros - Criar um novo livro
livroRouter.post('/', validaNovoLivro, async (req, res) => {
    try {
        const livro = await Livro.create(req.body);
        return res.status(201).json(livro);
    } catch (error) {
        // Em caso de erro do Mongoose (ex: campo required falhou), retorna 400
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Erro de validação do Mongoose.', errors: error.errors });
        }
        return res.status(500).json({ message: 'Erro interno do servidor ao criar livro.' });
    }
});

// GET /livros - Listar todos os livros
livroRouter.get('/', async (req, res) => {
    try {
        const livros = await Livro.find();
        return res.status(200).json(livros);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor ao listar livros.' });
    }
});

// GET /livros/:id - Buscar livro por ID
livroRouter.get('/:id', IDValidator, async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await Livro.findById(id);

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar livro.' });
    }
});

// PUT /livros/:id - Atualizar livro por ID
livroRouter.put('/:id', IDValidator, validaAtualizacaoLivro, async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        const livro = await Livro.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true, runValidators: true } // new: true retorna o documento atualizado; runValidators: true executa validações do Mongoose
        );

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado para atualização.' });
        }

        return res.status(200).json(livro);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Em caso de validação falhar (ex: ano/preço não numérico)
            return res.status(400).json({ message: 'Erro de validação ao atualizar.', errors: error.errors });
        }
        return res.status(500).json({ message: 'Erro interno do servidor ao atualizar livro.' });
    }
});

// DELETE /livros/:id - Remover livro por ID
livroRouter.delete('/:id', IDValidator, async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await Livro.findByIdAndDelete(id);

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado para remoção.' });
        }

        return res.status(204).send(); // 204 No Content - Sucesso, sem corpo de resposta
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor ao remover livro.' });
    }
});

module.exports = livroRouter;