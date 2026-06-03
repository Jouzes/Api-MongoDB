import mongoose from "mongoose";

function errosController (erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).json({message: "Dados informados inválidos!"});
    } else {
        res.status(500).json({message: "Erro interno de servidor!"});
    }
}

export default errosController;