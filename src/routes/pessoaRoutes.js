import express from "express";
import PessoaController from "../controllers/pessoaControllers.js";

const routes = express.Router();

routes.get("/getPessoa", PessoaController.listarPessoas);
routes.get("/getPessoa/busca", PessoaController.listarPessoasPorCarro);
routes.get("/getPessoa/:id", PessoaController.listarPessoa);
routes.post("/postPessoa", PessoaController.cadastrarPessoa);
routes.put("/putPessoa/:id", PessoaController.alterarPessoa);
routes.delete("/deletePessoa/:id", PessoaController.excluirPessoa);

export default routes;