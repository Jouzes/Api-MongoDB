import http from 'http'
const PORT = 3333;

//Cria servidor http
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plan" });
    res.end(rotas[req.url]);
});

//Inicia servidor
server.listen(PORT, () => {
    console.log('servidor escutando na porta 3333');
});

//Rotas
const rotas = {
    "/": "rotaBase"
};