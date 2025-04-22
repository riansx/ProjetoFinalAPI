import Pessoa from '../models/Pessoa.js';
import Cidade from '../models/Cidade.js';
import Estado from '../models/Estado.js';

export const listarPessoas = async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll({
      include: {
        model: Cidade,
        as: 'cidade',
        include: {
          model: Estado,
          as: 'estado', // Inclui o estado associado
        },
      },
    });

    // Personalizar a resposta para incluir apenas os nomes de cidade e estado
    const response = pessoas.map((pessoa) => ({
      id: pessoa.id,
      nome: pessoa.nome,
      telefone: pessoa.telefone,
      email: pessoa.email,
      cidade: pessoa.cidade.nome, // Nome da cidade
      estado: pessoa.cidade.estado.nome, // Nome do estado
    }));

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao listar pessoas.' });
  }
};

// Criar pessoa com base no nome da cidade e estado
export const criarPessoa = async (req, res) => {

  const { nome, telefone, email, cidade, estado } = req.body;

  try {
    // Verifica se cidade e estado foram fornecidos
    if (!cidade || !estado) {
      return res.status(400).json({ error: 'Cidade e estado são obrigatórios.' });
    }

    // Busca a cidade pelo nome e pelo estado associado
    const cidadeEncontrada = await Cidade.findOne({
      where: { nome: cidade },
      include: {
        model: Estado,
        as: 'estado',
        where: { nome: estado }, // Busca o estado pelo nome
      },
    });

    // Se a cidade ou o estado não forem encontrados, retorna erro
    if (!cidadeEncontrada) {
      return res.status(404).json({ error: 'Cidade ou estado não encontrados.' });
    }

    // Cria a pessoa associada à cidade encontrada
    const novaPessoa = await Pessoa.create({
      nome,
      telefone,
      email,
      cidade_id: cidadeEncontrada.id, // Associa o ID da cidade à pessoa
    });

    // Monta a resposta manualmente
    const response = {
      id: novaPessoa.id,
      nome: novaPessoa.nome,
      telefone: novaPessoa.telefone,
      email: novaPessoa.email,
      cidade: cidadeEncontrada.nome, // Nome da cidade
      estado: cidadeEncontrada.estado.nome, // Nome do estado
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pessoa.', detalhes: error.message });
  }
};

 
// Obter pessoa por ID
export const obterPessoa = async (req, res) => {
  try {
    // Buscar pessoa pelo ID com a cidade e o estado associados
    const id = req.params.id;

    const pessoa = await Pessoa.findByPk(id, {
      include: {
        model: Cidade, // Inclui o modelo Cidade
        as: 'cidade',  // Alias da associação definido no modelo
        include: {
          model: Estado, // Inclui o modelo Estado dentro de Cidade
          as: 'estado',  // Alias da associação definido no modelo Cidade
        },
      },
    });

    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }

    // Personalizar a resposta para incluir apenas os nomes de cidade e estado
    const response = {
      id: pessoa.id,
      nome: pessoa.nome,
      telefone: pessoa.telefone,
      email: pessoa.email,
      cidade: pessoa.cidade.nome, // Nome da cidade
      estado: pessoa.cidade.estado.nome, // Nome do estado
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter pessoa.', detalhes: error.message });
  }
}; 