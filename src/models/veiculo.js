import mongoose from "mongoose";

const veiculoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    placa: { type: String, required: true },
    ano: { type: String, required: true }
},
{
    versionKey: false
});

const veiculo = mongoose.model("veiculos", veiculoSchema);

export {veiculo, veiculoSchema};