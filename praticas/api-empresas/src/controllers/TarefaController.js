const express = require('express');
const mongoose = require('mongoose');
const Tarefa = require('../models/TarefaModel');
const Funcionario = require('../models/FuncionarioModel');
const Projeto = require('../models/ProjetoModel');
const { create: createValidator, update: updateValidator } = require('../validators/TarefaValidator');

const router = express.Router();

router.post('/', createValidator, async (req, res) => {
  try {
    const { responsavel, projeto } = req.body;
    if (!mongoose.Types.ObjectId.isValid(responsavel) || !mongoose.Types.ObjectId.isValid(projeto)) {
      return res.status(400).json({ error: 'IDs inválidos' });
    }
    const func = await Funcionario.findById(responsavel);
    if (!func) return res.status(404).json({ error: 'Funcionário (responsável) não encontrado' });
    const proj = await Projeto.findById(projeto);
    if (!proj) return res.status(404).json({ error: 'Projeto não encontrado' });

    const tarefa = await Tarefa.create(req.body);
    const populated = await Tarefa.findById(tarefa._id).populate(['responsavel', 'projeto']);
    return res.status(201).json(populated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const list = await Tarefa.find().populate(['responsavel', 'projeto']);
  return res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const item = await Tarefa.findById(req.params.id).populate(['responsavel', 'projeto']);
    if (!item) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', updateValidator, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

    if (req.body.responsavel) {
      if (!mongoose.Types.ObjectId.isValid(req.body.responsavel)) return res.status(400).json({ error: 'Responsável inválido' });
      const func = await Funcionario.findById(req.body.responsavel);
      if (!func) return res.status(404).json({ error: 'Funcionário (responsável) não encontrado' });
    }
    if (req.body.projeto) {
      if (!mongoose.Types.ObjectId.isValid(req.body.projeto)) return res.status(400).json({ error: 'Projeto inválido' });
      const proj = await Projeto.findById(req.body.projeto);
      if (!proj) return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    const updated = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['responsavel', 'projeto']);
    if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const removed = await Tarefa.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.json({ message: 'Tarefa removida' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
