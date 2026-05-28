import express from "express";
import PessoaController from "../controllers/pessoaControllers.js";

const routes = express.Router();

routes.get("/getPessoa", PessoaController.listarPessoas);