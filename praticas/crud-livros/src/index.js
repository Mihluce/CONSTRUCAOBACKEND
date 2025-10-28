require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const livroRouter = require('./controllers/LivroController');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Express para aceitar JSON
app.use(express.json());

// Conexão com o MongoDB Atlas
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URI)
    .then(() => {
        console.log('✅ Conexão com o MongoDB Atlas estabelecida com sucesso!');
    })
    .catch((error) => {
        console.error('❌ Erro de conexão com o MongoDB Atlas:', error.message);
        // Opcional: Terminar o processo se não houver conexão com o banco
        // process.exit(1);
    });

// Rotas da API
app.use('/livros', livroRouter);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API CRUD de Livros está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});