const yup = require('yup');

const createSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  salario: yup.number().required('Salário é obrigatório').min(1518, 'Salário mínimo é R$ 1.518,00')
});

const updateSchema = yup.object({
  nome: yup.string(),
  descricao: yup.string(),
  salario: yup.number().min(1518, 'Salário mínimo é R$ 1.518,00')
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
