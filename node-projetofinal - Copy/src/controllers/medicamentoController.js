import Medicamento from "../models/Medicamento.js"
import Fabricante from "../models/Fabricante.js"


export const listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: [
        {
          model: Fabricante,
          as: "fabricante",
        },
      ],
    })

    const response = medicamentos.map((medicamento) => ({
      id:medicamento.id,
      nome:medicamento.nome_comercial,
      principio_ativo:medicamento.principio_ativo,
      registro_anvisa:medicamento.registro_anvisa,
      dosagem:medicamento.dosagem,
      nome_fabricante:medicamento.fabricante.nome, 
    }))

    return res.status(200).json(response)

  } catch (error) {
    console.error("Erro ao listar medicamentos:", error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao listar medicamentos",
      erro: error.message,
    })
  }
}


export const obterMedicamento = async (req, res) => {
  try {
    const { id } = req.params

    const medicamento = await Medicamento.findByPk(id, {
      include: [
        {
          model: Fabricante,
          as: "fabricante",
        },
      ],
    })

    if (!medicamento) {
      return res.status(404).json({
        status: "erro",
        mensagem: `Medicamento com ID ${id} não encontrado`,
      })
    }

    const response = {
      id:medicamento.id,
      nome:medicamento.id, 
      principio_ativo:medicamento.principio_ativo,
      registro_anvisa:medicamento.registro_anvisa,
      dosagem:medicamento.dosagem,
      nome_fabricante:medicamento.fabricante.nome, 
    }

    return res.status(200).json(response)

  } catch (error) {
    console.error(`Erro ao obter medicamento ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao obter medicamento",
      erro: error.message,
    })
  }
}


export const cadastrarMedicamento = async (req, res) => {
  try {
    const { nome_comercial, principio_ativo, registro_anvisa, dosagem, fabricante_id } = req.body

    
    if (!nome_comercial || !principio_ativo || !registro_anvisa || !dosagem || !fabricante_id) {
      return res.status(400).json({
        status: "erro",
        mensagem:
          "Todos os campos são obrigatórios: nome_comercial, principio_ativo, registro_anvisa, dosagem, fabricante_id",
      })
    }

   
    const fabricante = await Fabricante.findByPk(fabricante_id)
    if (!fabricante) {
      return res.status(404).json({
        status: "erro",
        mensagem: `Fabricante com ID ${fabricante_id} não encontrado`,
      })
    }

   
    const medicamentoExistente = await Medicamento.findOne({
      where: { registro_anvisa },
    })

    if (medicamentoExistente) {
      return res.status(400).json({
        status: "erro",
        mensagem: `Já existe um medicamento com o registro ANVISA ${registro_anvisa}`,
      })
    }

    const novoMedicamento = await Medicamento.create({
      nome_comercial,
      principio_ativo,
      registro_anvisa,
      dosagem,
      fabricante_id,
    })

   
    const medicamentoCompleto = await Medicamento.findByPk(novoMedicamento.id, {
      include: [
        {
          model: Fabricante,
          as: "fabricante",
        },
      ],
    })

    const response = {
      nome_comercial:medicamentoCompleto.nome_comercial,
      principio_ativo:medicamentoCompleto.principio_ativo,
      registro_anvisa:medicamentoCompleto.registro_anvisa,
      dosagem:medicamentoCompleto.dosagem,
      nome_fabricante:medicamentoCompleto.fabricante.nome, 
    }

    return res.status(201).json(response)

  } catch (error) {
    console.error("Erro ao criar medicamento:", error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao criar medicamento",
      erro: error.message,
    })
  }
}


export const removerMedicamento = async (req, res) => {
  try {
    const { id } = req.params
    const medicamento = await Medicamento.findByPk(id)

    if (!medicamento) {
      return res.status(404).json({
        status: "erro",
        mensagem: `Medicamento com ID ${id} não encontrado`,
      })
    }
   
    await medicamento.destroy()

    return res.status(200).json({
      status: "sucesso",
      mensagem: "Medicamento removido com sucesso",
    })
  } catch (error) {
    console.error(`Erro ao remover medicamento ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao remover medicamento",
      erro: error.message,
    })
  }
}