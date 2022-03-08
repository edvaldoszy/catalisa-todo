const bookshelf = require('../bookshelf');

const Tarefa = bookshelf.model('Tarefa', {
  tableName: 'tarefas',
  requireFetch: false,

  usuario() {
    return this.belongsTo('Usuario', 'usuario_id');
  },
});

module.exports = Tarefa;
