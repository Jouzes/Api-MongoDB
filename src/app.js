import express from "express";
const app = express();
app.use(express.json());

function buscaPessoa (id) {
    return pessoas.findIndex(pessoa => {
        return pessoa.id === Number(id);
    })
}

const pessoas = [
    {
        "id": 1,
        "nome": "teste"
    },
    {
        "id": 2,
        "nome": "teste2"
    }
]

app.get('/', (res, req) => {
    res.status(200).send("API ONLINE");
});

app.get('/getPessoa', (req, res) => {
    res.status(200).json(pessoas);
});

app.get('/getPessoa/:id', (req, res) => {
    const index = buscaPessoa(req.params.id);
    res.status(200).json(pessoas[index]);
});

app.post('/postPessoa', (req, res) => {
    pessoas.push(req.body);
    res.status(201).send('pessoa cadastrada');
});

app.put('/putPessoa/:id', (req, res) =>{
    const index = buscaPessoa(req.params.id);
    pessoas[index].nome = req.body.nome;
    res.status(200).json(pessoas);
});

app.delete('/deletePessoa/:id', (req, res) => {
    const index = buscaPessoa(req.params.id);
    pessoas.splice(index, 1);
})

export default app;