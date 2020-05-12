import { act } from "react-dom/test-utils";

const initialState = {
  user: null,
  currentGame: null,
  status: 'idle',
};

// template:
// 8:
// currentGame: {
        //   activePlayer: player1,
        //   gameWinner: null,
        //   player1 : {
        //     name: player1,
        //     ballType: null,
        //     ballsSunk: [],
        //   },
        //   player2 : {
        //     name: player1,
        //     ballType: null,
        //     ballsSunk: [],
        //   }
        // }
// 9:
// {
//   player1Name: player1,
//   player1GameInfo: {
//     ballsSunk: [],
//     numberOfShots: 0,
//     activePlayer: true
//   }
// }

// template:
// userInfo : {
  // "userName": "a",
  // "password": "a",
  // "dubloons": 4000,
  // "accumulatedWealth" : 40000,
  // "inventory": {
  //   "crookedStick": true,
  //   "plainOlCue": false,
  //   "magicWand": false,
  //   "boomStick": false,
  //   "wirtsLeg": false,
  //   "chalk": true,
  //   "purpleChalk": false,
  //   "rainbowChalk": false
  // },
  // "gameHistory": [
  //   {
  //     "type": "nine",
  //     "opponent": null,
  //     "result" : "win26",
  //     "date": "Sat May 02 2020 10:40:28 GMT-0400 (Eastern Daylight Time)"
  //   },
  //   {
  //     "type": "eight",
  //     "opponent": "Shark",
  //     "result" : "loss",
  //     "date": "Sat May 02 1920 10:40:28 GMT-0400 (Eastern Daylight Time)"
  //   }
  // ]
// }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_INFO' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'RECEIVE_USER_INFO' : {
      console.log('action from inside reducer',action.userInfo)
      return {
        user: action.userInfo,
        status: 'idle',
      }
    }
    case 'RECEIVE_USER_INFO_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'REQUEST_CREATE_NEW_USER' : {
      return {
        ...state,
        user: action.user,
        status: 'loading',
      }
    }
    case 'CREATE_NEW_USER_SUCCESS' : {
      return {
        ...state,
        status: 'idle',
      }
    }
    case 'CREATE_NEW_USER_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'LOG_USER_OUT' : {
      return {...initialState}
    }
    case 'REQUEST_AVAILABLE_GAMES' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'LOAD_AVAILABLE_GAMES_SUCCESS' : {
      return {
        ...state,
        status: 'idle',
      }
    }
    case 'LOAD_AVAILABLE_GAMES_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'REQUEST_JOIN_GAME' : {
      return {
        ...state,
        status: 'joining',
      }
    }
    case 'JOIN_GAME_SUCCESS' : {
      return {
        ...state,
        currentGame: {...action.newGameInfo},
        status: 'idle',
      }
    }
    case 'JOIN_GAME_ERROR' : {
      return {
        ...state,
        status: 'idle',
      }
    }
    case 'CHANGE_ACTIVE_PLAYER' : {
      let newPlayerActivePlayer = 'player1';
      // console.log('WE ARE HERE');
      // console.log('state.currentGame.activePlayer',state.currentGame.activePlayer)
      // console.log(state.currentGame.activePlayer === 'player1')
      if (state.currentGame.activePlayer === 'player1') {
        newPlayerActivePlayer = 'player2';
      }
      return {
        ...state,
        currentGame : {
          ...state.currentGame,
          activePlayer: newPlayerActivePlayer,
        }
      }
    }
    case 'REMOVE_CURRENT_GAME' : {
      return {
        ...state,
        currentGame: null,
      }
    }
    // case 'SET_GAME_WINNER_EIGHT_BALL' : {
    //   return {
    //     ...state,
    //     currentGame: {
    //       ...state.currentGame,
    //       gameWinner: action.winner,
    //     }
    //   }
    // }
    case 'SET_GAME_WINNER_NINE_BALL' : {
      //test player condition to see if this player won to add currency
      if (state.user) {
        return {
          ...state,
          user : {...state.user,
            dubloons: state.user.dubloons + 50,
            accumulatedWealth: state.user.accumulatedWealth + 50,
          },
          currentGame: {...state.currentGame,
            gameWinner: "player1",
          },
          status: 'game-over',
        }
      }
      else {
        return {
          ...state,
          currentGame: {...state.currentGame,
            gameWinner: "player1",
          },
          status: 'game-over',
        }
      }
    }
    case 'SET_GAME_WINNER_EIGHT_BALL' : {
      //test player condition to see if this player won to add currency
      let addedDubloons = 20;
      if (state.user) {
        if (state.user.userName === state.currentGame[action.winner].name) {
          addedDubloons = 200;
        }
        return {
          ...state,
          user : {...state.user,
            dubloons: state.user.dubloons + addedDubloons,
            accumulatedWealth: state.user.accumulatedWealth + addedDubloons,
          },
          currentGame: {...state.currentGame,
            gameWinner: action.winner,
          },
          status: 'game-over',
        }
      }
      else {
        return {
          ...state,
          currentGame: {...state.currentGame,
            gameWinner: action.winner,
          },
          status: 'game-over',
        }
      }
    }
    case 'ADD_TO_SHOT_TOTAL' : {
      return {
        ...state,
        currentGame: {...state.currentGame,
          player1GameInfo : {
            ...state.currentGame.player1GameInfo,
            numberOfShots : 1 + state.currentGame.player1GameInfo.numberOfShots,
          }
        },
      }
    }
    case 'ADD_TO_BALLS_SUNK_NINE' : {
      let allBallsSunk = [...state.currentGame.player1GameInfo.ballSunk];
      action.incomingBallsSunk.forEach((ball)=>{
        allBallsSunk.push(ball);
      })
      return {
        ...state,
        currentGame : {...state.currentGame,
          player1GameInfo : {...state.currentGame.player1GameInfo,
            ballsSunk : allBallsSunk,
          }
        }
      }
    }
    case 'SET_OBJECTIVES' : {
      console.log('action.player',action.player,'action.ballType',action.ballType)
      let newState = {...state};
      state.currentGame[action.player].ballType = action.ballType;
      let altBallType = '';
      if (action.ballType === "stripes") altBallType = "solids";
      else altBallType = "stripes";
      let altPlayer = '';
      if (action.player === "player1") altPlayer = "player2";
      else altPlayer = "player1";
      state.currentGame[altPlayer].ballType = altBallType;
      console.log('altPlayer',altPlayer,'altBallType',altBallType)
      return newState
    }
    case 'ADD_TO_SUNK_BALLS' : {
      // action.solids,
      // action.stripes
      let newState = {...state};
      if (newState.currentGame.player1.ballType === "stripes") {
        let newStripes = newState.currentGame.player1.ballsSunk;
        action.stripes.forEach((ball)=>{
          newStripes.push(ball)
        })
        let newSolids = newState.currentGame.player2.ballsSunk;
        action.solids.forEach((ball)=>{
          newSolids.push(ball)
        })
        newState.currentGame.player1.ballsSunk = newStripes;
        newState.currentGame.player2.ballsSunk = newSolids;
      }
      else {
        let newStripes = newState.currentGame.player2.ballsSunk;
        action.stripes.forEach((ball)=>{
          newStripes.push(ball)
        })
        let newSolids = newState.currentGame.player1.ballsSunk;
        action.solids.forEach((ball)=>{
          newSolids.push(ball)
        })
        newState.currentGame.player2.ballsSunk = newStripes;
        newState.currentGame.player1.ballsSunk = newSolids;
      }
      return newState;

    }
    default: {
      return state;
    }
  }
}


// currentGame: {
  //   activePlayer: player1,
  //   gameWinner: null,
  //   player1 : {
  //     name: player1,
  //     ballType: null,
  //     ballsSunk: [],
  //   },
  //   player2 : {
  //     name: player1,
  //     ballType: null,
  //     ballsSunk: [],
  //   }
  // }
// 9:
// {
//   player1Name: player1,
//   player1GameInfo: {
//     ballsSunk: [],
//     numberOfShots: 0,
//     activePlayer: true
//   }
// }