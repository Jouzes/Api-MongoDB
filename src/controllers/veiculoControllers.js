import {veiculo} from "../models/index.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class VeiculoController {
    //Rota GET padrão
    static async listarVeiculos (req, res, next) {
        try {
            const listaVeiculos = await veiculo.find({});
            if (listaVeiculos !== null) {
                res.status(200).json(listaVeiculos);
            } else {
                res.status(404).json({message: "Não existe nenhum veículo cadastrado!"});
            }
        } catch (erro) {
            next(erro);
        }
    }
    
    //GET com filtro
    static async listarVeiculo (req, res, next) {
        try {
            const listaVeiculo = await veiculo.findById(req.params.id);
            if (listaVeiculo !== null) {
                res.status(200).json(listaVeiculo);
            } else {
                next(new NaoEncontrado("Nenhum veículo encontrado com esse Id!"));
            }
        } catch (erro) {
            next(erro);
        }
    }

    //POST
    static async cadastrarVeiculo (req, res, next) {
        try {
        const novoVeiculo = await veiculo.create(req.body); 
        res.status(201).json({message: "Cadastro realizado! ", veiculo: novoVeiculo});
        } catch (erro) {
            next(erro);
        }
    }

    //PUT
    static async alterarVeiculo (req, res, next) {
        try {
            const veiculoAtualizado = await veiculo.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
            if (veiculoAtualizado !== null) {
                res.status(200).json({message: "Cadastro alterado com sucesso", veiculo: veiculoAtualizado});
            } else {
                next(new NaoEncontrado("Nenhum veículo encontrado com esse ID!"));
            }
        } catch (erro) {
            next(erro);
        }
    }

    //DELETE
    static async excluirVeiculo (req, res, next) {
        try {
            const veiculoExcluido = await veiculo.findByIdAndDelete(req.params.id);
            if (veiculoExcluido !== null) {
                res.status(200).json({message: "Cadastro excluído com sucesso!"});
            } else {
                next(new NaoEncontrado("Nenhum veículo encontrado com esse ID!"));
            }
        } catch (erro) {
            next(erro);
        }
    }
}

export default VeiculoController;