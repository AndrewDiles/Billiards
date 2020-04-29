const initialState = {
  gameOn: false,
  gameType: null,
  gameStatus: 'idle',
  ballInHand: false,
  shotPower: 1,
  shotAngle: 0,
  tableSize: 'full',
  refreshRate: 15, // time in ms between refreshes
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
      else if (state.shotAngle - action.angle > 2*Math.PI) {{state.shotAngle -= 2*Math.PI}}
      return {
        ...state,
        shotAngle: state.shotAngle - action.angle,
      }
    }
    default: {
      return state;
    }
  }
}