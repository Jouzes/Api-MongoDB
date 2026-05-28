import pessoa from "../models/pessoa.js";

class PessoaController {
    //Rota GET padrão
    static async listarPessoas (req, res) {
        const listaPessoas = await pessoa.find({});
        res.status(200).json(listaPessoas);
    }
    
    //GET com filtro
    static async listarPessoa (req, res) {
        const listaPessoa = await pessoa.findById(req.params.id);
        res.status(200).json(listaPessoa);
    }

    //POST
    static async cadastrarPessoa (req, res) {
        try {
        const novaPessoa = await pessoa.create(req.body); 
        res.status(201).json({message: "Cadastro realizado! ", pessoa: novaPessoa});
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }

    //PUT
    static async alterarPessoa (req, res) {
        try {
            const pessoaAtualizada = await pessoa.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
            res.status(200).json(pessoa.pessoaAtualizada);
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }

    //DELETE
    static async excluirPessoa (req, res) {
        try {
            const pessoaExcluida = await pessoa.findByIdAndDelete(req.params.id);
            res.status(200).send("Cadastro excluído com sucesso!" + JSON.stringify(pessoaExcluida));
        } catch (erro) {
            res.status(500).json({message: `${erro.message}`});
        }
    }
}

export default PessoaController;