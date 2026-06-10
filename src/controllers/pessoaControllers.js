import {pessoa, veiculo} from "../models/index.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class PessoaController {
    //GET padrão
    static async listarPessoas (req, res, next) {
        try {
            let {limite = 5, pagina = 1} = req.query;

            limite = parseInt(limite);
            pagina = parseInt(pagina);

            if (limite > 0 && pagina > 0) {
                const listaPessoas = await pessoa.find({}).skip((pagina - 1) * limite).populate("veiculo").exec();
                res.status(200).json(listaPessoas);
            } else {
                next(new RequisicaoIncorreta());
            }
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
                next(new NaoEncontrado("Id da pessoa não encontrado!"));
            }
        } catch (erro) {
            next(erro);
        }
    }

    //POST
    static async cadastrarPessoa (req, res, next) {
        try {
            const veiculoEncontrado = await veiculo.findById(req.body.veiculo);

            if (!veiculoEncontrado) {
                return res.status(404).json({message: "Veiculo nao encontrado!"});
            }

            const pessoaCriada = await pessoa.create(req.body);
            await pessoaCriada.populate("veiculo");

            res.status(201).json({message: "Cadastro realizado! ", pessoa: pessoaCriada});
        } catch (erro) {
            next(erro);
        }
    }

    //PUT
    static async alterarPessoa (req, res, next) {
        try {
                const veiculoEncontrado = await veiculo.findById(req.body.veiculo);
                if (!veiculoEncontrado) {
                    return res.status(404).json({message: "Veiculo nao encontrado!"});
                }

                const pessoaAtualizada = await pessoa.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }).populate("veiculo");
                if (pessoaAtualizada !== null) {
                    res.status(200).json({message: "Cadastro alterado com sucesso", pessoa: pessoaAtualizada});
                } else {
                    next(new NaoEncontrado("Id da pessoa não encontrado!"));
                }
        } catch (erro) {
            next(erro);
        }
    }

    //DELETE
    static async excluirPessoa (req, res, next) {
        try {
            const pessoaExcluida = await pessoa.findByIdAndDelete(req.params.id);
            if (pessoaExcluida !== null) {
                res.status(200).json({message: "Pessoa excluída com sucesso!"});
            } else {
                next(new NaoEncontrado("Id da pessoa não encontrado!"));
            }
        } catch (erro) {
            next(erro);
        }
    }

    static async listarPessoasPorFiltro (req, res, next) {
        try {
            const {veiculoBuscado, nome, placa} = req.query;

            const regex = new RegExp(nome, "i");

            const busca = {};

            if (veiculoBuscado) busca.veiculo = veiculoBuscado;
            if (nome) busca.nome = regex;
            if (placa) {
                const veiculoEncontrado = await veiculo.findOne({placa});

                if (!veiculoEncontrado) {
                    next(new NaoEncontrado("Nenhum veículo encontrado com essa placa!"));
                    return;
                }

                busca.veiculo = veiculoEncontrado._id;
            }

            const pessoaPorVeiculo = await pessoa.find(busca).populate("veiculo");
            if (pessoaPorVeiculo.length > 0) {
                res.status(200).json(pessoaPorVeiculo);
            } else {
                next(new NaoEncontrado("Nenhuma pessoa encontrada com esse filtro!"));
            }
        } catch (erro) {
            next(erro);
        }
    }
}

export default PessoaController;
