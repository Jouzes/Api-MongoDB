import mongoose from "mongoose";

const veiculoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "O nome do veículo não foi informado!"] },
    placa: { type: String, required: [true, "A placa do veículo não foi informada!"] },
    ano: { type: String, required: [true, "O ano do veículo não foi informado!"] }
},
{
    versionKey: false
});

const veiculo = mongoose.model("veiculos", veiculoSchema);

export {veiculo, veiculoSchema};