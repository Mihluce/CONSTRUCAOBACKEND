const yup = require('yup');

// Schema de validação para a CRIAÇÃO de um novo livro (todos os campos obrigatórios)
const novoLivroSchema = yup.object().shape({
    titulo: yup.string()
        .required('O título é obrigatório.')
        .max(255, 'O título não pode ter mais de 255 caracteres.'),
    autor: yup.string()
        .required('O autor é obrigatório.')
        .max(255, 'O nome do autor não pode ter mais de 255 caracteres.'),
    editora: yup.string()
        .required('A editora é obrigatória.')
        .max(255, 'O nome da editora não pode ter mais de 255 caracteres.'),
    ano: yup.number()
        .required('O ano é obrigatório.')
        .integer('O ano deve ser um número inteiro.')
        .min(1000, 'O ano deve ser válido.')
        .max(new Date().getFullYear(), `O ano não pode ser maior que o ano atual (${new Date().getFullYear()}).`),
    preco: yup.number()
        .required('O preço é obrigatório.')
        .positive('O preço deve ser um número positivo.')
        .test('max-decimals', 'O preço pode ter no máximo 2 casas decimais.', (value) => {
            if (value === undefined || value === null) return true;
            return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }),
});

// Schema de validação para a ATUALIZAÇÃO de um livro (campos opcionais)
const atualizaLivroSchema = yup.object().shape({
    titulo: yup.string().optional().max(255, 'O título não pode ter mais de 255 caracteres.'),
    autor: yup.string().optional().max(255, 'O nome do autor não pode ter mais de 255 caracteres.'),
    editora: yup.string().optional().max(255, 'O nome da editora não pode ter mais de 255 caracteres.'),
    ano: yup.number()
        .optional()
        .integer('O ano deve ser um número inteiro.')
        .min(1000, 'O ano deve ser válido.')
        .max(new Date().getFullYear(), `O ano não pode ser maior que o ano atual (${new Date().getFullYear()}).`),
    preco: yup.number()
        .optional()
        .positive('O preço deve ser um número positivo.')
        .test('max-decimals', 'O preço pode ter no máximo 2 casas decimais.', (value) => {
            if (value === undefined || value === null) return true;
            return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }),
});

// Middleware genérico de validação com Yup
const validarDados = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        // Mapeia os erros do Yup para um formato mais amigável
        const errors = error.inner.reduce((acc, currentError) => {
            acc[currentError.path] = currentError.message;
            return acc;
        }, {});
        return res.status(400).json({
            message: 'Erro de validação dos dados.',
            errors,
        });
    }
};

// Middlewares específicos para cada operação
const validaNovoLivro = validarDados(novoLivroSchema);
const validaAtualizacaoLivro = validarDados(atualizaLivroSchema);

module.exports = {
    validaNovoLivro,
    validaAtualizacaoLivro,
};