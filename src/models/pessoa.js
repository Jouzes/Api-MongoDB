import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema({
    //id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    dataNascimento: { type: String }
},
{
    versionKey: false
});

const pessoa = mongoose.model("pessoas", pessoaSchema);

export default pessoa;