const jwt = require('jsonwebtoken');

function autenticacao(req, res, next) {
  try {
    const payload = jwt.verify(req.headers.token, 'minha-senha');
    req.usuario = payload;
    next();

  } catch (error) {
    next(error);
  }
}

module.exports = autenticacao;
