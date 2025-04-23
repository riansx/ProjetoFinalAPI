import Fabricante from "../models/Fabricante.js"
import Medicamento from "../models/Medicamento.js"


export const listarFabricantes = async (req, res) => {
  try {
    const fabricantes = await Fabricante.findAll()
    const response = fabricantes.map((fabricante) => ({
      id:fabricante.id,
      nome:fabricante.nome,
      documento:fabricante.documento_registro,
      pais:fabricante.pais,
    }))

    return res.status(200).json(response)

  } catch (error) {
    console.error("Erro ao listar fabricantes:", error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao listar fabricantes",
      erro: error.message,
    })
  }
}




export const obterFabricante = async (req, res) => {
  try {
    const { id } = req.params

    const fabricante = await Fabricante.findByPk(id)

    const response = {
      id:fabricante.id,
      nome:fabricante.nome,
      documento:fabricante.documento_registro,
      pais:fabricante.pais,

    }

    if (!fabricante) {
      return res.status(404).json({
        status: "erro",
        mensagem: `Fabricante com ID ${id} não encontrado`,
      })
    }

    return res.status(200).json(response)

  } catch (error) {
    console.error(`Erro ao obter fabricante ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao obter fabricante",
      erro: error.message,
    })
  }
}



export const cadastrarFabricante = async (req, res) => {
  try {
    const { nome, documento_registro, pais } = req.body

    if (!nome || !documento_registro || !pais) {
      return res.status(400).json({
        status: "erro",
        mensagem: "Todos os campos são obrigatórios: nome, documento_registro, pais",
      })
    }

    const fabricanteExistente = await Fabricante.findOne({
      where: { documento_registro },
    })

    if (fabricanteExistente) {
      return res.status(400).json({
        status: "erro",
        mensagem: `Já existe um fabricante com o documento de registro ${documento_registro}`,
      })
    }

    const novoFabricante = await Fabricante.create({
      nome,
      documento_registro,
      pais,
    })

    return res.status(201).json({
      status: "sucesso",
      mensagem: "Fabricante criado com sucesso",
      dados: novoFabricante,
    })

  } catch (error) {
    console.error("Erro ao criar fabricante:", error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao criar fabricante",
      erro: error.message,
    })
  }
}



export const atualizarFabricante = async (req, res) => {

  const { id } = req.params
  const nome = req.body.nome
  const documento = req.body.documento_registro
  const pais = req.body.pais

  try {
    const fabricante = await Fabricante.findByPk(id)
    fabricante.set({
      nome: nome,
      documento_registro: documento,
      pais: pais,
    })

    await fabricante.save()

    const fabricanteAtualizado = await Fabricante.findByPk(id)
    const response = {
      id: fabricanteAtualizado.id,
      nome: fabricanteAtualizado.nome,
      documento: fabricanteAtualizado.documento_registro,
      pais: fabricanteAtualizado.pais,
    }

    return res.status(200).json(response)

  }catch(erro){
    return res.status(400).send(erro.message)
  }
}




export const removerFabricante = async (req, res) => {
  try {
    const { id } = req.params
    const fabricante = await Fabricante.findByPk(id)

    if (!fabricante) {
      return res.status(404).json({
        status: "erro",
        mensagem: `Fabricante com ID ${id} não encontrado`,
      })
    }

    const medicamentosAssociados = await Medicamento.findOne({
      where: { fabricante_id: id },
    })

    if (medicamentosAssociados) {
      return res.status(400).json({
        status: "erro",
        mensagem: "Não é possível remover o fabricante pois existem medicamentos associados a ele",
      })
    }

    await fabricante.destroy()

    return res.status(200).json({
      status: "sucesso",
      mensagem: "Fabricante removido com sucesso",
    })
  } catch (error) {
    console.error(`Erro ao remover fabricante ID ${req.params.id}:`, error)
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro ao remover fabricante",
      erro: error.message,
    })
  }
}