import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import ValidacaoIncorreta from "../erros/validacaoIncorreta.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function errosController (erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ValidacaoIncorreta(erro).enviarResposta(res);
    } else if (erro instanceof NaoEncontrado) {
        erro.enviarResposta();
    } else {
        new ErroBase().enviarResposta(res);
    }
}

export default errosController;