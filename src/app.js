import express from "express";
import conectaBD from "./config/bdConecta.js";
import pessoa from "./models/pessoa.js";
import routes from "./routes/pessoaRoutes.js";

//Instancia o express e cria middleware
const app = express();
app.use(express.json());
app.use(routes);

//Instancia conexão ao bd
const conexao = await conectaBD();
conexao.on("error", (erro) => {
    console.error("erro de conexão: " + erro);
});
conexao.once("open", () => {
    console.log("conexão realizada com sucesso!");
});

//ROTA BASE
app.get('/', async (req, res) => {
    res.status(200).send("API ONLINE");
});

export default app;