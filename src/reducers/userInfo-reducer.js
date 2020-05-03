const initialState = {
  user: null,
  status: 'idle',
};

// template:
// userInfo : {
  // "userName": "a",
  // "password": "a",
  // "dubloons": 4000,
  // "inventory": {
  //   "crookedStick": true,
  //   "plainOlCue": false,
  //   "magicWand": false,
  //   "boomStick": false,
  //   "wirtsLeg": false,
  //   "chalk": false,
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
    default: {
      return state;
    }
  }
}