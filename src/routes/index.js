import express from "express";
import pessoas from "./pessoaRoutes.js";
import veiculos from "./veiculoRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("teste"));
    app.use(express.json(), pessoas, veiculos);
};

export default routes;