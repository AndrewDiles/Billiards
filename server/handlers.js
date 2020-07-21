'use strict';
const AppImport = require('./index');
const server = require('http').Server(AppImport);
const socket = require('socket.io')(server);
const { MongoClient } = require('mongodb');
const assert = require('assert');

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

const initial = "Xq52IG";
//Xr75ML
let result = "";
for(let i=0; i<initial.length; i++) {
result += String.fromCharCode(initial.charCodeAt(i)+i)
}

const uri = `mongodb+srv://poolMaster:${result}@cluster0-el4bm.mongodb.net/test`


const client = new MongoClient(uri, { 
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

    await client.connect();
    const db = client.db('billiardsInfo');
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      console.log('result from mongo was:', result)
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

    await client.connect();
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
  };

  const handleViewLobby = async (req, res) => {
    await client.connect();
    const db = client.db('billiardsInfo');
    try {
      const result = await db.collection('lobbyInfo').find().toArray();
      res.status(200).json({ status: 200, lobbyGames: result })
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };


  
  

  const handleJoinGame = async (req, res) => {

    const player1 = req.body.player1;
    const joiningPlayer = req.body.player2;
    const joiningPlayerWealth = req.body.player2Wealth;
    // console.log('player1',player1)
    // console.log('joiningPlayer',joiningPlayer)
    // console.log('joiningPlayerWealth',joiningPlayerWealth)
    if (!player1 || !joiningPlayer || joiningPlayerWealth === null) {
      // console.log('11111111')
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      await client.connect();
      const db = client.db('billiardsInfo');
      
      try {
        const findMatch = await db.collection('lobbyInfo').findOne({ Player1: player1 });
        // console.log('222222222')
        if (!findMatch) {
          // console.log('333333333')
          res.status(404).json({ status: 404, error: 'That scurvy dog took off!' });
        }
        else if (findMatch.player2) {
          // console.log('3.5 3.5 3.5 3.5')
          res.status(401).json({ status: 401, error: "They've already found a sucker to beat." });
        }
        else {
          const query = { Player1: player1 };
          const newValues = { $set: { Player2: joiningPlayer, Player2Wealth: joiningPlayerWealth } };
          const r = await db.collection('lobbyInfo').updateOne(query, newValues);
          // assert.equal(1, r.matchedCount);
          // console.log('44444444')
          assert.equal(1, r.modifiedCount);
          // console.log('55555555')
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        // console.log('666666666')
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
  };

  const handleReady = async (req, res) => {

    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const readyingPlayerNumber = req.body.readyingPlayerNumber;
    if (!player1 || !player2 || !readyingPlayerNumber) {
      console.log('Failed at post data reception');
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      await client.connect();
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
        // console.log('222222222')
        if (!findMatch) {
          // console.log('333333333')
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
          // console.log('44444444')
          assert.equal(1, r.modifiedCount);
          // console.log('55555555')
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        // console.log('666666666')
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
  };

  const handleNotReady = async (req, res) => {

    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const readyingPlayerNumber = req.body.readyingPlayerNumber;
    if (!player1 || !player2 || !readyingPlayerNumber) {
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      await client.connect();
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
        // console.log('222222222')
        if (!findMatch) {
          // console.log('333333333')
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
          // console.log('44444444')
          assert.equal(1, r.modifiedCount);
          // console.log('55555555')
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        // console.log('666666666')
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
  };

  const handleLeave = async (req, res) => {

    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const readyingPlayerNumber = req.body.readyingPlayerNumber;
    if (!player1 || !player2 || !readyingPlayerNumber) {
      console.log('Failed at post data reception');
      res.status(400).json({ status: 400, error: 'Credentials be missing...'  });
    }
    else {
      await client.connect();
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
        // console.log('222222222')
        if (!findMatch) {
          // console.log('333333333')
          res.status(404).json({ status: 404, error: 'That scurvy dog took off!' });
        }
        else {
          let newValues;
          if (readyingPlayerNumber === "Player1") {
            newValues = { $set: { Player1: null, Player1Wealth: null, Player1Ready: false } };
          }
          else {
            newValues = { $set: { Player2: null, Player2Wealth: null,  Player2Ready: false } };
          }
          
          const r = await db.collection('lobbyInfo').updateOne(query, newValues);
          // assert.equal(1, r.matchedCount);
          // console.log('44444444')
          assert.equal(1, r.modifiedCount);
          // console.log('55555555')
          res.status(200).json({ status: 200, message: "Success!" })
        }
      } catch (err) {
        console.log(err);
        // console.log('666666666')
        res.status(500).json({ status: 500, error: "Someone will walk the plank for this error!" });
      }
    }
  };

  const handlePurchase = async (req, res) => {

    const userName = req.body.userName;
    const item = req.body.item;

    console.log(`user ${userName} wishes to buy ${item}`);

    if (!userName || !item) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
      return;
    }

    console.log('getting mongo info')

    await client.connect();
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
        console.log(`cost of ${item} is ${cost}`);
        let newWealth = result.dubloons - cost;
        let newInventory = result.inventory;
        newInventory[item] = true;
        const query = { userName: userName };
        const newValues = { $set: { inventory : newInventory, dubloons : newWealth}};
        const r = await db.collection('userInfo').updateOne(query, newValues);
        // assert.equal(1, r.matchedCount);
        // console.log('44444444')
        assert.equal(1, r.modifiedCount);
        // console.log('55555555')
        let newUserInfo = result;
        newUserInfo.dubloons = newWealth;
        newUserInfo.inventory = newInventory;
        res.status(200).json({ status: 200, userInfo: newUserInfo })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };

  // TBD
  const handleCreateLobby = async (req, res) => {

    const userName = req.body.userName;
    const userWealth = req.body.userWealth;
    const currentTime = req.body.currentTime;

    if (!userName || !currentTime || (!userWealth && userWealth !== 0)) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
    }

    await client.connect();
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
  };

  //TBD
  const handleBeginGame = async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    if (password.length === 0 || userName.length === 0) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
    }

    await client.connect();
    const db = client.db('billiardsInfo');  // this may need to be Billiards?
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      
      if (!result || result.length === 0) {
        res.status(404).json({ status: 404, user: 'Not Found' });
      }
      else if (result.passWord !== password) {
        res.status(400).json({ status: 400, message: 'Password is incorrect'  });
      }
      else {
        res.status(200).json({ status: 200, user: result })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };

  //TBD
  const handleNextMove = async (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    if (password.length === 0 || userName.length === 0) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
    }

    await client.connect();
    const db = client.db('billiardsInfo');  // this may need to be Billiards?
    
    try {
      const result = await db.collection('userInfo').findOne({ userName: userName });
      
      if (!result || result.length === 0) {
        res.status(404).json({ status: 404, user: 'Not Found' });
      }
      else if (result.passWord !== password) {
        res.status(400).json({ status: 400, message: 'Password is incorrect'  });
      }
      else {
        res.status(200).json({ status: 200, user: result })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };

  const handleGameOver = async (req, res) => {

    const userName = req.body.userName;
    const gameInfo = req.body.gameInfo;

    if (userName.length === 0 || !gameInfo) {
      res.status(400).json({ status: 400, message: 'Fields may not be blank'  });
    }

    await client.connect();
    const db = client.db('billiardsInfo');  // this may need to be Billiards?
    
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
  };

module.exports = {
  handleLogIn,
  handleCreateAccount,
  handleJoinGame,
  handlePurchase,
  handleViewLobby,
  handleCreateLobby,
  // handleBeginGame,
  // handleNextMove,
  handleGameOver,
  handleReady,
  handleNotReady,
  handleLeave
};