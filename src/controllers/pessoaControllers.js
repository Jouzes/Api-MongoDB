import pessoa from "../models/pessoa.js";
import {veiculo} from "../models/veiculo.js";

class PessoaController {
    //Rota GET padrão
    static async listarPessoas (req, res) {
        try {
            const listaPessoas = await pessoa.find({}).populate("veiculo");
            res.status(200).json(listaPessoas);
        } catch (erro) {
            res.status(500).json({message: "Erro ao listar pessoas!", erro: erro});
        }
    }
    
    //GET com filtro
    static async listarPessoa (req, res) {
        try {
            const listaPessoa = await pessoa.findById(req.params.id).populate("veiculo");
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

            if (!veiculoEncontrado) {
                return res.status(404).json({message: "Veiculo nao encontrado!"});
            }

            const pessoaCriada = await pessoa.create(novaPessoa);
            await pessoaCriada.populate("veiculo");

            res.status(201).json({message: "Cadastro realizado! ", pessoa: pessoaCriada});
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }

    //PUT
    static async alterarPessoa (req, res) {
        try {
            if (req.body.veiculo) {
                const veiculoEncontrado = await veiculo.findById(req.body.veiculo);

                if (!veiculoEncontrado) {
                    return res.status(404).json({message: "Veiculo nao encontrado!"});
                }
            }

            const pessoaAtualizada = await pessoa.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }).populate("veiculo");
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

    static async listarPessoasPorVeiculo ( req, res) {
        const nomeVeiculo = req.query.veiculo;
        try {
            const veiculosEncontrados = await veiculo.find({nome: nomeVeiculo});
            const veiculosIds = veiculosEncontrados.map((veiculo) => veiculo._id);
            const pessoaPorVeiculo = await pessoa.find({veiculo: {$in: veiculosIds}}).populate("veiculo");
            res.status(200).json(pessoaPorVeiculo);
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }
}

export default PessoaController;
