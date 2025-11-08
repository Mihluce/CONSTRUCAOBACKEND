const mongoose = require('mongoose');

const ProjetoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Projetos', ProjetoSchema);
