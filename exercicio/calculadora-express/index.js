const express = require('express');
const app = express();
const calculadoraRouter = require('./routes/calculadora');

app.use(express.json());
app.use('/calculadora', calculadoraRouter);

app.get('/', (req, res) => res.send('API Calculadora funcionando!'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;