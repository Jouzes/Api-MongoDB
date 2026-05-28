import express from "express";
import conectaBD from "./config/bdConecta.js";
import pessoa from "./models/pessoa.js";

//Instancia o express e cria middleware
const app = express();
app.use(express.json());

//Instancia conexão ao bd
const conexao = await conectaBD();
conexao.on("error", (erro) => {
    console.error("erro de conexão: " + erro);
});
conexao.once("open", () => {
    console.log("conexão realizada com sucesso!");
});

//Rotas express
app.get('/', async (req, res) => {
    res.status(200).send("API ONLINE");
});

app.get('/getPessoa/:id', (req, res) => {
    const index = buscaPessoa(req.params.id);
    res.status(200).json(pessoas[index]);
});

app.post('/postPessoa', (req, res) => {
    pessoas.push(req.body);
    res.status(201).send('pessoa cadastrada');
});

app.put('/putPessoa/:id', (req, res) =>{
    const index = buscaPessoa(req.params.id);
    pessoas[index].nome = req.body.nome;
    res.status(200).json(pessoas);
});

app.delete('/deletePessoa/:id', (req, res) => {
    const index = buscaPessoa(req.params.id);
    pessoas.splice(index, 1);
})

export default app;