-- Criar um banco de dados chamado "catalisa_todo"
-- Criar as duas tabelas abaixo

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(80) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tarefas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) NOT NULL,
  `usuario_id` int NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_conclusao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
