// -- -- -- -- -- --
// userInfo actions:
// logging in:
export const requestUserInfo = () => ({
  type: 'REQUEST_USER_INFO',
});
export const receiveUserInfo = (userInfo) => ({
  type: 'RECEIVE_USER_INFO',
  userInfo,
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

// purchasing items: 
export const requestPurchaseItem = () => ({
  type: 'REQUEST_PURCHASE_ITEM',
});
export const purchaseItemSuccess = (user) => ({
  type: 'PURCHASE_ITEM_SUCCESS',
  user,
});
export const purchaseItemError = () => ({
  type: 'PURCHASE_ITEM_ERROR',
});

// lobby actions:
// get lobby data:
export const requestAvailableGames = () => ({
  type: 'REQUEST_AVAILABLE_GAMES',
});
export const loadAvailableGamesSuccess = () => ({
  type: 'LOAD_AVAILABLE_GAMES_SUCCESS',
});
export const loadAvailableGamesError = () => ({
  type: 'LOAD_AVAILABLE_GAMES_ERROR',
});
// joining a lobby:
export const requestJoinGame = () => ({
  type: 'REQUEST_JOIN_GAME',
});
export const joinGameSuccess = (newGameInfo) => ({
  type: 'JOIN_GAME_SUCCESS',
  newGameInfo,
});
export const joinGameError = () => ({
  type: 'JOIN_GAME_ERROR',
});
// setting to ready in a lobby:
export const requestSetReady = () => ({
  type: 'REQUEST_SET_READY',
});
export const setReadySuccess = () => ({
  type: 'SET_READY_SUCCESS',
});
export const setReadyError = () => ({
  type: 'SET_READY_ERROR',
});
// setting to not ready in a lobby:
export const requestSetNotReady = () => ({
  type: 'REQUEST_SET_NOT_READY',
});
export const setNotReadySuccess = () => ({
  type: 'SET_NOT_READY_SUCCESS',
});
export const setNotReadyError = () => ({
  type: 'SET_NOT_READY_ERROR',
});
// leaving a lobby
export const requestLeave = () => ({
  type: 'REQUEST_LEAVE',
});
export const leaveSuccess = () => ({
  type: 'LEAVE_SUCCESS',
});
export const leaveError = () => ({
  type: 'LEAVE_ERROR',
});
// creating a lobby
export const requestCreate = () => ({
  type: 'REQUEST_CREATE',
});
export const createSuccess = (newGameInfo) => ({
  type: 'CREATE_SUCCESS',
  newGameInfo,
});
export const createError = () => ({
  type: 'CREATE_ERROR',
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
export const quitGame = () => ({
  type: 'QUIT_GAME',
});
export const removeCurrentGame = () => ({
  type: 'REMOVE_CURRENT_GAME',
});
export const setGameWinnerEightBall = (winner) => ({
  type: 'SET_GAME_WINNER_EIGHT_BALL',
  winner
});
export const setGameWinnerNineBall = () => ({
  type: 'SET_GAME_WINNER_NINE_BALL',
});
export const requestAddGameToHistory = () => ({
  type: 'REQUEST_ADD_GAME_TO_HISTORY',
});
export const addGameToHistorySuccess = (user) => ({
  type: 'ADD_GAME_TO_HISTORY_SUCCESS',
  user,
});
export const addGameToHistoryError = () => ({
  type: 'ADD_GAME_TO_HISTORY_ERROR',
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
export const changeActivePlayer = () => ({
  type: 'CHANGE_ACTIVE_PLAYER',
});
export const setGameStatusAwaitingChoice = () => ({
  type: 'SET_STATUS_AWAITING_CHOICE',
});



// cue ball pick up and release
export const setBallOnTable = () => ({
  type: 'SET_BALL_ON_TABLE',
});
export const setBallInHand = () => ({
  type: 'SET_BALL_IN_HAND',
});
export const freeMoveCueBallWhiteSunk = (x,y) => ({
  type: 'FREE_MOVE_CUE_BALL_WHITE_SUNK',
  x,
  y,
})
export const freeMoveCueBallIllegal = (x,y) => ({
  type: 'FREE_MOVE_CUE_BALL_ILLEGAL',
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
export const setCueStrikeLocation = (x,y) => ({
  type: 'SET_CUE_STRIKE_LOCATION',
  x,
  y,
});
export const addToShotTotal = () => ({
  type: 'ADD_TO_SHOT_TOTAL',
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
export const finalizeBallMotion = () => ({
  type: 'FINALIZE_BALL_MOTION'
});
// below has become obsolete and replace by the above finalize
export const endBallMotion = () => ({
  type: 'END_BALL_MOTION'
})
export const addToBallsSunkNine = (incomingBallsSunk) => ({
  type: 'ADD_TO_BALLS_SUNK_NINE',
  incomingBallsSunk,
})
export const setObjectives = ( player, ballType ) => ({
  type: 'SET_OBJECTIVES',
  player,
  ballType
})
export const addToSunkBalls = ( solids, stripes ) => ({
  type: 'ADD_TO_SUNK_BALLS',
  solids,
  stripes
})
// export const incrementNumberOfShots = () => ({
//   type: 'INCREMENT_NUMBER_OF_SHOTS',
// })
export const returnBallsToTable = (newlySunkBalls) => ({
  type: 'RETURN_BALLS_TO_TABLE',
  newlySunkBalls,
})
export const addSunkBalls = (newlySunkBalls) => ({
  type: 'ADD_SUNK_BALLS',
  newlySunkBalls,
})
