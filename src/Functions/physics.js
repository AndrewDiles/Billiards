import React from 'react';
import { useSelector } from "react-redux";
import { tableSizes, holeInfo, actualSizes } from '../Constants/tableSizes';



export const sizeRatios = {
  narrow: 1.5,
  medium: 2.5,
  full: 4,
}
export const energySinks = {
  // ballCollision: 0.3,   not yet used
  cushionCollision: -0.95,
  rotationalFrictionX: .05,
  rotationalFrictionY: .1,
  translationalFriction : .008,
}
// Some incorrect simplifications:
// Ignoring difference between kinetic and static friction
// Will assume a loss of 5% momentum for impacts (heat / sound)
// Will calculate distance travelled at each moment based on currect acceleration rather than integrating

// Things to add later: rotation (x/y axis spin.  Due to friction, x would slow, y would gain forward rotation)

// Intention is to replace meters with pixels
// Force:     F = m·a       |   [N] = [kg · m  / s^2]
// Momentum:  p = m·v       |   [kg · m  / s]
// Distance: Δx = x(init) + v·t + 0.5a·t^2·x

// Cue ball weighs 0.17kg
// other balls weigh 0.16kg

export const pxToNum = (x) => {
  let location = parseFloat(x.substring(0, x.length-2));
  return location
}
export const numToPx = (x) => {
  return (`${x}px`)
}
export const distanceTraveled = (v, a, t) => {
  return (v*t+(0.5*a*t*t))
};
export const newLocation = (x, v, a, t) => {
  // assuming x comes as a string with px after it, and wants px returned to its end:
  let location = pxToNum(x);
  let result = numToPx(location + distanceTraveled(v, a, t));
  return (result)
}
export const getHypotenuse = (op, ad) => {
  let hypotenuseSrq = op*op + ad*ad;
  return Math.sqrt(hypotenuseSrq)
}
export const getMissingTriangleSide = (Hyp, Side, hyp) => {
  return (hyp/Hyp)*Side
}
// let r = tableSizes[settings.tableSize].ballRadius*sizeRatios[settings.tableSize];
export const centerpx = (top, left, r) => {
  // assumes locations are given with px and wants px add to end
  let x = pxToNum(left);
  let y = pxToNum(top);
  // let hypotenous = Math.sqrt((r*r)+(r*r));  this is redundant
  x = numToPx(x + r);
  y = numToPx(y + r);
  return {top: y, left: x}
}
export const center = (top, left, r) => {
  let x = numToPx(left + r);
  let y = numToPx(top + r);
  return {top: y, left: x}
}
export const distanceBetweenTwoCircles = (top1, left1, top2, left2) => {
  let x = left1-left2;
  let y = top1-top2;
  let hypotenuseSrq = x*x + y*y;
  return Math.sqrt(hypotenuseSrq);
}

export const testIfInMotion = (billiardObject) => {
  let motionTest = false;
  if (Math.abs(billiardObject.xVel) > 0 || 
  Math.abs(billiardObject.yVel) > 0 || 
  Math.abs(billiardObject.xSpin) > 0 || 
  Math.abs(billiardObject.ySpin) > 0 ||
  billiardObject.sinkingSize < 1
  ) motionTest = true;
  // let result = {...billiardObject};
  // result.inMotion = motionTest;
  // return result;
  return motionTest
}
const testCushionCollisions = (top, left) => {
  let collision = null;
  collision = testRightCushionCollision(top, left);
  if (collision) return collision
  collision = testLeftCushionCollision(top, left);
  if (collision) return collision
  collision = testTopCushionCollision(top, left);
  if (collision) return collision
  collision = testBottomCushionCollision(top, left);
  return collision
}
const testRightCushionCollision = (top, left) => {
  let collision = null;
  if (left >= 255 
    && top >= 6 && top <= 121.5
    ) collision = "RIGHT_CUSHION";
  return collision
}
const testLeftCushionCollision = (top, left) => {
  let collision = null;
  if (left <= 0 
    && top >= 6 && top <= 121.5
    ) collision = "LEFT_CUSHION";
  return collision
}
const testTopCushionCollision = (top, left) => {
  let collision = null;
  if (top <= 0 
    && ((left >= 5 && left <= 122) || (left >= 132 && left <= 247.5))
    ) collision = "TOP_CUSHION";
  return collision
}
const testBottomCushionCollision = (top, left) => {
  let collision = null;
  if (top >= 127.5 
    && ((left >= 5 && left <= 122) || (left >= 132 && left <= 247.5))
    ) collision = "BOTTOM_CUSHION";
  return collision
}

const testIsSinking = (top, left) => {
  let sinking = null;
  // let ballCenter = center(top, left, actualSizes.ballRadius);
  holeInfo.forEach((hole)=>{
    let key = Object.keys(hole);
    if ( (distanceBetweenTwoCircles(top, left, hole[key[0]][0], hole[key[0]][1])) <  hole[key[0]][2] ) {
      sinking = key[0];
      console.log(`A BALL IS SINKING INTO THE ${key[0]} HOLE!`); 
    }
  })
  return sinking
}
// const resolveCushionCollisions = (ballObject) => {
//   resolveRightCollision(ballObject);
//   resolveLeftCollision(ballObject);
//   resolveTopCollision(ballObject);
//   resolveBottomCollision(ballObject);
// }
// const resolveRightCollision = (ballObject) => {
//   let i = null;
//   ballObject.collisions.forEach((collision, index)=>{
//     if (collision === "RIGHT_CUSHION") {
//       i = index;
//       if (ballObject.xVel > 0) {
//         ballObject.xVel *= -energySinks.cushionCollision;
//       }
//     }
//   })
//   if (i !== null) ballObject.collisions.splice(i,1);
// }
// const resolveLeftCollision = (ballObject) => {
//   let i = null;
//   ballObject.collisions.forEach((collision, index)=>{
//     if (collision === "LEFT_CUSHION") {
//       i = index;
//       if (ballObject.xVel < 0) {
//         ballObject.xVel *= -energySinks.cushionCollision;
//       }
//     }
//   })
//   if (i !== null) ballObject.collisions.splice(i,1);
// }
// const resolveTopCollision = (ballObject) => {
//   let i = null;
//   ballObject.collisions.forEach((collision, index)=>{
//     if (collision === "TOP_CUSHION") {
//       i = index;
//       if (ballObject.yVel > 0) {
//         ballObject.yVel *= -energySinks.cushionCollision;
//       }
//     }
//   })
//   if (i !== null) ballObject.collisions.splice(i,1);
// }
// const resolveBottomCollision = (ballObject) => {
//   let i = null;
//   ballObject.collisions.forEach((collision, index)=>{
//     if (collision === "BOTTOM_CUSHION") {
//       i = index;
//       if (ballObject.yVel < 0) {
//         ballObject.yVel *= -energySinks.cushionCollision;
//       }
//     }
//   })
//   if (i !== null) ballObject.collisions.splice(i,1);
// }
const resolveCushionCollision = (collision, xVel, testXVel, yVel, testYVel, left, testLeft, top, testTop ) => {
  if (collision === "TOP_CUSHION" ) {
    top = 0.01;
    xVel = testXVel;
    left = testLeft;
    if (yVel < 0) yVel = energySinks.cushionCollision * testYVel;
    return {top, left, xVel, yVel}; 
  }
  else if (collision === "BOTTOM_CUSHION"){
    console.log('BOTTOM CUSHION HIT DETECTED');
    top = 127.49;
    xVel = testXVel;
    left = testLeft;
    if (yVel > 0) yVel = energySinks.cushionCollision * testYVel;
    return {top, left, xVel, yVel}; 
  }
  else if (collision === "LEFT_CUSHION"){
    left = 0.01;
    yVel = testYVel;
    top = testTop;
    if (xVel < 0) xVel = energySinks.cushionCollision * testXVel;
    return {top, left, xVel, yVel}; 
  }
  else {
    left = 254.99;
    yVel = testYVel;
    top = testTop;
    if (xVel > 0) xVel = energySinks.cushionCollision * testXVel;
    return {top, left, xVel, yVel}; 
  }
}
// this funciton will need to move all balls, change their location, test for collisions
export const applyPhysics = (billiardsObject, settings) => {
  
  // handle current collisions
  // let newBilliardsArray = [...billiardsArray];
  return billiardsObject.map((elem) => {
    if (elem.id === 'cue') {console.log("cue ball's xVel is:",elem.xVel)}
    let element = {...elem};
    if (element.collisions.length === 0 && !element.inMotion) return element
    if (element.collisions.length != 0) {
      // resolve new change in energy

      // console.log('pre-resolution:',element.collisions);
      // resolveCushionCollisions(element);
      // console.log('post-resolution:',element.collisions);
    }
    
    for(let n = 1; n <= 10; n++) {
      if (element.xVel === 0 && element.yVel === 0) {n +=10; console.log('no movement, bailing');}
      else {
        let vi = getHypotenuse(element.xVel,element.yVel)/10; //one tenth the velocity to travel in one tenth the time
        // console.log('V initial over 10', vi);
        
        let vf = 0;
        if (vi > energySinks.translationalFriction) vf = vi - energySinks.translationalFriction;  // reduces velocity due to friction
        // console.log('V final over 10', vf);
        let testXVel = getMissingTriangleSide(vi, element.xVel, vf);
        let testYVel = getMissingTriangleSide(vi, element.yVel, vf);
        console.log('testYVeltestYVeltestYVeltestYVeltestYVeltestYVel',testYVel)
        console.log('testXVeltestXVeltestXVeltestXVeltestXVeltestXVel',testXVel)
        let testLeft = element.left + ( testXVel * (settings.refreshRate/100) );
        let testTop = element.top + ( testYVel * (settings.refreshRate/100) );
        let collision = testCushionCollisions(testTop, testLeft);
        console.log('collisioncollisioncollisioncollision',collision);
        if (!collision) {
          element.xVel = testXVel;
          element.yVel = testYVel;
          element.left = testLeft;
          element.top = testTop;
          console.log('New x,y Vels:', testXVel, testYVel);
        }
        else {
          let cushionCollisionReturn = resolveCushionCollision(
            collision, 
            element.xVel, 
            testXVel, 
            element.yVel, 
            testYVel, 
            element.left, 
            testLeft, 
            element.top, 
            testTop
          )
          element.top = cushionCollisionReturn.top;
          element.left = cushionCollisionReturn.left;
          element.xVel = cushionCollisionReturn.xVel;
          element.yVel = cushionCollisionReturn.yVel;
        }
      }
    }
    // element.left += (settings.refreshRate/100) * element.xVel;
    // element.top -= (settings.refreshRate/100) * element.yVel;

    // let v = getHypotenuse(element.xVel,element.yVel);
    // if (v > energySinks.translationalFriction) v -= energySinks.translationalFriction;  // needs to be dfifferent based on positivity
    // else v = 0;
    // element.xVel = getMissingTriangleSide(v+energySinks.translationalFriction, element.xVel, v);
    // // debugger;
    // element.yVel = getMissingTriangleSide(v+energySinks.translationalFriction, element.yVel, v);
    element.xAngle += (settings.refreshRate/100) * element.xSpin;
    element.yAngle += (settings.refreshRate/100) * element.ySpin;
    if (Math.abs(element.xSpin) <= energySinks.rotationalFrictionX) element.xSpin = 0;
    else {
      if (element.xSpin > 0) element.xSpin -= energySinks.rotationalFrictionX;
      else element.xSpin += energySinks.rotationalFrictionX;
    }
    if (Math.abs(element.ySpin) <= energySinks.rotationalFrictionY) element.ySpin = 0;
    else {
      if (element.ySpin > 0) element.ySpin -= energySinks.rotationalFrictionY;
      else element.ySpin += energySinks.rotationalFrictionY;
    }
    if (!element.isSinking) {

      // element.isSinking = testIsSinking(element.top, element.left);  // numbers need correction


      // if (!element.isSinking) {
      //   let test = testRightCushionCollision(element.top, element.left)
      //   if (!test) test = testLeftCushionCollision(element.top, element.left)
      //   if (!test) test = testTopCushionCollision(element.top, element.left)
      //   if (!test) test = testBottomCushionCollision(element.top, element.left)
      //   if (test) element.collisions = [test]
      // }
    }
    if (!element.isSinking) element.inMotion = testIfInMotion(element);
    else element.sinkingSize -= 0.001;  //calibrate to make it look good.
    return element
    // test collisions (has no affect if not in motion)
  })
  // return newBilliardsArray
}

export const applyCueStrike = (initialCueBallInfo, power, angle, strikeLocationX, strikeLocationY) => {
  let finalCueBallInfo = {...initialCueBallInfo};
  finalCueBallInfo.xVel = power * Math.cos(angle);
  finalCueBallInfo.yVel = power * Math.sin(angle);
  finalCueBallInfo.xSpin = power * Math.cos(Math.Pi*strikeLocationX);
  finalCueBallInfo.ySpin = power * Math.cos(Math.Pi*strikeLocationY);
  finalCueBallInfo.inMotion = true;
  // ignore top and under spin for now (strikeLocationY)
  return finalCueBallInfo
}

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
//  sinklocation, "none" until sinking, the either "T", "B", "TL", etc, to represent which hole
//  sinkingSize, 1 when not sinking.  Once it is sinking number will be less than one and be a multiplier on its size
//  gameSize,   should not be needed