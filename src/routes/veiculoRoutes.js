import express from "express";
import VeiculoController from "../controllers/veiculoControllers.js";

const routes = express.Router();

routes.get("/getVeiculo", VeiculoController.listarVeiculos);
routes.get("/getVeiculo/:id", VeiculoController.listarVeiculo);
routes.post("/postVeiculo", VeiculoController.cadastrarVeiculo);
routes.put("/putVeiculo/:id", VeiculoController.alterarVeiculo);
routes.delete("/deleteVeiculo/:id", VeiculoController.excluirVeiculo);

export default routes;