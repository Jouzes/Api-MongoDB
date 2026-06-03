import express from "express";
import conectaBD from "./config/bdConecta.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

//Instancia o express e cria middleware
const app = express();
routes(app);
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).json({message: "ID informado incorreto!"});
    } else {
        res.status(500).json({message: "Erro interno de servidor!", erro: erro});
    }
});

//Instancia conexão ao bd
const conexao = await conectaBD();
conexao.on("error", (erro) => {
    console.error("erro de conexão: " + erro);
});
conexao.once("open", () => {
    console.log("conexão realizada com sucesso!");
});

export default app;