import express from "express";
import conectarAoMongoDB from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectarAoMongoDB();

conexao.on("error", (erro) => {
  console.log("Erro ao conectar ao banco de dados: ", erro);
});

conexao.once("open", () => {
  console.log("Conectado ao banco de dados com sucesso!");
});

const app = express();
routes(app);

export default app;
