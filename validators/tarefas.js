const Joi = require('joi');

function validaCadastroTarefa(req, res, next) {
  const schema = Joi.object({
    titulo: Joi.string()
      .min(1)
      .max(300)
      .required(),
    usuario_id: Joi.number()
      .integer()
      .required(),
    data_conclusao: Joi.date()
      .allow(null),
  });

  const resultado = schema.validate(req.body);
  if (resultado.error) {
    res.status(400)
      .json(resultado.error);
  } else {
    next();
  }
}

function validaEdicaoTarefa(req, res, next) {
  const schema = Joi.object({
    titulo: Joi.string()
      .min(1)
      .max(300),
    data_conclusao: Joi.date()
      .allow(null),
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
  validaCadastroTarefa,
  validaEdicaoTarefa,
};
