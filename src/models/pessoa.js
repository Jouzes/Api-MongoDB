import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema({
    //id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: [true, "O nome da pessoa não foi informado!"] },
    cpf: { type: String, required: [true, "O CPF da pessoa não foi informado!"] },
    dataNascimento: { type: String },
    veiculo: { type: mongoose.Schema.Types.ObjectId, ref: "veiculos", required: [true, "O ID do veículo não foi informado!"]}
},
{
    versionKey: false
});

const pessoa = mongoose.model("pessoas", pessoaSchema);

export default pessoa;
