const yup = require('yup');
const mongoose = require('mongoose');

const createSchema = yup.object({
  titulo: yup.string().required('Título é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data de início é obrigatória'),
  data_fim: yup.date().required('Data fim é obrigatória').test('is-after', 'data_fim deve ser posterior à data_inicio', function(value){
    const { data_inicio } = this.parent;
    if (!data_inicio || !value) return true;
    return new Date(value) > new Date(data_inicio);
  }),
  responsavel: yup.string().required('Responsável é obrigatório').test('is-objectid', 'Responsável inválido', value => mongoose.Types.ObjectId.isValid(value)),
  projeto: yup.string().required('Projeto é obrigatório').test('is-objectid', 'Projeto inválido', value => mongoose.Types.ObjectId.isValid(value))
});

const updateSchema = yup.object({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().test('is-after', 'data_fim deve ser posterior à data_inicio', function(value){
    const { data_inicio } = this.parent;
    if (!value) return true;
    if (!data_inicio) return true;
    return new Date(value) > new Date(data_inicio);
  }),
  responsavel: yup.string().test('is-objectid', 'Responsável inválido', value => !value || mongoose.Types.ObjectId.isValid(value)),
  projeto: yup.string().test('is-objectid', 'Projeto inválido', value => !value || mongoose.Types.ObjectId.isValid(value))
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
