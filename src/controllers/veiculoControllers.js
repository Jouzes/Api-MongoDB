import { veiculo } from "../models/veiculo.js";

class VeiculoController {
    //Rota GET padrão
    static async listarVeiculos (req, res) {
        try {
            const listaVeiculos = await veiculo.find({});
            res.status(200).json(listaVeiculos);
        } catch (erro) {
            res.status(500).json({message: "Erro ao listar veiculos!", erro: erro});
        }
    }
    
    //GET com filtro
    static async listarVeiculo (req, res) {
        try {
            const listaVeiculo = await veiculo.findById(req.params.id);
            res.status(200).json(listaVeiculo);
        } catch (erro) {
            res.status(500).json({message: "Erro ao listar veiculo!", erro: erro});
        }
    }

    //POST
    static async cadastrarVeiculo (req, res) {
        try {
        const novoVeiculo = await veiculo.create(req.body); 
        res.status(201).json({message: "Cadastro realizado! ", veiculo: novoVeiculo});
        } catch (erro) {
            res.status(500).json({message: "Erro ao cadastrar veiculo!", erro: erro});
        }
    }

    //PUT
    static async alterarVeiculo (req, res) {
        try {
            const veiculoAtualizado = await veiculo.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
            res.status(200).json({message: "Cadastro alterado com sucesso", veiculo: veiculoAtualizado});
        } catch (erro) {
            res.status(500).json({message: "Erro ao alterar veiculo!", erro: erro});
        }
    }

    //DELETE
    static async excluirVeiculo (req, res) {
        try {
            await veiculo.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Cadastro excluído com sucesso!"});
        } catch (erro) {
            res.status(500).json({message: "Erro ao excluir veiculo!", erro: erro});
        }
    }
}

export default VeiculoController;