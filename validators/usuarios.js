const Joi = require('joi');

function validaCriacaoUsuario(req, res, next) {
  const schema = Joi.object({
    nome: Joi.string()
      .min(1)
      .max(100)
      .required(),
    email: Joi.string()
      .email(),
    senha: Joi.string()
      .min(8)
      .max(20)
      .required(),
  });

  const resultado = schema.validate(req.body);
  if (resultado.error) {
    res.status(400)
      .json(resultado.error);
  } else {
    next();
  }
}

module.exports = {
  validaCriacaoUsuario,
};
