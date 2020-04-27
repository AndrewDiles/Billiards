const initialState = {
  gameOn: false,
  gameType: null,
  tableSize: 'full',
  refreshRate: 15, // time in ms between refreshes
  status: 'idle',
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
    default: {
      return state;
    }
  }
}