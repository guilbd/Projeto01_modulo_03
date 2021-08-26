const express = require('express');
const gameSchema = require('./models/game');

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send({ info: 'Hello MongoDB'});
});

app.get('/games', async (req, res) => {
    const games = await gameSchema.find();
    res.send(games);
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));