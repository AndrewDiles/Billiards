"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { 
  handleLogIn,
  handleCreateAccount,
  handleViewLobby,
  handleJoinGame,
  handlePurchase,
  handleCreateLobby,
  handleBeginGame,
  handleNextMove,
  handleGameOver
} = require('./handlers');

const PORT = 8899;

const App = express();


App
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))


  // provided the correct password: retrieves user's profile info
  .post("/be/logIn", handleLogIn)
  // Body has shape: {
  // userName:
  // password:
  // }

  // provided the correct password: retrieves user's profile info
  .post("/be/createAccount", handleCreateAccount)
  // Body has shape: {
  // userName:
  // password:
  // }

  .post("/be/purchase/", handlePurchase)
  // Body has shape: {
  // userName:
  // item:
  // }
  // returns new userInfo
  
  // fetches all the current lobbies from mongo
  .get("/be/lobby/view", handleViewLobby)

  // creates a lobby, returns a lobby number
  .post("/be/lobby/create", handleCreateLobby)
  // Body has shape: {
  // userName:
  // }

  // joins a lobby that already exists
  .post("/be/lobby/join", handleJoinGame)
  // Body has shape: {
    // player1:
    // joiningPlayer:
    // joiningPlayerWealth:
  // }

  // begins a game from the lobby
  .put("/be/lobby/beginGame", handleBeginGame)

  // places a copy of the game's state onto the server for the other player to retrieve
  .post("/be/game/nextMove", handleNextMove)
  
  // Places game in user's history, adds appropriate dubloons to their account, returns their new userInfo
  .post("/be/game/gameOver", handleGameOver)
  // Body has shape: {
    // userName:
    // gameInfo:
  // }

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  module.exports = App;