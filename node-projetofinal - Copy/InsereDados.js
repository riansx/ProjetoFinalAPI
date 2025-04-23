import db from "./src/config/database.js"
import Fabricante from "./src/models/Fabricante.js"
import Medicamento from "./src/models/Medicamento.js"


const inserirDados = async () => {
  try {

    await db.sync({ force: true })
    console.log("Banco de dados recriado!")


    const fabricante1 = await Fabricante.create({
      nome: "Laboratório Nacional",
      documento_registro: "LAB123456",
      pais: "Brasil",
    })

    const fabricante2 = await Fabricante.create({
      nome: "Farmacêutica Global",
      documento_registro: "FARM789012",
      pais: "Estados Unidos",
    })

    const fabricante3 = await Fabricante.create({
      nome: "Medicamentos Europa",
      documento_registro: "MED345678",
      pais: "Alemanha",
    })

    console.log("Fabricantes criados!")


    await Medicamento.create({
      nome_comercial: "Dorflex",
      principio_ativo: "Dipirona + Orfenadrina + Cafeína",
      registro_anvisa: "MS-1.0123.0123",
      dosagem: "300mg + 35mg + 50mg",
      fabricante_id: fabricante1.id,
    })

    await Medicamento.create({
      nome_comercial: "Paracetamol",
      principio_ativo: "Paracetamol",
      registro_anvisa: "MS-1.0123.0456",
      dosagem: "750mg",
      fabricante_id: fabricante2.id,
    })

    await Medicamento.create({
      nome_comercial: "Amoxicilina",
      principio_ativo: "Amoxicilina",
      registro_anvisa: "MS-1.0123.0789",
      dosagem: "500mg",
      fabricante_id: fabricante3.id,
    })

    await Medicamento.create({
      nome_comercial: "Ibuprofeno",
      principio_ativo: "Ibuprofeno",
      registro_anvisa: "MS-1.0123.1012",
      dosagem: "600mg",
      fabricante_id: fabricante1.id,
    })

    console.log("Medicamentos criados!")
    console.log("Dados inseridos com sucesso!")
  } catch (error) {
    console.error("Erro ao inserir registros:", error.message)
  } finally {

    await db.close()
  }
}


inserirDados()