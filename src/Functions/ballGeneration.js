import { ballColors, initialBallLocations} from '../Constants/ballConstants';

export const generateBilliards = (gameType) => {
  let billiardsToGenerate = [];
  switch (gameType) {
    case 'test' : {
      billiardsToGenerate = ["cue", 1];
      break;
    }
    case 'eight' : {
      billiardsToGenerate = ["cue"];
      for (let i = 1; i < 16; i++){
        billiardsToGenerate.push(i);
      }
      break;
    }
    case 'nine' : {
      billiardsToGenerate = ["cue"];
      for (let i = 1; i < 10; i++){
        billiardsToGenerate.push(i);
      }
      break;
    }
  }
  let billiardsGenerationReturn = [];
  billiardsToGenerate.forEach((billiard)=>{
    let toBeAdded = {
      id: billiard,
      inMotion: false,
      top: initialBallLocations[gameType][billiard].top,
      left: initialBallLocations[gameType][billiard].left,
      xVel: 0,
      yVel: 0,
      xAngle: (2*Math.PI*Math.random()),
      yAngle: (2*Math.PI*Math.random()),
      xSpin: 0,
      ySpin: 0,
      collisions: [],
      sinklocation: null,
      sinkingSize: 1,
    };
    billiardsGenerationReturn.push(toBeAdded);
  })
  return billiardsGenerationReturn;
}

//  id,       cue, or the ball's number
//  inMotion, true if any of the vel/spin values are not zero
//  top,      top location before size ratio is applied
//  left,     left location before size ratio is applied
//  x-vel,    cm/s
//  y-vel,    cm/s
//  x-angle,  x rotational angle (+ => cw from top down) 
//  y-angle,  y rotational angle (+ => into table off right side of ball from top down)
//  x-spin,   degree/s
//  y-spin,   degree/s
//  collisions, an array, each element is the information of an object that it has collided with
//  sinklocation, "none" until sinking, the either "T", "B", "TL", etc, to represent which hole
//  sinkingSize, 1 when not sinking.  Once it is sinking number will be less than one and be a multiplier on its size
//  gameSize,   should not be needed