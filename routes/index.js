var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario');
const Tarefa = require('../models/tarefa');

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

router.post('/usuarios', async function (req, res) {
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
  })
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
