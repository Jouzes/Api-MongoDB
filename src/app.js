import express from "express";
import conectaBD from "./config/bdConecta.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import errosController from "./middlewares/errosController.js";

//Instancia o express e cria middleware
const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(errosController());

//Instancia conexão ao bd
const conexao = await conectaBD();
conexao.on("error", (erro) => {
    console.error("erro de conexão: " + erro);
});
conexao.once("open", () => {
    console.log("conexão realizada com sucesso!");
});

export default app;