const yup = require('yup');

const createSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data de início é obrigatória'),
  data_fim: yup.date().required('Data fim é obrigatória')
    .test('is-after', 'data_fim deve ser posterior à data_inicio', function(value) {
      const { data_inicio } = this.parent;
      if (!data_inicio || !value) return true; // será tratado por required
      return new Date(value) > new Date(data_inicio);
    })
});

const updateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup.date().test('is-after', 'data_fim deve ser posterior à data_inicio', function(value) {
    const { data_inicio } = this.parent;
    if (!value) return true;
    if (!data_inicio) return true; // permite atualização parcial
    return new Date(value) > new Date(data_inicio);
  })
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
