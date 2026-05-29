import pessoa from "../models/pessoa.js";
import {veiculo} from "../models/veiculo.js";

class PessoaController {
    //Rota GET padrão
    static async listarPessoas (req, res) {
        try {
            const listaPessoas = await pessoa.find({});
            res.status(200).json(listaPessoas);
        } catch (erro) {
            res.status(500).json({message: "Erro ao listar pessoas!", erro: erro});
        }
    }
    
    //GET com filtro
    static async listarPessoa (req, res) {
        try {
            const listaPessoa = await pessoa.findById(req.params.id);
            res.status(200).json(listaPessoa);
        } catch (erro) {
            res.status(500).json({message: "Erro ao listar pessoa!", erro: erro});
        }
    }

    //POST
    static async cadastrarPessoa (req, res) {
    const novaPessoa = req.body;
        try {
            const veiculoEncontrado = await veiculo.findById(novaPessoa.veiculo);
            const pessoaCompleta = {...novaPessoa, veiculo: { ...veiculoEncontrado._doc }};
            const pessoaCriada = await pessoa.create(pessoaCompleta); 
            res.status(201).json({message: "Cadastro realizado! ", pessoa: pessoaCriada});
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }

    //PUT
    static async alterarPessoa (req, res) {
        try {
            const pessoaAtualizada = await pessoa.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
            res.status(200).json({message: "Cadastro alterado com sucesso", pessoa: pessoaAtualizada});
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }

    //DELETE
    static async excluirPessoa (req, res) {
        try {
            await pessoa.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Cadastro excluído com sucesso!"});
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }

    //
    static async listarPessoasPorCarro ( req, res) {
        const veiculo = req.query.veiculo;
        try {
            const pessoasPorVeiculo = await veiculo.find({veiculo: veiculo});
            res.status(200).json(pessoasPorVeiculo);
        } catch (erro) {
            res.status(500).json({message: "Erro ao listar pessoas por veiculo!", erro: erro});
        }
    }
}

export default PessoaController;