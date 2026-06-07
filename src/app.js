import express from "express";
import conectaBD from "./config/bdConecta.js";
import routes from "./routes/index.js";
import errosController from "./middlewares/errosController.js";
import erros404 from "./middlewares/erros404.js";

//Instancia o express e cria middleware
const app = express();
app.use(express.json());
routes(app);

app.use(erros404);

app.use(errosController);

//Instancia conexão ao bd
const conexao = await conectaBD();
conexao.on("error", (erro) => {
    console.error("erro de conexão: " + erro);
});
conexao.once("open", () => {
    console.log("conexão realizada com sucesso!");
});

export default app;
