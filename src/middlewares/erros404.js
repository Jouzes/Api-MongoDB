import NaoEncontrado from "../erros/naoEncontrado.js";

function erros404 (req, res, next) {
    const erro404 = new NaoEncontrado();
    next(erro404);
}

export default erros404;