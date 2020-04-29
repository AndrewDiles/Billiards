// -- -- -- -- -- --
// userInfo actions:
// logging in:
export const requestUserInfo = () => ({
  type: 'REQUEST_USER_INFO',
});
export const receiveUserInfo = (user) => ({
  type: 'RECEIVE_USER_INFO',
  user,
});
export const receiveUserInfoError = () => ({
  type: 'RECEIVE_USER_INFO_ERROR',
});

// creating new user:
export const requestCreateNewUser = () => ({
  type: 'REQUEST_CREATE_NEW_USER',
});

export const createNewUserSuccess = (user) => ({
  type: 'CREATE_NEW_USER_SUCCESS',
  user,
});
export const createNewUserError = () => ({
  type: 'CREATE_NEW_USER_ERROR',
});

// logging out:
export const logUserOut = () => ({
  type: 'LOG_USER_OUT',
});

// -- -- -- -- -- --
// settings actions:
// changing table size:
export const changeTableSize = (tableSize) => ({
  type: 'CHANGE_TABLE_SIZE',
  tableSize,
});
export const changeGameType = (gameType) => ({
  type: 'CHANGE_GAME_TYPE',
  gameType,
});
// changing refresh rate (for sake of performance):
export const changeRefreshRate = (refreshRate) => ({
  type: 'CHANGE_REFRESH_RATE',
  refreshRate,
})

export const requestStartGame = () => ({
  type: 'REQUEST_START_GAME',
});

// to change with information from server?
export const startGameSuccess = (gameType) => ({
  type: 'START_GAME_SUCCESS',
  gameType,
});
export const startGameError = () => ({
  type: 'START_GAME_ERROR',
});

// to reveal, open and close the sidebar
export const openSideBar = () => ({
  type: 'OPEN_SIDE_BAR',
});
export const closeSideBar = () => ({
  type: 'CLOSE_SIDE_BAR',
});
export const hoverInSideBar = () => ({
  type: 'HOVER_IN_SIDE_BAR',
});
export const hoverOutSideBar = () => ({
  type: 'HOVER_OUT_SIDE_BAR',
});

// to set game status
export const setGameStatusFreeMove = () => ({
  type: 'SET_GAME_STATUS_FREE_MOVE',
});
export const setGameStatusFirstShot = () => ({
  type: 'SET_GAME_STATUS_FIRST_SHOT',
});
export const setGameStatusIdle = () => ({
  type: 'SET_GAME_STATUS_IDLE',
});
export const setGameStatusAwaitingShot = () => ({
  type: 'SET_GAME_STATUS_AWAITING_SHOT',
});
// cue ball pick up and release
export const setBallOnTable = () => ({
  type: 'SET_BALL_ON_TABLE',
});
export const setBallInHand = () => ({
  type: 'SET_BALL_IN_HAND',
});
export const freeMoveCueBall = (x,y) => ({
  type: 'FREE_MOVE_CUE_BALL',
  x,
  y,
})

// shot related values
export const setShotPower = (shotPower) => ({
  type: 'SET_SHOT_POWER',
  shotPower,
});
export const setShotAngle = (angle) => ({
  type: 'SET_SHOT_ANGLE',
  angle,
});

// -- -- -- -- -- --
// billiards actions:
// changing ball counts
export const addBalls = (gameType) => ({
  type: 'ADD_BALLS',
  gameType,
})
export const removeBall = (id) => ({
  type: 'REMOVE_BALL',
  id,
})
export const beginBallMotion = () => ({
  type: 'BEGIN_BALL_MOTION'
})
export const cueStrike = (power, angle, strikeLocationX, strikeLocationY) => ({
  type: 'CUE_STRIKE',
  power,
  angle,
  strikeLocationX,
  strikeLocationY
})
export const updateBalls = (settings) => ({
  settings,
  type: 'UPDATE_BALLS',
})
export const endBallMotion = () => ({
  type: 'END_BALL_MOTION'
})




