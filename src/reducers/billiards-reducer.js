import { applyPhysics, applyCueStrike } from '../Functions/physics';
import { generateBilliards } from '../Functions/ballGeneration';

const initialState = {
  billiards: [],
  status: 'idle',
};


// each element in the billiards array is an object that contains:
//  id,       cue, or the ball's number
//  inMotion, true if any of the vel/spin values are not zero
//  top,      top location before size ratio is applied
//  left,     left location before size ratio is applied
//  xVel,    cm/s
//  yVel,    cm/s
//  xAngle,  x rotational angle (+ => cw from top down) 
//  yAngle,  y rotational angle (+ => into table off right side of ball from top down)
//  xSpin,   rad/s
//  ySpin,   rad/s
//  collisions, an array, each element is the information of an object that it has collided with
//  sinklocation, null until sinking, the either "T", "B", "TL", etc, to represent which hole
//  sinkingSize, 1 when not sinking.  Once it is sinking number will be less than one and be a multiplier on its size
//  gameSize,   should not be needed
export default function billiardsReducer(state = initialState, action) {
  // console.log('statestatestatestatestatestatestatestate',state);
  // console.log('action.typeaction.typeaction.typeaction.typeaction.type',action.type)
  switch (action.type) {
    case 'ADD_BALLS' : {
      const newBilliardsState = generateBilliards(action.gameType);
      return {
        ...state,
        billiards: [...newBilliardsState],
      }
    }
    case 'REMOVE_BALL' : {
      // const findBall = (element, id) => {element.id === id};
      // let index = state.billiards.findIndex(findBall(action.id));
      state.billiards.forEach((ball, index)=>{
        if (ball.id === action.id) delete state.billiards[index];
      })
      return {
        ...state,
        billiards: [...state.billiards],
      }
    }
    case 'BEGIN_BALL_MOTION' : {
      return {
        ...state,
        status: "in-motion",
      }
    }
    case 'CUE_STRIKE' : {
      let newCueInfo = applyCueStrike(state.billiards[0], action.power, action.angle, action.strikeLocationX || .5, action.strikeLocationY || .5);
      let newState = {...state};
      newState.billiards.shift();
      newState.billiards.unshift(newCueInfo);
      return {
        ...newState,
        status: "just-struck",
      }
    }
    
    case 'UPDATE_BALLS' : {
      console.log('UPDATING BALLS VIA REDUCER AND APPLY PHYSICS')
      // debugger;
      // let initialBilliardsInfo = [...state.billiards];
      let finalBilliardsInfo = applyPhysics([...state.billiards], action.settings, action.elapsedTime);

      // status will either be 'idle' or 'awaiting-direction', base on movement still existing
      return {
        ...state,
        billiards: [...finalBilliardsInfo],
      }
    }
    case 'END_BALL_MOTION' : {
      return {
        ...state,
        status: "idle",
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