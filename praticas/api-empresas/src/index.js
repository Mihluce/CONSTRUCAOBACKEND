require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProjetoController = require('./controllers/ProjetoController');
const TarefaController = require('./controllers/TarefaController');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

async function connectDB() {
  try {
    let mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      // tenta construir através das partes se MONGO_URL não estiver configurada
      const user = encodeURIComponent(process.env.DB_USER || '');
      const pass = encodeURIComponent(process.env.DB_PASS || '');
      const host = process.env.DB_HOST || '';
      const db = process.env.DB_NAME || 'api-empresas';
      if (!user || !pass || !host) {
        throw new Error('MONGO_URL não encontrado e DB_USER/DB_PASS/DB_HOST não configurados.');
      }
      mongoUrl = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;
    }

    await mongoose.connect(mongoUrl, {
      // opções modernas do mongoose 7 já são sane por padrão
    });
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('❌ Erro conectando ao MongoDB:', err.message);
    process.exit(1);
  }
}

connectDB();

app.use('/departamentos', DepartamentoController);
app.use('/cargos', CargoController);
app.use('/funcionarios', FuncionarioController);
app.use('/projetos', ProjetoController);
app.use('/tarefas', TarefaController);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`🚀 Server rodando na porta ${port}`);
});
