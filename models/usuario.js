const bookshelf = require('../bookshelf');

const Usuario = bookshelf.model('Usuario', {
  tableName: 'usuarios'
});

module.exports = Usuario;
