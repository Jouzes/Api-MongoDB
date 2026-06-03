import pessoa from "../models/pessoa.js";
import {veiculo} from "../models/veiculo.js";

class PessoaController {
    //Rota GET padrão
    static async listarPessoas (req, res) {
        try {
            const listaPessoas = await pessoa.find({}).populate("veiculo");
            res.status(200).json(listaPessoas);
        } catch (erro) {
            next(erro);
        }
    }
    
    //GET com filtro
    static async listarPessoa (req, res, next) {
        try {
            const listaPessoa = await pessoa.findById(req.params.id).populate("veiculo");
            if (listaPessoa !== null) {
                res.status(200).json(listaPessoa);
            } else {
                res.status(404).json({message: "Nenhum cadastro encontrado!"});
            }
        } catch (erro) {
            next(erro);
        }
    }
    //POST
    static async cadastrarPessoa (req, res, next) {
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
            next(erro);
        }
    }

    //PUT
    static async alterarPessoa (req, res, next) {
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
            next(erro);
        }
    }

    //DELETE
    static async excluirPessoa (req, res, next) {
        try {
            await pessoa.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Cadastro excluído com sucesso!"});
        } catch (erro) {
            next(erro);
        }
    }

    static async listarPessoasPorVeiculo (req, res, next) {
        const nomeVeiculo = req.query.veiculo;
        try {
            const veiculosEncontrados = await veiculo.find({nome: nomeVeiculo});
            const veiculosIds = veiculosEncontrados.map((veiculo) => veiculo._id);
            const pessoaPorVeiculo = await pessoa.find({veiculo: {$in: veiculosIds}}).populate("veiculo");
            res.status(200).json(pessoaPorVeiculo);
        } catch (erro) {
            next(erro);
        }
    }
}

export default PessoaController;
