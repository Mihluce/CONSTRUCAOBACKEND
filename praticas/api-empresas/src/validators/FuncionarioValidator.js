const yup = require('yup');
const mongoose = require('mongoose');

const createSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  data_contratacao: yup.date().required('Data de contratação é obrigatória'),
  data_nascimento: yup.date().required('Data de nascimento é obrigatória'),
  genero: yup.string().required('Gênero é obrigatório'),
  endereco: yup.object().shape({
    cep: yup.string(),
    logradouro: yup.string(),
    numero: yup.string(),
    complemento: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string()
  }).nullable(),
  cargo: yup.string().required('Cargo é obrigatório').test('is-objectid', 'Cargo inválido', value => mongoose.Types.ObjectId.isValid(value)),
  departamento: yup.string().required('Departamento é obrigatório').test('is-objectid', 'Departamento inválido', value => mongoose.Types.ObjectId.isValid(value))
});

const updateSchema = yup.object({
  nome: yup.string(),
  cpf: yup.string(),
  email: yup.string().email('Email inválido'),
  telefone: yup.string(),
  data_contratacao: yup.date(),
  data_nascimento: yup.date(),
  genero: yup.string(),
  endereco: yup.object().shape({
    cep: yup.string(),
    logradouro: yup.string(),
    numero: yup.string(),
    complemento: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    uf: yup.string()
  }).nullable(),
  cargo: yup.string().test('is-objectid', 'Cargo inválido', value => !value || mongoose.Types.ObjectId.isValid(value)),
  departamento: yup.string().test('is-objectid', 'Departamento inválido', value => !value || mongoose.Types.ObjectId.isValid(value))
});

function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }
  };
}

module.exports = {
  create: validate(createSchema),
  update: validate(updateSchema)
};
