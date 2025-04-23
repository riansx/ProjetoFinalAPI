import express from "express"
import fabricanteRoutes from "./routes/fabricanteRoutes.js"
import medicamentoRoutes from "./routes/medicamentoRoutes.js"
import sequelize from "./config/database.js"

const app = express()

app.use(express.json())

app.use("/api/fabricantes", fabricanteRoutes)
app.use("/api/medicamentos", medicamentoRoutes)

sequelize
  .sync() 
  .then(() => console.log('Banco de dados sincronizado com sucesso.'))
  .catch((error) => console.error('Erro ao sincronizar banco de dados:', error));

export default app;