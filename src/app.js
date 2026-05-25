import express from "express";

array = [
    {
        "id": 1,
        "nome": "teste"
    },
    {
        "id": 2,
        "nome": "teste2"
    }
]

const app = express();

app.get('/', (req, res) => {
    req.status(200).send('teste');
})

app.get('/teste', (req, res) => {
    res.status(200).json(array);
})

export default app;