var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario');
const Tarefa = require('../models/tarefa');
const validadoresUsuario = require('../validators/usuarios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/perfil', function(req, res, next) {
  res.json({
    nome: 'Edvaldo Szymonek',
    email: 'edvaldo@mail.com',
  });
});

router.get('/usuarios', async function (req, res) {
  const usuarios = await Usuario
    .fetchAll();
  res.json(usuarios);
});

router.post('/usuarios', validadoresUsuario.validaCriacaoUsuario, async function (req, res) {
  const usuarioExistente = await Usuario
    .where('email', req.body.email)
    .fetch();
  if (usuarioExistente) {
    res.json({
      mensagem: 'O endereço de e-mail já está cadastrado'
    });
    
  } else {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    });
    await usuario.save();

    res.send({
      mensagem: 'Usuário cadastrado com sucesso',
      usuario: usuario
    });
  }
});

router.put('/usuarios/:usuarioId', async function (req, res) {
  const usuarioId = req.params.usuarioId;
  const usuarioExistente = await Usuario
    .where('email', req.body.email)
    .where('id', '!=', usuarioId)
    .fetch();
  if (usuarioExistente) {
    res.json({
      mensagem: 'O endereço de e-mail já está cadastrado'
    });

  } else {
    const usuario = new Usuario({
      id: usuarioId,
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    });
    await usuario.save();

    res.json({
      mensagem: 'Usuário alterado com sucesso',
      usuario: usuario
    });
  }
});

router.delete('/usuarios/:usuarioId', async function (req, res) {
  const usuario = await Usuario
    .where('id', req.params.usuarioId)
    .fetch();
  if (usuario) {
    // DELETE FROM usuario WHERE id = req.params.usuarioId
    await usuario.destroy();
    res.json({
      mensagem: 'Usuário excluído com sucesso',
    });
  } else {
    res.json({
      mensagem: 'O usuário não existe',
    });
  }
});

router.get('/tarefas', async function (req, res) {
  const tarefas = await Tarefa
    .fetchAll();
  res.json(tarefas);
});

router.post('/tarefas', async function (req, res) {
  const tarefa = new Tarefa({
    titulo: req.body.titulo,
    usuario_id: req.body.usuario_id,
    data_conclusao: req.body.data_conclusao,
  });
  await tarefa.save();

  res.json({
    mensagem: "Tarefa cadastrada com sucesso",
    tarefa: tarefa,
  });
});

router.put('/tarefas/:tarefaId', async function (req, res) {
  const tarefaId = req.params.tarefaId;
  const tarefa = new Tarefa({
    id: tarefaId,
    titulo: req.body.titulo,
    data_conclusao: req.body.data_conclusao,
  });
  await tarefa.save();

  res.json({
    mensagem: 'Tarefa alterada com sucesso',
    tarefa: tarefa,
  });
});

router.delete('/tarefas/:tarefaId', async function (req, res) {
  const tarefa = await Tarefa
    .where('id', req.params.tarefaId)
    .fetch();
  if (tarefa) {
    // DELETE FROM tarefas WHERE id = req.params.tarefaId
    tarefa.destroy();
    res.json({
      mensagem: 'Tarefa excluída com sucesso'
    });
  } else {
    res.json({
      mensagem: 'A tarefa não existe'
    });
  }
});

router.get('/usuarios/:usuarioId/tarefas', async function (req, res) {
  const usuarioId = req.params.usuarioId;
  const tarefas = await Tarefa
    .where('usuario_id', usuarioId)
    .fetchAll({
      withRelated: [
        'usuario'
      ],
    });
  res.json(tarefas);
});


module.exports = router;
