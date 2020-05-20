import { initialBallLocations } from '../Constants/ballConstants';

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
    default : {
      
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