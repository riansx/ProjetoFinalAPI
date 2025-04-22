import express from 'express';
import {
  listarPessoas,
  criarPessoa,
  obterPessoa
  } from '../controllers/PessoaController.js';

const router = express.Router();


// Rotas para pessoas
// GET http://localhost:3000/api/pessoas
router.get('/', listarPessoas); // Listar todas as pessoas
// POST http://localhost:3000/api/pessoas
router.post('/', criarPessoa); // Criar pessoa
// GET http://localhost:3000/api/pessoas/id
router.get('/:id', obterPessoa); // Criar pessoa

// http://localhost:3000/pessoas
export default router;