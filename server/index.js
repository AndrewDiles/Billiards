"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// const router = new express.Router();

const { 
  handleLogIn,
  handleCreateAccount,
  // handleViewLobby,
  handlePollForLobby,
  handleJoinGame,
  handlePurchase,
  handleCreateLobby,
  handleReady,
  handleNotReady,
  handleLeave,
  handleGameOver
} = require('./handlers');

const PORT = process.env.PORT || 8899;

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
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    res.header(
      "Access-Control-Allow-Credentials",
      true
    );
    next();
  })
  .use(morgan("tiny"))

  .use('/home', express.static("../build/"))
  .use('/login', express.static("../build/"))
  .use('/billiards', express.static("../build/"))
  .use('/view-account', express.static("../build/"))
  .use('/view-lobby', express.static("../build/"))
  .use('/', express.static("../build/"))
  .use('/*', express.static("../build/"))

  // .use(express.static("../build/"))

  // .get('/*', (req, res) => {
  //   res.sendFile("../build/");
  // })

  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  // .use("/", express.static(__dirname + "/"))


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
  
  // fetches all the current lobbies from mongo - obsolete
  // .get("/be/lobby/view", handleViewLobby)

  .get("/be/lobby/poll", handlePollForLobby)

  // creates a lobby, returns a lobby number
  .post("/be/lobby/create", handleCreateLobby)
  // Body has shape: {
  // userName:
  // userWealth:
  // currentTime:
  // }
  // returns {lobby}

  // joins a lobby that already exists
  .post("/be/lobby/join", handleJoinGame)
  // Body has shape: {
    // playerToAdd,
    // playerToAddWealth,
    // existingPlayerInLobby,
    // slotToAddNewPlayerInto,
  // }

  .post("/be/lobby/ready", handleReady)
  // Body has shape: {
    // player1:
    // player2:
    // readyingPlayerNumber:
  // }

  .post("/be/lobby/not-ready", handleNotReady)
  // Body has shape: {
    // player1:
    // player2:
    // readyingPlayerNumber:
  // }

  .post("/be/lobby/leave", handleLeave)
  // Body has shape: {
    // player1:
    // player2:
    // readyingPlayerNumber:
  // }

      // begins a game from the lobby
    // .put("/be/lobby/beginGame", handleBeginGame)

  // places a copy of the game's state onto the server for the other player to retrieve
  // .post("/be/game/nextMove", handleNextMove)
  
  // Places game in user's history, adds appropriate dubloons to their account, returns their new userInfo
  .post("/be/game/gameOver", handleGameOver)
  // Body has shape: {
  //   userName:
  //   gameInfo:
  // }

  // .use(function(req, res, next) {
  //   console.log('hitting end point #1');
  //   res.sendFile(path.join(__dirname, '../build', 'index.html'));
  // })

  // router.get('/*', function(req, res, next) {
  //     console.log('hitting end point #2');
  //   res.sendFile(path.join(__dirname, '../build', 'index.html'));
  // })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  module.exports = App;
