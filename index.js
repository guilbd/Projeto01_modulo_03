const express = require("express");
const mongoose = require("./database");
const gameSchema = require("./models/game");

const app = express();
const port = 3000;
app.use(express.json());

//Função para verificação se o id recebido no parâmetro é válido. é válido
function validMongoose(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  } else {
    return true;
  }
}

//Função para verificar se o document foi encontrado.
function validDocument(game) {
  if (!game) {
    return false;
  } else {
    return true;
  }
}

//Função para verificar se todos os campos necessários estão completos
function validBody(game) {
  if (!game || !game.name || !game.trailler || !game.imageURL) {
    return false;
  } else {
    return true;
  }
}

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

//Retorna a lista com todos os jogos cadastrados
app.get("/games", async (req, res) => {
  const games = await gameSchema.find();
  res.send(games);
});

//GET by id => /games/:id - retorna um unico game pelo ID
app.get("/games/:id", async (req, res) => {
  const id = req.params.id;

  //verificação se o id recebido no parâmetro é válido. é válido
  if (!validMongoose(id)) {
    res.status(422).send({ error: "Id inválido." });
  }

  //busca no mongodb o document que possui o id recebido pela req.param
  const game = await gameSchema.findById(id);

  //Verifica se o document foi encontrado.
  if (!validDocument(game)) {
    res.status(404).send({ error: "Jogo não encontrado." });
  }
  res.send({ game });
});

//POST - /games - cria um novo game
app.post("/games", async (req, res) => {
  const game = req.body;
  if (!validBody(game)) {
    res.status(400).send({ error: "Jogo inválido." });
  }
  const gameSalvo = await new gameSchema(game).save();
  res.status(201).send({ gameSalvo });
});

//PUT - /games/:id - Atualiza um game pelo id
app.put("/games/:id", async (req, res) => {
  const id = req.params.id;
  validMongoose(id);
  const game = await gameSchema.findById(id);
  if (!validDocument(game)) {
    res.status(404).send({ error: "Jogo não encontrado." });
  }
  const novoGame = req.body;
  if (!validBody(game)) {
    res.status(400).send({ error: "Jogo inválido." });
  };
  await gameSchema.findOneAndUpdate({ _id: id }, novoGame);
  const gameAtualizado = await gameSchema.findById(id);
  res.send({ gameAtualizado });
});

//delete
app.delete("/games/:id", async (req, res) => {
  const id = req.params.id;
  validMongoose(id);
  const game = await gameSchema.findById(id);
  if (!validDocument(game)) {
    res.status(404).send({ error: "Jogo não encontrado." });
  }
  await gameSchema.findByIdAndDelete(id);
  res.send({ message: "Jogo excluído com sucesso!" });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
