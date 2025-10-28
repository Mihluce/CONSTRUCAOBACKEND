const mongoose = require('mongoose');

// Middleware para validar se o ID é um ObjectId válido do MongoDB
const IDValidator = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'ID inválido. Certifique-se de que o ID é um ObjectId válido do MongoDB.',
        });
    }

    // Se for válido, prossegue para o próximo middleware/controller
    next();
};

module.exports = IDValidator;