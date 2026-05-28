import pessoa from "../models/pessoa.js";

class PessoaController {
    static async listarPessoas (req, res) {
        const listaPessoas = await pessoa.find({});
        res.status(200).json(listaPessoas);
    };
};

export default PessoaController;