'use strict';
const AppImport = require('./index');
const server = require('http').Server(AppImport);
// const socket = require('socket.io')(server);
const { MongoClient } = require('mongodb');
const assert = require('assert');
const password = process.env.mongoKey;

let storedLobbyData = [];

// MongoClient.connect('mongodb+srv://poolMaster:*****@cluster0-el4bm.mongodb.net/test',
//   { useUnifiedTopology: true },
//   function(err, db){
//     if(err){
//       throw err;
//     }
//     console.log("connected to mongodb");

//     socket.on('connection', function(socket){
//       let lobbyInfo = db.collection('lobbyInfo');
//       sendStatus = function(status){
//         socket.emit('status', status);
//       }

//       // Get lobby list from collection
//       lobbyInfo.find().sort({timeOpened}).toArray(function(err, res){
//         if (err) {
//           throw err;
//         }
//         socket.emit('lobbies', res);
//       })
//     });

//     socket.on('createLobby', function(data){
//       let lobbyInfo = db.collection('lobbyInfo');
//       let Player1 = data.userName;
//       let Player1Wealth = data.accumulatedWealth;
//       let timeOpened = Date.now();
//       if (!Player1 || Player1Wealth === null) {
//         sendStatus('invalid input');
//       }
//       else{
//         let newLobby =
//         {
//           timeOpened : timeOpened,
//           gameOngoing: false,
//           Player1 : Player1,
//           Player1Wealth : Player1Wealth,
//           Player1Ready : false,
//           Player2 : null,
//           Player2Wealth : null,
//           Player2Ready : false,
//           LastGameState: null,
//           CurrentTurn : null
//         };

//         lobbyInfo.insert(newLobby, function(socket){
//           socket.emit('output', newLobby);

//           sendStatus({
//             message: 'Lobby created',
//           })
//         })
//       }
//     })
//   }
// );

// const initial = "Xq52IG";
// let result = "";
// for(let i=0; i<initial.length; i++) {
// result += String.fromCharCode(initial.charCodeAt(i)+i)
// }

const uri = `mongodb+srv://poolMaster:${password}@cluster0-el4bm.mongodb.net/test`


const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const pollingConnection =  new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

  const handleLogIn = async (req, res) => {
    // res.status(400).json({ status: 400, message: 'Password is incorrect'  });
    const userName = req.body.userName;
    const password = req.body.password;

    if (password.length === 0 || userName.length === 0) {
      res.status(400).json({ status: 400, message: 'Ye be missing some credentials.'  });
    }

    try {
    await client.connect();
    } catch (err) {
      console.log('err from trying to connect', err);
    }

    const db = client.db('billiardsInfo');
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      // console.log('result from mongo was:', result)
      if (!result || result.length === 0) {
        res.status(404).json({ status: 404, user: 'Not Found', message: 'Ye could not be found!' });
      }
      else if (result.password !== password) {
        res.status(400).json({ status: 400, message: 'Ye speak ill words of pass.'  });
      }
      else {
        res.status(200).json({ status: 200, user: result })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
    // await client.close();
  };

  const handleCreateAccount = async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    if (password.length === 0 || userName.length === 0) {
      res.status(400).json({ status: 400, message: 'Ye be missing some credentials.' });
    }
    else if (userName.includes("no-account")) {
      res.status(400).json({ status: 400, message: 'Your name includes "no-account"?  Be this a joke?' });
    }

    try {
      await client.connect();
      } catch (err) {
        console.log('err from trying to connect', err);
      }

    const db = client.db('billiardsInfo');
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      
      if (result) {
        res.status(400).json({ status: 404, message: 'The crew already includes one that goes by that name.' });
      }
      else {
        let newAccount = {
          userName: userName,
          password: password,
          dubloons: 10,
          accumulatedWealth: 10,
          inventory: {
            crookedStick: true,
            plainOlCue: false,
            magicWand: false,
            boomStick: false,
            wirtsLeg: false,
            chalk: true,
            purpleChalk: false,
            rainbowChalk: false
          },
          gameHistory: []
        }
        const r = await db.collection('userInfo').insertOne(newAccount);
        assert.equal(1, r.insertedCount);
        res.status(200).json({status: 200, user: newAccount});
      };
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
    // await client.close();
  };

  // const handleViewLobby = async (req, res) => {
  //   await client.connect();
  //   const db = client.db('billiardsInfo');
  //   try {
  //     const result = await db.collection('lobbyInfo').find().toArray();
  //     await client.close();
  //     res.status(200).json({ status: 200, lobbyGames: result })
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ status: 500, message: "error" });
  //   }
  // };

  

  const handlePollForLobby = async (req, res) => {
    try {
      await pollingConnection.connect();
      const polldb = pollingConnection.db('billiardsInfo');
      try {
        const result = await polldb.collection('lobbyInfo').find().toArray();
        // console.log('result from mongo was:', result)
        if (result) {
          storedLobbyData = result;
          res.status(200).json({ status: 200, lobbyGames: storedLobbyData })
        }
        else {
          // console.log('result null:', result)
          res.status(304).json({ status: 304, lobbyGames: storedLobbyData })
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "error" });
      }
      await pollingConnection.close();
    } catch (err) {
      console.log('err from trying to connect', err);
    }
  }

  const handleJoinGame = async (req, res) => {

    const playerToAdd = req.body.playerToAdd;
    const playerToAddWealth = req.body.playerToAddWealth;
    const existingPlayerInLobby = req.body.existingPlayerInLobby;
    const slotToAddNewPlayerInto = req.body.slotToAddNewPlayerInto;
  
    if (!playerToAdd || !slotToAddNewPlayerInto || !existingPlayerInLobby || playerToAddWealth === null) {
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
      
    }
    else {
      try {
      await client.connect();
      } catch (err) {
        console.log('err from trying to connect', err);
      }
      const db = client.db('billiardsInfo');
      
      try {
        let findMatch;
        let query;
        if (slotToAddNewPlayerInto === "Player1") {
          findMatch = await db.collection('lobbyInfo').findOne({ Player2: existingPlayerInLobby });
          query = { Player2: existingPlayerInLobby };
        }
        else if (slotToAddNewPlayerInto === "Player2") {
          findMatch = await db.collection('lobbyInfo').findOne({ Player1: existingPlayerInLobby });
          query = { Player1: existingPlayerInLobby };
        }
        if (!findMatch) {
          res.status(404).json({ status: 404, error: 'That scurvy dog took off!' });
        }
        else if ((slotToAddNewPlayerInto === "Player2" && findMatch.player2) || ((slotToAddNewPlayerInto === "Player1" && findMatch.player1))) {
          res.status(401).json({ status: 401, error: "They've already found a sucker to beat." });
        }
        else {
          let newValues;
          if (slotToAddNewPlayerInto === "Player1") { 
            newValues = { $set: { Player1: playerToAdd, Player1Wealth: playerToAddWealth } };
          }
          else if (slotToAddNewPlayerInto === "Player2") {
            newValues = { $set: { Player2: playerToAdd, Player2Wealth: playerToAddWealth } };
          }
          // console.log('newValues',newValues);
          // console.log('query',query);
          
          const r = await db.collection('lobbyInfo').updateOne(query, newValues);
          // assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
    // await client.close();
  };

  const handleReady = async (req, res) => {

    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const readyingPlayerNumber = req.body.readyingPlayerNumber;
    if ((!player1 && !player2) || !readyingPlayerNumber) {
      console.log('Failed at post data reception');
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      try {
        await client.connect();
      } catch (err) {
        console.log('err from trying to connect', err);
      }

      const db = client.db('billiardsInfo');
      
      let query;
      try {
        let findMatch = await db.collection('lobbyInfo').findOne({ Player1: player1 });
        query = { Player1: player1 };
        if (!findMatch) {
          let findMatch = await db.collection('lobbyInfo').findOne({ Player2: player1 });
          query = { Player2: player1 };
        }
        if (!findMatch) {
          let findMatch = await db.collection('lobbyInfo').findOne({ Player1: player2 });
          query = { Player1: player2 };
        }
        if (!findMatch) {
          let findMatch = await db.collection('lobbyInfo').findOne({ Player2: player2 });
          query = { Player2: player2 };
        }
        if (!findMatch) {
          res.status(404).json({ status: 404, error: 'That scurvy dog took off!' });
        }
        else {
          let newValues;
          if (readyingPlayerNumber === "Player1") {
            newValues = { $set: { Player1Ready: true } };
          }
          else {
            newValues = { $set: { Player2Ready: true } };
          }
          
          const r = await db.collection('lobbyInfo').updateOne(query, newValues);
          // assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
    // await client.close();
  };

  const handleNotReady = async (req, res) => {

    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const readyingPlayerNumber = req.body.readyingPlayerNumber;
    if ((!player1 && !player2) || !readyingPlayerNumber) {
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      try {
        await client.connect();
      } catch (err) {
        console.log('err from trying to connect', err);
      }
      const db = client.db('billiardsInfo');
      
      let query;
      try {
        let findMatch = await db.collection('lobbyInfo').findOne({ Player1: player1 });
        query = { Player1: player1 };
        if (!findMatch) {
          let findMatch = await db.collection('lobbyInfo').findOne({ Player2: player1 });
          query = { Player2: player1 };
        }
        if (!findMatch) {
          let findMatch = await db.collection('lobbyInfo').findOne({ Player1: player2 });
          query = { Player1: player2 };
        }
        if (!findMatch) {
          let findMatch = await db.collection('lobbyInfo').findOne({ Player2: player2 });
          query = { Player2: player2 };
        }
        if (!findMatch) {
          res.status(404).json({ status: 404, error: 'That scurvy dog took off!' });
        }
        else {
          let newValues;
          if (readyingPlayerNumber === "Player1") {
            newValues = { $set: { Player1Ready: false } };
          }
          else {
            newValues = { $set: { Player2Ready: false } };
          }
          
          const r = await db.collection('lobbyInfo').updateOne(query, newValues);
          // assert.equal(1, r.matchedCount);
          assert.equal(1, r.modifiedCount);
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
    // await client.close();
  };

  const handleLeave = async (req, res) => {

    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const readyingPlayerNumber = req.body.readyingPlayerNumber;
    if ((player1 === null && player2 === null) || !readyingPlayerNumber) {
      console.log('Failed at post data reception');
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      try {
        await client.connect();
      } catch (err) {
        console.log('err from trying to connect', err);
      }
      const db = client.db('billiardsInfo');
      
      let query;
      try {
        let findMatch = null;
        if (player1) {
        findMatch = await db.collection('lobbyInfo').findOne({ Player1: player1 });
        query = { Player1: player1 };
        }
        if (!findMatch && player1) {
          findMatch = await db.collection('lobbyInfo').findOne({ Player2: player1 });
          query = { Player2: player1 };
        }
        if (!findMatch && player2) {
          findMatch = await db.collection('lobbyInfo').findOne({ Player1: player2 });
          query = { Player1: player2 };
        }
        if (!findMatch && player2) {
          findMatch = await db.collection('lobbyInfo').findOne({ Player2: player2 });
          query = { Player2: player2 };
        }
        if (!findMatch) {
          res.status(404).json({ status: 404, error: 'That scurvy dog took off!' });
        }
        else {
          let deletingMatch = false;
          let newValues;
          if (readyingPlayerNumber === "Player1") {
            if (findMatch.Player2 === null) {
              deletingMatch = true;
            }
            else {
            newValues = { $set: { Player1: null, Player1Wealth: null, Player1Ready: false } };
            }
          }
          else {
            if (findMatch.Player1 === null) {
              deletingMatch = true;
            }
            else {
            newValues = { $set: { Player2: null, Player2Wealth: null,  Player2Ready: false } };
            }
          }
          if (!deletingMatch) {
            const r = await db.collection('lobbyInfo').updateOne(query, newValues);
            // assert.equal(1, r.matchedCount);
            assert.equal(1, r.modifiedCount);
            res.status(200).json({ status: 200, message: "Success!" })
          }
          else {
            const r = await db.collection('lobbyInfo').remove(query);
            // assert.equal(1, r);
            res.status(200).json({ status: 200, message: "Success!" })
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
    // await client.close();
  };

  const handlePurchase = async (req, res) => {

    const userName = req.body.userName;
    const item = req.body.item;

    // console.log(`user ${userName} wishes to buy ${item}`);

    if (!userName || !item) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
      return;
    }

    try {
      await client.connect();
    } catch (err) {
      console.log('err from trying to connect', err);
    }
    const db = client.db('billiardsInfo');
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      
      if (!result || result.length === 0) {
        res.status(404).json({ status: 404, user: 'Not Found' });
      }
      else {
        let cost = 0;
        if (item === 'plainOlCue') cost = 100;
        else if (item === 'magicWand') cost = 500;
        else if (item === 'boomStick') cost = 5000;
        else if (item === 'wirtsLeg') cost = 30000;
        else if (item === 'purpleChalk') cost = 2000;
        else if (item === 'rainbowChalk') cost = 10000;
        // console.log(`cost of ${item} is ${cost}`);
        let newWealth = result.dubloons - cost;
        let newInventory = result.inventory;
        newInventory[item] = true;
        const query = { userName: userName };
        const newValues = { $set: { inventory : newInventory, dubloons : newWealth}};
        const r = await db.collection('userInfo').updateOne(query, newValues);
        // assert.equal(1, r.matchedCount);
        assert.equal(1, r.modifiedCount);
        let newUserInfo = result;
        newUserInfo.dubloons = newWealth;
        newUserInfo.inventory = newInventory;
        res.status(200).json({ status: 200, userInfo: newUserInfo })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
    // await client.close();
  };

  const handleCreateLobby = async (req, res) => {

    const userName = req.body.userName;
    const userWealth = req.body.userWealth;
    const currentTime = req.body.currentTime;

    if (!userName || !currentTime || (!userWealth && userWealth !== 0)) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
    }

    try {
      await client.connect();
    } catch (err) {
      console.log('err from trying to connect', err);
    }
    const db = client.db('billiardsInfo');
    
    try {
      let findMatch = await db.collection('lobbyInfo').findOne({ Player1: userName });
      
      if (findMatch) {
        res.status(400).json({ status: 404, user: 'Player is already in a lobby' });
      }
      else {
        findMatch = await db.collection('lobbyInfo').findOne({ Player2: userName });
        if (findMatch) {
          res.status(400).json({ status: 404, user: 'Player is already in a lobby' });
        }
        else {
          let lobbyToAdd = {
            timeOpened : currentTime,
            gameOngoing : false,
            Player1 : userName,
            Player1Wealth : userWealth,
            Player1Ready : false,
            Player2 : null,
            Player2Wealth : null,
            Player2Ready : false,
            LastGameState : null,
            CurrentTurn : null
          }
          const r = await db.collection('lobbyInfo').insertOne(lobbyToAdd);
          assert.equal(1, r.insertedCount);
          res.status(200).json({status: 200, lobby: lobbyToAdd});
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
    // await client.close();
  };

  //TBD
  const handleBeginGame = async (req, res) => {

  };

  //TBD
  const handleNextMove = async (req, res) => {

  };

  const handleGameOver = async (req, res) => {

    const userName = req.body.userName;
    const gameInfo = req.body.gameInfo;

    if (userName.length === 0 || !gameInfo) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
    }

    try {
      await client.connect();
    } catch (err) {
      console.log('err from trying to connect', err);
    }
    const db = client.db('billiardsInfo');
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      
      if (!result || result.length === 0) {
        res.status(404).json({ status: 404, user: 'Not Found' });
      }
      else {
        let newWealth = result.dubloons + gameInfo.reward;
        let newAccumulatedWealth = result.accumulatedWealth + gameInfo.reward;
        let newHistoryElement = {
          type: gameInfo.type, 
          opponent: gameInfo.opponent,
          result: gameInfo.result,
          date: gameInfo.date,
        };
        let newHistory = result.gameHistory;
        newHistory.push(newHistoryElement);
        const query = { userName: userName };
        const newValues = { 
          $set: { 
            dubloons : newWealth, 
            accumulatedWealth : newAccumulatedWealth, 
            gameHistory: newHistory
          }
        };
        const r = await db.collection('userInfo').updateOne(query, newValues);
        assert.equal(1, r.modifiedCount);
        let newUserInfo = result;
        newUserInfo.dubloons = newWealth;
        newUserInfo.accumulatedWealth = newAccumulatedWealth;
        newUserInfo.gameHistory = newHistory;
        res.status(200).json({ status: 200, userInfo: newUserInfo })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
    // await client.close();
  };

module.exports = {
  handleLogIn,
  handleCreateAccount,
  handleJoinGame,
  handlePurchase,
  // handleViewLobby,
  handlePollForLobby,
  handleCreateLobby,
  // handleBeginGame,
  // handleNextMove,
  handleGameOver,
  handleReady,
  handleNotReady,
  handleLeave
};