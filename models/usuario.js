const bookshelf = require('../bookshelf');

const Usuario = bookshelf.model('Usuario', {
  tableName: 'usuarios',
  requireFetch: false,
});

module.exports = Usuario;
