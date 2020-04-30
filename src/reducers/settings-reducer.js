const initialState = {
  gameOn: false,
  gameType: null,           // eight, nine, or null between games
  gameStatus: 'idle',       
  ballInHand: false,        // toggles depending on if player is holding a ball
  shotPower: 1,             // magnitude of the shot's power
  shotAngle: 0,             // the direction the cueball will be fired in (rads)
  cueStrikeLocationX: 0.5,  // values other than 0.5 will cause cw or ccw spin (parallel to table)
  cueStrikeLocationY: 0.5,  // values other than 0.5 will cause over or underspin
  tableSize: 'full',        // full as default
  refreshRate: 15,          // time in ms between refreshes
  status: 'idle',
  sideBarOpen: undefined,
  sideBarHover: false,  // may not use...  DELETE?
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_TABLE_SIZE' : {
      return {
        ...state,
        tableSize: action.tableSize,
      }
    }
    case 'CHANGE_GAME_TYPE' : {
      return {
        ...state,
        gameType: action.gameType,
      }
    }
    case 'CHANGE_REFRESH_RATE' : {
      return {
        ...state,
        refreshRate: action.refreshRate,
      }
    }
    case 'REQUEST_START_GAME' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'START_GAME_SUCCESS' : {
      return {
        ...state,
        gameOn: true,
        gameType: action.gameType,
        status: 'idle',
      }
    }
    case 'START_GAME_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'OPEN_SIDE_BAR' : {
      return {
        ...state,
        sideBarOpen: true,
      }
    }
    case 'CLOSE_SIDE_BAR' : {
      return {
        ...state,
        sideBarOpen: false,
      }
    }
    case 'HOVER_IN_SIDE_BAR' : {
      return {
        ...state,
        sideBarHover: true,
      }
    }
    case 'HOVER_OUT_SIDE_BAR' : {
      return {
        ...state,
        sideBarHover: false,
      }
    }
    case 'SET_GAME_STATUS_FREE_MOVE' : {
      return {
        ...state,
        gameStatus: 'free-move',
      }
    }
    case 'SET_GAME_STATUS_FIRST_SHOT' : {
      return {
        ...state,
        gameStatus: 'first-shot',
      }
    }
    case 'SET_BALL_IN_HAND' : {
      return {
        ...state,
        ballInHand: true,
      }
    }
    case 'SET_BALL_ON_TABLE' : {
      return {
        ...state,
        ballInHand: false,
      }
    }
    case 'SET_GAME_STATUS_IDLE' : {
      return {
        ...state,
        gameStatus: 'idle',
      }
    }
    case 'SET_GAME_STATUS_AWAITING_SHOT' : {
      return {
        ...state,
        gameStatus: 'awaiting-shot',
      }
    }
    case 'SET_SHOT_POWER' : {
      return {
        ...state,
        shotPower: action.shotPower,
      }
    }
    case 'SET_SHOT_ANGLE' : {
      if (state.shotAngle - action.angle < 0) {state.shotAngle += 2*Math.PI}
      else if (state.shotAngle - action.angle > 2*Math.PI) {state.shotAngle -= 2*Math.PI}
      return {
        ...state,
        shotAngle: state.shotAngle - action.angle,
      }
    }
    case 'SET_CUE_STRIKE_LOCATION' : {
      console.log('from inside reducer: x',action.x,'y',action.y);
      let x = Math.floor(100*action.x)/100;
      let y = Math.floor(100*action.y)/100;
      if (x>1) x = 1;
      if (x<0) x = 0;
      if (y>1) y = 1;
      if (y<0) y = 0;
      console.log('from inside reducer, corrected values: x',x,'y',y);
      return {
        ...state,
        cueStrikeLocationX: x,
        cueStrikeLocationY: y,
      }
    }
    default: {
      return state;
    }
  }
}