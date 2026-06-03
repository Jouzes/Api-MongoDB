import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function conectaBD() {
try {
    mongoose.connect(process.env.MONGO_URL);
    return mongoose.connection;
} catch (erro) {
    console.log("erro de conexão ao bd!" + erro);
};
};

export default conectaBD;