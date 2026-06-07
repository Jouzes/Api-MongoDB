import RequisicaoIncorreta from "./requisicaoIncorreta.js";

class ValidacaoIncorreta extends RequisicaoIncorreta {
    constructor(erro) {
        const mensagensErro = Object.values(erro.erros).map(erro => erro.message).join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

export default ValidacaoIncorreta;