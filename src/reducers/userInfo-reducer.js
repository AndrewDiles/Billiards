const initialState = {
  user: null,
  status: 'idle',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_INFO' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'RECEIVE_USER_INFO' : {
      return {
        user: action.user,
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