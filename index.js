const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;

const games = [
  {
    id: 1,
    name: "God of War",
    trailler: "https://www.youtube.com/watch?v=CJ_GCPaKywg",
    imageURL: "https://pt.wikipedia.org/wiki/God_of_War_(jogo_eletr%C3%B4nico_de_2018)#/media/Ficheiro:God_of_War_2018_capa.png"
  },
  {
    id: 2,
    name: "Assassin´s Creed IV– Black Flag",
    trailler: "https://www.youtube.com/watch?v=O1nRrvsGD9s",
    imageURL: "http://s.glbimg.com/po/tt/f/original/2013/10/04/assassins-creed-4-black-flag-ac.jpg"
  },
];

const getGamesValid = () => games.filter(Boolean);

const getGameById = id => games.find(game => game.id === id);

const getGameIndexById = id => getGamesValid().findIndex(game => game.id === id);

app.get("/", (req, res) => {
  res.status(200).send({ games: "Lista de Games" });
});

app.get("/games", (req, res) => {
  res.json({ games });
});

app.get("/games/:idGame", (req, res) => {
  const id = +req.params.idGame;
  const game = getGameById(id);

  !game
    ? res.status(404).send({ error: "Jogo não existe." })
    : res.json({ game });
});

app.post("/games", (req, res) => {
  const game = req.body;
  if (!game || !game.name || !game.trailler || !game.imageURL) {
    res.status(400).send({ error: "Jogo inválido!" });
    return;
  }

  const lastGame = games[games.length - 1];

  if (games.length) {
    game.id = lastGame.id + 1;
    games.push(game);
  } else {
    game.id = 1;
    games.push(game);
  }

  res.status(201).send({ game });
});

app.put("/games/:id", (req, res) => {
    const id = +req.params.id;
    
    const gameIndex = getGameIndexById(id);

    if (gameIndex < 0) {
        res.status(404).send({ error: 'Jogo não encontrado'});
        return;
    };

    const newGame = req.body;
    
    if (!newGame || !newGame.name || !newGame.trailler || !newGame.imageURL){
        res.status(400).send({ error: 'Jogo inválido!'});
        return;
    };

    const game = getGameIndexById(id);

    newGame.id = game.id;

    games[gameIndex] = newGame;

    res.send({ message: "Jogo alterado com sucesso!" });

});

app.delete("/games/:id", (req, res) => {
    const id = +req.params.id;

    const gameIndex = getGameIndexById(id);

    if (gameIndex < 0) {
        res.status(404).send({ error: 'Jogo não encontrado'});
        return;
    };

    games.splice(gameIndex, 1);

    res.send("Jogo deletado com sucesso!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});