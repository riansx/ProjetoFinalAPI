import express from "express"
import {
  listarMedicamentos,
  obterMedicamento,
  cadastrarMedicamento,
  removerMedicamento,
} from "../controllers/medicamentoController.js"

const router = express.Router()


router.get("/", listarMedicamentos)
router.get("/:id", obterMedicamento)
router.post("/", cadastrarMedicamento)
router.delete("/:id", removerMedicamento)

export default router