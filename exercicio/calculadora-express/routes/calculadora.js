const express = require('express');
const router = express.Router();
const ops = require('../services/operacoes');

// Helper para validar números
function parseNumber(value) {
const n = Number(value);
return Number.isFinite(n) ? n : null;
}

// Somar
router.get('/somar', (req, res) => {
const a = parseNumber(req.query.numA);
const b = parseNumber(req.query.numB);
if (a === null || b === null) {
return res.status(400).json({ error: 'numA e numB são obrigatórios e devem ser números' });
}
res.json({ resultado: ops.somar(a, b) });
});

// Subtrair
router.get('/subtrair', (req, res) => {
const a = parseNumber(req.query.numA);
const b = parseNumber(req.query.numB);
if (a === null || b === null) {
return res.status(400).json({ error: 'numA e numB são obrigatórios e devem ser números' });
}
res.json({ resultado: ops.subtrair(a, b) });
});

// Multiplicar
router.get('/multiplicar', (req, res) => {
const a = parseNumber(req.query.numA);
const b = parseNumber(req.query.numB);
if (a === null || b === null) {
return res.status(400).json({ error: 'numA e numB são obrigatórios e devem ser números' });
}
res.json({ resultado: ops.multiplicar(a, b) });
});

// Dividir
router.get('/dividir', (req, res) => {
const a = parseNumber(req.query.numA);
const b = parseNumber(req.query.numB);
if (a === null || b === null) {
return res.status(400).json({ error: 'numA e numB são obrigatórios e devem ser números' });
}
if (b === 0) {
return res.status(400).json({ error: 'Divisão por zero não permitida' });
}
res.json({ resultado: ops.dividir(a, b) });
});

// Ao Quadrado
router.get('/aoQuadrado', (req, res) => {
const a = parseNumber(req.query.num);
if (a === null) {
return res.status(400).json({ error: 'num é obrigatório e deve ser número' });
}
res.json({ resultado: ops.aoQuadrado(a) });
});

// Raiz Quadrada
router.get('/raizQuadrada', (req, res) => {
const a = parseNumber(req.query.num);
if (a === null) {
return res.status(400).json({ error: 'num é obrigatório e deve ser número' });
}
if (a < 0) {
return res.status(400).json({ error: 'Raiz quadrada de número negativo não permitida' });
}
res.json({ resultado: ops.raizQuadrada(a) });
});

module.exports = router;