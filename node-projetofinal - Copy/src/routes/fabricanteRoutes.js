import express from "express"
import {
  listarFabricantes,
  obterFabricante,
  cadastrarFabricante,
  removerFabricante,
  atualizarFabricante,
} from "../controllers/fabricanteController.js"

const router = express.Router()


router.get("/", listarFabricantes)
router.get("/:id", obterFabricante)
router.post("/", cadastrarFabricante)
router.delete("/:id", removerFabricante)
router.put("/:id", atualizarFabricante)

export default router;