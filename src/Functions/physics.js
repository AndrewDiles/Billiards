import { holeInfo, holeAngleInfo } from '../Constants/tableSizes';

export const sizeRatios = {
  narrow: 1.5,
  medium: 2.5,
  full: 4,
}
export const energySinks = {
  ballCollision: 0.975,
  cushionCollision: -0.95,
  rotationalFrictionX: .05,
  rotationalFrictionY: .1,
  translationalFriction : .04,
}
// Some incorrect simplifications:
// Ignoring difference between kinetic and static friction
// Will assume a loss of 5% momentum for impacts (heat / sound) with cushion
// Will assume collisions with other balls are elastic

// Things to add later: rotation (x/y axis spin.  Due to friction, x would slow, y would gain forward rotation)

// Intention is to replace meters with pixels
// Force:     F = m·a       |   [N] = [kg · m  / s^2]
// Momentum:  p = m·v       |   [kg · m  / s]
// Distance: Δx = x(init) + v·t + 0.5a·t^2·x

// Cue ball weighs 0.17kg
// other balls weigh 0.16kg
// ignoring this difference for simplicity sake

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
export const angleBetweenTwoBalls = (top1, left1, top2, left2) => {
  if (top1 >=top2) {
    return (Math.atan((left1-left2)/(top2-top1)))
  }
  else {
    return (Math.atan((left2-left1)/(top1-top2)))
  }
}
export const distanceBetweenTwoPoints = (top1, left1, top2, left2) => {
  let x = left1-left2;
  let y = top1-top2;
  let hypotenuseSrq = x*x + y*y;
  return Math.sqrt(hypotenuseSrq);
}
export const applyFrictionToVelocity = (vi) => {
  let vf = 0;
  // tests if velocity will not hit 0 due to friction
  if (vi > 0.004*energySinks.translationalFriction) { 
    // reduces velocity due to friction fractionally based on speed
    if (vi >30 ) vf = vi - energySinks.translationalFriction;
    else if (vi >20 ) vf = vi - 0.9*energySinks.translationalFriction;
    else if (vi >10 ) vf = vi - 0.6*energySinks.translationalFriction;
    else if (vi >5 ) vf = vi - 0.3*energySinks.translationalFriction;
    else if (vi >3 ) vf = vi - 0.15*energySinks.translationalFriction;
    else if (vi >1 ) vf = vi - 0.085*energySinks.translationalFriction;
    else if (vi >.5 ) vf = vi - 0.042*energySinks.translationalFriction;
    else if (vi >.25 ) vf = vi - 0.016*energySinks.translationalFriction;
    else if (vi >.1 ) vf = vi - 0.004*energySinks.translationalFriction;
  }
  // in the event that the friction brings the initial Velocity to 0, V final was already set to 0
  return vf
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
// const testHoleCollisions = (top, left) => {
//   let collision = null;
  
// }
// This function serves as a fall back in case a ball goes out of bounds
const testOutOfBounds = (top, left) => {
  let sinking = null;
  if (top < -10 || top > 140 || left < -10 || left > 265) sinking = true;
  return sinking;
}
// const testFarOutOfBounds = (top, left) => {
//   let sinking = null;
//   if (top < -11 || top > 141 || left < -11 || left > 266) sinking = true;
//   return sinking;
// }
const testIsSinking = (top, left) => {
  let sinking = null;
  // let ballCenter = center(top, left, actualSizes.ballRadius);
  holeInfo.forEach((hole)=>{
    let key = Object.keys(hole);
    
    if ( (distanceBetweenTwoPoints(top, left, hole[key[0]][0], hole[key[0]][1])) <  hole[key[0]][2] ) {
      sinking = key[0];
      // console.log(`A BALL IS SINKING INTO THE ${key[0]} HOLE!  Distance is/was ${distanceBetweenTwoPoints(top, left, hole[key[0]][0], hole[key[0]][1])} needs to be less than ${hole[key[0]][2]}`); 
    }
  })
  // fall back test in case ball is out of bounds  --  Removing and implementing corner collision
  if (!sinking) {
    sinking = testOutOfBounds(top, left);
  }
  // if (!sinking) {
  //   sinking = testFarOutOfBounds(top, left);
  // }
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
    // console.log('BOTTOM CUSHION HIT DETECTED');
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
export const testBallCollisions = (testTop, testLeft, allBilliards, testBilliard) => {
  let result = [];
  // let r = tableSizes[settings.tableSize].ballRadius;
  let r = 4.2;
  allBilliards.forEach((billiard)=>{
    if (billiard.id !== testBilliard.id && !billiard.sinkinglocation) {
      // console.log('distance between:',distanceBetweenTwoPoints(testTop,testLeft, billiard.top, billiard.left))
      // console.log('2r req: ', 2*r)
      if(distanceBetweenTwoPoints(testTop,testLeft, billiard.top, billiard.left) < 2*r) {
        result.push(billiard.id)
      }
    }
  })
  return result;
}
export const testSingleBallCollision = (ball1, ball2, radius) => {
  let result = false;
  let r = radius;
  
    if (ball1.id !== ball2.id && !ball2.sinkinglocation && !ball1.sinkinglocation) {
      let distance = distanceBetweenTwoPoints(ball1.top,ball1.left, ball2.top, ball2.left); 
      // console.log('distance between objects in question is:', distance, '. For contact, needs to be below', 2*r );
      // console.log('object1 and its left/top positions are: ',ball1.id, ball1.left,ball1.top);
      // console.log('object2 and its left/top positions are: ',ball2.id, ball2.left,ball2.top);
      if(distance < 2*r) {
        result = true;
      }
    }
  return result;
}

export const testCornerCollisions = (testTop, testLeft, initTop, initLeft) => {
  let holes = ['TL','TR','BL','BR','T','B'];
  let sides = ['left1','left2','right1','right2'];
  let result = null;

  holes.forEach((hole)=>{
    sides.forEach((side)=>
    {
      // console.log(`distance between edge of ball and ${hole}'s ${side} corner is`,distanceBetweenTwoPoints( testTop+holeAngleInfo[hole][side].testTop, testLeft+holeAngleInfo[hole][side].testLeft, holeAngleInfo[hole][side].top, holeAngleInfo[hole][side].left) );
      // verify if the distance between the corner and the ball is adequately small for it to count as an impact
      let upcomingDistance = distanceBetweenTwoPoints( testTop+holeAngleInfo[hole][side].testTop, testLeft+holeAngleInfo[hole][side].testLeft, holeAngleInfo[hole][side].top, holeAngleInfo[hole][side].left);
      let previousDistance = distanceBetweenTwoPoints( initTop+holeAngleInfo[hole][side].testTop, initLeft+holeAngleInfo[hole][side].testLeft, holeAngleInfo[hole][side].top, holeAngleInfo[hole][side].left)
      
      // this size should be experimented with, somewhat arbitrary allowance for error
      // verify ball is not just near corner but is also moving toward it
      if ( upcomingDistance < 1){
        // console.log('close to a corner');
        // console.log('upcomingDistance',upcomingDistance,'previousDistance',previousDistance);

        if (upcomingDistance < previousDistance) { 
          // below is original attempt, but it made bad presumptions about movement directions
          // let rightDirection = false;
          // switch (holeAngleInfo[hole][side].impactOn) {
          //   case 'TL' : {
          //     if (testXVel <0 && testYVel <0) rightDirection = true;
          //     console.log('rightDirection is ',rightDirection, ' for ',holeAngleInfo[hole][side].impactOn)
          //   }
          //   case 'TR' : {
          //     if (testXVel >0 && testYVel <0) rightDirection = true;
          //     console.log('rightDirection is ',rightDirection, ' for ',holeAngleInfo[hole][side].impactOn)
          //   }
          //   case 'BL' : {
          //     if (testXVel <0 && testYVel >0) rightDirection = true;
          //     console.log('rightDirection is ',rightDirection, ' for ',holeAngleInfo[hole][side].impactOn)
          //   }
          //   case 'BR' : {
          //     if (testXVel >0 && testYVel >0) rightDirection = true;
          //     console.log('rightDirection is ',rightDirection, ' for ',holeAngleInfo[hole][side].impactOn)
          //   }
          // }
          // if (rightDirection) {
          result = {hole: hole, side: side, impactOn: holeAngleInfo[hole][side].impactOn};
          // console.log('corner impact on', result)
        }
      }
    })
  })
  return result
}

// this funciton moves, spins, sinks, rotates the balls and tests them for collisions
export const applyPhysics = (billiardsObject, settings) => {
  
  // handle current collisions
  
  // Retrieving or creating a container for past collisions to insure balls have a chance to get outside eachother
  let pastCollisions = billiardsObject[0].pastCollisions || [];

  // mapping out returns from all billiards
  return billiardsObject.map((elem) => {
    
    // spreading contents to insure different references
    let element = {...elem};

    // if no collisions and ball is not in motion, then there is nothing to be done
    if (element.collisions.length === 0 && !element.inMotion) return element

    // ensures that a ball will not be reconsidered if it has sunk.
    if (element.sinkingSize <= 0) {
      element.inMotion = false;
    }

    // console.log('element.collisions for', element.id, ' : ' ,element.collisions)

    // if there is a pending collision it must be resolved immediately (this may occur at the time of the collision)
    if (element.collisions.length !== 0 && !element.sinkinglocation && element.sinkingSize > 0) {
      // resolve new change in energy  -- this may occur at time of impact
      element.collisions.forEach((collision)=> {
        element.xVel += collision[0];
        element.yVel += collision[1];
        let impact = {"ballImpacted" : element.id, "ballImpacting" : collision[2]}
        pastCollisions.push(impact);
        // console.log('pastCollisions',pastCollisions);
      })
      // console.log('pre-resolution:',element.collisions);
      // console.log('post-resolution:',element.collisions);
      element.collisions = [];
      element.inMotion = true;
      // resolveCushionCollisions(element);
    }
    
    // console.log(`Moving the ${element.id} ball`)

    // will do the changes that occur in one refreshRate's worth of time in 10 increments
    for(let n = 1; n <= 10; n++) {

      // if, during the 10 increments, the ball is no longer moving, exit this loop (will skip over end spinning)
      if (element.xVel === 0 && element.yVel === 0) n +=10;

      // below case is true if the ball is sinking
      else if (element.sinkingSize < 1) {
        // failed attempts:// bellow makes it look like sinking into BR quadrant of hole// element.top -= 0.9995*(element.top-holeInfoObject[element.sinklocation][0]- 0.5*holeInfoObject[element.sinklocation][2]);// element.left -= 0.9995*(element.left-holeInfoObject[element.sinklocation][1]- 0.5*holeInfoObject[element.sinklocation][2]);// sinks into top center// element.top -= 0.9995*(element.top-holeInfoObject[element.sinklocation][0]- 0.05*holeInfoObject[element.sinklocation][2]);// element.left -= 0.9995*(element.left-holeInfoObject[element.sinklocation][1]- 0.05*holeInfoObject[element.sinklocation][2]);// element.top -= 0.999999999*(element.top-holeInfoObject[element.sinklocation][0]- 0.5*holeInfoObject[element.sinklocation][2]);// element.left -= 0.999999999*(element.left-holeInfoObject[element.sinklocation][1]- 0*holeInfoObject[element.sinklocation][2]);// element.top -= 0.999999999*(element.top-holeInfoObject[element.sinklocation][0]);// element.left -= 0.999999999*(element.left-holeInfoObject[element.sinklocation][1]);// just TR of center// element.top -= 0.9995*(element.top-holeInfoObject[element.sinklocation][0]- 0.25*holeInfoObject[element.sinklocation][2]);// element.left -= 0.9995*(element.left-holeInfoObject[element.sinklocation][1]- 0.25*holeInfoObject[element.sinklocation][2]);// sinks into TL:// element.top -= 0.9995*(element.top-holeInfoObject[element.sinklocation][0]+ 0.5*holeInfoObject[element.sinklocation][2]);// element.left -= 0.9995*(element.left-holeInfoObject[element.sinklocation][1]+ 0.5*holeInfoObject[element.sinklocation][2]);// sinks in TR quad// element.top -= 0.9995*(element.top-holeInfoObject[element.sinklocation][0]+ 0.5*holeInfoObject[element.sinklocation][2]);// element.left -= 0.9995*(element.left-holeInfoObject[element.sinklocation][1]- 0.5*holeInfoObject[element.sinklocation][2]);
        
        // below switch moves the ball based on the hole it is sinking into
        switch (element.sinklocation) {
          case 'TL' : {
            element.top -=0.035;
            element.left -=0.035;
            break;
          }
          case 'T' : {
            element.top -=0.035;
            break;
          }
          case 'TR' : {
            element.top -=0.035;
            element.left +=0.035;
            break;
          }
          case 'BL' : {
            element.top +=0.035;
            element.left -=0.035;
            break;
          }
          case 'B' : {
            element.top +=0.035;
            break;
          }
          case 'BR' : {
            element.top +=0.035;
            element.left +=0.035;
            break;
          }
          default : {}
        }
      }
      
      // below else includes case where ball is not sinking and has movement
      else {
        // One tenth the velocity to travel in one tenth the time.
        // Friction will be applied to velocity instead of calculating proportion of it to apply to each Vx and Vy
        let vi = getHypotenuse(element.xVel,element.yVel)/10; 
        let vf = applyFrictionToVelocity(vi)
      
        // similar triangles is an easy way to find the new x,y velocities
        let testXVel = getMissingTriangleSide(vi, element.xVel, vf);
        let testYVel = getMissingTriangleSide(vi, element.yVel, vf);

        // finding the new location of the ball if it were to move based on the found velocities
        let testLeft = element.left + ( testXVel * (settings.refreshRate/100) );
        let testTop = element.top + ( testYVel * (settings.refreshRate/100) );
        let sinkingTest = null;

        // Saving some processing power by testing if the ball is near any holes
        let inRangeOfHoles = !((testTop > 11.3 && testTop < 121.8) || (testLeft > 6.8 && testLeft <120) || (testLeft > 135 && testLeft < 248));

        // scoping cornerCollision test
        let cornerCollision = null;

        // case near a hole: verify if it is sinking
        if (inRangeOfHoles) {
          sinkingTest = testIsSinking(testTop, testLeft);
          element.sinklocation = sinkingTest;

          // if the ball is sinking, get out of the loop
          if (sinkingTest) n+= 10;

          // if the ball is not sinking see if it hits a corner
          else {

            // -------  corner collisions not working as well as I had hoped.....  -------
            cornerCollision = testCornerCollisions(testTop, testLeft, element.top, element.left);

            // if it did hit a corner, then set its new location and velocity accordingly
            if (cornerCollision) {
              // console.log('impact on',holeAngleInfo[cornerCollision.hole][cornerCollision.side].impactOn)
              element.top = holeAngleInfo[cornerCollision.hole][cornerCollision.side].top - holeAngleInfo[cornerCollision.hole][cornerCollision.side].testTop;
              element.left = holeAngleInfo[cornerCollision.hole][cornerCollision.side].left - holeAngleInfo[cornerCollision.hole][cornerCollision.side].testLeft;

              let VxHolder = testXVel;
              let VyHolder = testYVel;
              if(holeAngleInfo[cornerCollision.hole][cornerCollision.side].impactOn === 'TL') {
                element.xVel = VyHolder*energySinks.cushionCollision;
                element.yVel = -1*VxHolder*energySinks.cushionCollision;
                element.top +=0.05;
                element.left +=0.05;
              }
              else if(holeAngleInfo[cornerCollision.hole][cornerCollision.side].impactOn === 'TR') {
                element.xVel = -1*VyHolder*energySinks.cushionCollision;
                element.yVel = -1*VxHolder*energySinks.cushionCollision;
                element.top +=0.05;
                element.left -=0.05;
              }
              else if(holeAngleInfo[cornerCollision.hole][cornerCollision.side].impactOn === 'BR') {
                element.xVel = VyHolder*energySinks.cushionCollision;
                element.yVel = VxHolder*energySinks.cushionCollision;
                element.top -=0.05;
                element.left -=0.05;
              }
              else if(holeAngleInfo[cornerCollision.hole][cornerCollision.side].impactOn === 'BL') {
                // if (VyHolder>0) {
                //   element.xVel = -1*VyHolder*energySinks.cushionCollision;
                //   element.yVel = VxHolder*energySinks.cushionCollision;
                //   element.top -=0.05;
                //   element.left +=0.05;
                // }
                // else {
                //   element.xVel = -1*VyHolder*energySinks.cushionCollision;
                //   element.yVel = VxHolder*energySinks.cushionCollision;
                //   element.top -=0.1;
                //   element.left +=0.1;
                // }
                  element.xVel = -1*VyHolder*energySinks.cushionCollision;
                  element.yVel = VxHolder*energySinks.cushionCollision;
                  element.top -=0.05;
                  element.left +=0.05;
              }
            }
          }
        }
        // allow for hitting of non-corner cushion and other balls once no corner collision detected
        if (!cornerCollision) { 
          // tests for collisions with walls
          let collision = testCushionCollisions(testTop, testLeft);

          // if no collision with wall then test for collisions with balls
          if (!collision) {
            let ballCollisions = testBallCollisions(testTop, testLeft, billiardsObject, element);
            // console.log(`ball ${element.id}'s collision array: ${collision}`);
            // Sets the first impact of the shot
            if (ballCollisions.length > 0 && element.id === "cue" && element.firstCollision === null) {
              element.firstCollision = ballCollisions[0];
            }

            // if (ballCollisions[0]) {
            // console.log(`Ball${element.id} hit ${ballCollisions[0]}`) // -------------------- TEST
            // }

            // This loop removes any detected collisions that occured within the time interval of the refresh rate.
            ballCollisions.forEach((collision, index)=>{
              let alreadyRecordedThisImpact = false;
              // console.log(pastCollisions)
                pastCollisions.forEach((pastCollision)=>{
                  // console.log('pastCollision.ballImpacted',pastCollision.ballImpacted);
                  if (collision===pastCollision.ballImpacting) {
                    alreadyRecordedThisImpact = true;
                    // console.log(`The ${collision} ball has already hit the ${pastCollision.ballImpacted} ball.`);
                  }
                })
              if (alreadyRecordedThisImpact) ballCollisions.splice(index,1);
            })

            if (ballCollisions.length === 0) {
              element.xVel = testXVel;
              element.yVel = testYVel;
              element.left = testLeft;
              element.top = testTop;
              // console.log('New x,y Vels:', testXVel, testYVel);
            }
            else {
              // MODIFY THIS SO IT IGNORES BALLS THAT HAVE A BANKED COLLISION WITH THEM
              // console.log(element.id, 'ball made contact with', ballCollisions);
              let impactedBall = billiardsObject.find(ball => ball.id === ballCollisions[0]);
              let thisBallAlreadyHit = false;
              impactedBall.collisions.forEach((collision)=>{
                if (collision[2]=== element.id) thisBallAlreadyHit = true;
              })
              if (thisBallAlreadyHit) {
                // console.log("Hit already being taken care of");
                element.xVel = testXVel;
                element.yVel = testYVel;
                element.left = testLeft;
                element.top = testTop;
              }
              else {
              // resolve affects of collision on this ball
              // case one collision
              // if (ballCollisions.length === 1) {

                // console.log(`${element.id} ball only hit one other ball: the ${ballCollisions[0]} ball.`)
                // let topAv = (element.top + testTop)/2;
                // let leftAv = (element.left + testLeft)/2;
                // testing if collisions work better by using initial ball location.
                let topAv = element.top;
                let leftAv = element.left;

                // let impactedBall = billiardsObject.find(ball => ball.id === ballCollisions[0]);
                // console.log('the ball the current ball being tested`s data is:',impactedBall);
                let theta = angleBetweenTwoBalls(topAv, leftAv, impactedBall.top, impactedBall.left);
                console.log('theta is:',theta);
                let Vib2 = getHypotenuse(impactedBall.xVel, impactedBall.yVel);
                let Vib1 = getHypotenuse(testXVel, testYVel);
                // let Vfb1x = Vib2*Math.sin(theta) - Vib1*Math.sin(theta);
                // let Vfb1y = Vib2*Math.cos(theta) - Vib1*Math.cos(theta);
                let Vfb1x = -Vib2*Math.sin(theta) + Vib1*Math.sin(theta);
                let Vfb1y = -Vib2*Math.cos(theta) + Vib1*Math.cos(theta);
                Vfb1x > 0 ? Vfb1x > 0.001 ? Vfb1x -= 0.001 : Vfb1x = 0 : Vfb1x < -0.001 ? Vfb1x += 0.001 : Vfb1x = 0;
                Vfb1y > 0 ? Vfb1y > 0.001 ? Vfb1y -= 0.001 : Vfb1y = 0 : Vfb1y < -0.001 ? Vfb1y += 0.001 : Vfb1y = 0;
                let Vfb2x = -Vib1*Math.sin(theta) + Vib2*Math.sin(theta);
                let Vfb2y = -Vib1*Math.cos(theta) + Vib2*Math.cos(theta);
                Vfb2x > 0 ? Vfb2x > 0.001 ? Vfb2x -= 0.001 : Vfb2x = 0 : Vfb2x < -0.001 ? Vfb2x += 0.001 : Vfb2x = 0;
                Vfb2y > 0 ? Vfb2y > 0.001 ? Vfb2y -= 0.001 : Vfb2y = 0 : Vfb2y < -0.001 ? Vfb2y += 0.001 : Vfb2y = 0;
                if (theta < -0.785398) {
                  if (topAv < impactedBall.top && leftAv < impactedBall.left) {
                    // Vfb1x *= -1;
                    Vfb1y *= -1;
                    Vfb2y *= -1;
                  }
                  else {
                    Vfb1x *= -1;
                    Vfb2x *= -1;
                  }
                }
                else if (theta < 0) {
                  // Vfb2x *= -1;
                }
                else if (theta < 0.785398) {
                  Vfb2x *= -1;
                  // Vfb1x *= -1;
                }
                else {
                  if (topAv < impactedBall.top && leftAv > impactedBall.left) {
                    Vfb1y *= -1;
                    Vfb2y *= -1;
                  }
                  else {
                  Vfb1x *= -1;
                  Vfb1y *= -1;
                  Vfb2y *= -1;
                  }
                }
                element.xVel = Vfb1x;
                element.yVel = Vfb1y;
                impactedBall.inMotion = true;
                // console.log('impactedBall',impactedBall);
                impactedBall.collisions.push([Vfb2x,Vfb2y, element.id]);
                let approxXPos = (leftAv/2) + (leftAv + Vfb1x* (settings.refreshRate/100))/2;
                let approxYPos = (topAv/2) + (topAv + Vfb1y* (settings.refreshRate/100))/2;

                element.left = approxXPos;
                element.top = approxYPos;
                
                // let Vfb2x = Vib1*Math.sin(theta) - Vib2*Math.sin(theta);
                // let Vfb2y = Vib1*Math.cos(theta) - Vib2*Math.cos(theta);
                
                // below is definately wrong
                // impactedBall.xVel = Vfb2x;
                // impactedBall.xVel = Vfb2y;
                // impactedBall.inMotion = testIfInMotion(impactedBall);
                // trying an alternative
                
              // }
              // else {
              //   console.log(`${element.id} ball hit more than one other ball: ${ballCollisions} balls.`)
              // }
              }
            }
          }
          // case: hit a wall, change direction and location accordingly
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
          }//end case hit a wall
        }//end case did not hit corner
      }//end case ball not sinking but has velocity
    }//ends incremental testing
  
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
    // if (!element.sinklocation) {
      // element.sinklocation = testIsSinking(element.top, element.left);  // numbers need correction
      // if (!element.sinklocation) {
      //   let test = testRightCushionCollision(element.top, element.left)
      //   if (!test) test = testLeftCushionCollision(element.top, element.left)
      //   if (!test) test = testTopCushionCollision(element.top, element.left)
      //   if (!test) test = testBottomCushionCollision(element.top, element.left)
      //   if (test) element.collisions = [test]
      // }
    // }
    if (!element.sinklocation) element.inMotion = testIfInMotion(element);
    else if (element.sinkingSize !== 0) {
      if (element.sinkingSize >.75) element.sinkingSize -= .02;
      else if (element.sinkingSize > 0.5) element.sinkingSize -= .04;
      else if (element.sinkingSize > 0.25) element.sinkingSize -= .1;
      else if (element.sinkingSize > 0.1) element.sinkingSize -= .2;
      else if (element.sinkingSize > 0) element.sinkingSize -= .4;
      else {element.sinkingSize = 0; element.inMotion = false};
      // console.log('current size of the sinking ball:' , element.sinkingSize);
    }

    // Final fail safe to make sure ball is not out of bounds
    if (!element.sinkinglocation && element.sinkingSize === 1) {
      let sinking = testOutOfBounds(element.top, element.left);
      if (sinking) {
        element.sinkingSize = 0.99;
        element.sinkinglocation = "TL";
      }
    }
    
    // storing pastCollisions for next update
    billiardsObject[0].pastCollisions = pastCollisions;
    return element
    // test collisions (has no affect if not in motion)
  })

  // return newBilliardsArray
  // return billiardsObject
}

export const applyCueStrike = (initialCueBallInfo, power, angle, strikeLocationX, strikeLocationY) => {
  // console.log(angle,'angle')
  let finalCueBallInfo = {...initialCueBallInfo};
  finalCueBallInfo.xVel = power * Math.cos(angle);
  finalCueBallInfo.yVel = power * Math.sin(angle);
  finalCueBallInfo.xSpin = power * Math.cos(Math.PI*strikeLocationX)/2;
  // console.log('finalCueBallInfo.xSpinfinalCueBallInfo.xSpin',finalCueBallInfo.xSpin)
  finalCueBallInfo.ySpin = power * Math.cos(Math.Pi*strikeLocationY)/2;
  finalCueBallInfo.inMotion = true;
  // ignore top and under spin for now (strikeLocationY)
  return finalCueBallInfo
}

// Final test to make sure balls are not inside eachother:
export const moveBallsOutsideEachOther = (billiardsObject) => {
  return billiardsObject.map((elem) => {
    
    // spreading contents to insure different references
    let element = {...elem};

    billiardsObject.forEach((billiard)=>{
      
      if (billiard.id !== element.id) {
        let test = testSingleBallCollision(element, billiard, 4.1);
        let xDifference, yDifference = 0;
        let nudgeAttempts = 0;
        while (nudgeAttempts <10 && test) {
          // increment nudgeAttempts to insure this never permacycles
          nudgeAttempts ++;
          // moving out of eachother with small random increments... less favorable solution
          // let theta = angleBetweenTwoBalls(element.top, element.left, billiard.top, billiard.left)
          // let rand = Math.random() -0.5;
          // element.left += 10*rand*Math.cos(theta);
          // element.top += 10*rand*Math.sin(theta);

          // better solution with no randomness:
          if (element.left > billiard.left) {
            xDifference = element.left - billiard.left;
            element.left += xDifference/2;
            billiard.left -= xDifference/2;
          }
          else {
            xDifference = billiard.left - element.left;
            element.left -= xDifference/2;
            billiard.left += xDifference/2;
          }
          if (element.top > billiard.top) {
            yDifference = element.top - billiard.top;
            element.top += yDifference/2;
            billiard.top -= yDifference/2;
          }
          else {
            yDifference = billiard.top - element.top;
            element.top -= yDifference/2;
            billiard.top += yDifference/2;
          }

          // force balls in bounds in the event that they were pushing outside boundaries
          if (!element.sinking) {
            if (element.left <= 0) element.left = .1;
            else if (element.left >= 255) element.left = 254.9;
            if (element.top >= 127.5) element.top = 127.49;
            else if (element.top <= 0) element.top = .1;
          }
          if (!billiard.sinking) {
            if (billiard.left <= 0) billiard.left = .1;
            else if (billiard.left >= 255) billiard.left = 254.9;
            if (billiard.top >= 127.5) billiard.top = 127.49;
            else if (billiard.top <= 0) billiard.top = .1;
          }
          test = testSingleBallCollision(element, billiard, 4.2);
        }
      }

      // if (!billiard.sinking) {
      //   if (element.left <= 13.5) element.left = 13.6;
      //   else if (element.left >= 276.5) element.left = 276.4;
      //   if (element.top >= 149.5) element.top = 149.4;
      //   else if (element.top <= 13) element.top = 13.1;
      // }
    })
    return element;
  })
}



// test results (following are true before application of scaling ratios): 
// right wall impact when left >= 276.5, top>= 23 && top <=140
// left wall impact when left <= 13.5, top>= 23 && top <=140
// bottom wall impact when top >= 149.5 and left >=24 && 137 or left >= 151.5 && 265.5
// top wall impact when top <= 13 and left >=24 && 137 or left >= 151.5 && 265.5
// Corner radius: 7
// TL center: top: 9, left: 9
// TR: top 9, left: 280
// BL: top: 152.5, left: 10
// BR: top: 152.5, left 279
// Side radius: 5.5
// B: top: 155.5 left: 144
// T: top: 6.5 left: 144.5