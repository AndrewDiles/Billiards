import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled, { withTheme } from 'styled-components';

import {
  beginBallMotion,
  cueStrike,
  setBallOnTable,
  setBallInHand,
  freeMoveCueBall
} from "../../../actions";


import { ballColors, initialBallLocations } from '../../../Constants/ballConstants';
import { actualSizes, tableSizes, sizeRatios } from '../../../Constants/tableSizes';


const Balls = ( {billiard} ) => {
  const settings = useSelector((state) => state.settings);
  // const [ballInHandTriggered, setBallInHandTriggered] = React.useState(false);
  const [mouselocationLeft, setMouselocationLeft] = React.useState(null);
  const [mouselocationTop, setMouselocationTop] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect((ev)=>{
    if (!settings.ballInHand 
      // || ballInHandTriggered
      ) return;
    // setBallInHandTriggered(true);
    // console.log('ball is in hand', settings.ballInHand)
    const table = document.getElementById('Table');

    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_getboundingclientrect


    const moveFunction = (ev) => {
      // console.log(ev,'evevevevevevevevevevev');

      // CHANGE THIS FROM OFFSET TO ABSOLUTE POSITION

      // console.log('LEFT event from mousemove listener',ev.offsetX);
      // console.log('TOP event from mousemove listener',ev.offsetY);
      setMouselocationLeft(parseFloat(ev.offsetX));
      setMouselocationTop(parseFloat(ev.offsetY));
      // let location = {x: ev.clientX, y: ev.clientY};
      // setMouselocation(location);
      // let left = (ev.clientX/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].leftPadding;
      // let top = (ev.clientY/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].topPadding;
      // dispatch(freeMoveCueBall((ev.clientX/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].leftPadding
      // ,(ev.clientY/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].topPadding));
      // dispatch(freeMoveCueBall(left,top));
      // console.log('mouselocationLeftmouselocationLeftmouselocationLeftmouselocationLeft',mouselocationLeft)
      dispatch(freeMoveCueBall(
        (ev.offsetX-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize],
        (ev.offsetY-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize]
        ));
    }
    table.addEventListener('mousemove',moveFunction);
    return () => {
      table.removeEventListener('mousemove',moveFunction);
    }
  }, [settings.ballInHand])

  

  const testLegalBallDropLocation = (x,y) => {
    console.log('legal drop test begins, (x,y) =', x,y)
    let trueX = (x-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize];
    let trueY = (y-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize]
    let legalLocation = true;
    // const borderSize = tableSizes[settings.tableSize].cushionWidth + tableSizes[settings.tableSize].railWidth;
    // const topBoundary = tableSizes[settings.tableSize].topPadding + borderSize;
    // const bottomBoundary = topBoundary + tableSizes[settings.tableSize].feltHeight;
    // const leftBoundary = tableSizes[settings.tableSize].leftPadding + borderSize;
    // const rightBoundary = leftBoundary + tableSizes[settings.tableSize].feltWidth;
    // const ballDiameter = 2*tableSizes[settings.tableSize].ballRadius;
    // console.log('topBoundary',topBoundary);
    // console.log('bottomBoundary',bottomBoundary);
    // console.log('leftBoundary',leftBoundary);
    // console.log('rightBoundary',rightBoundary);
    // console.log('trueX',trueX);
    // console.log('trueY',trueY);
    if (trueX < 0) {legalLocation = false; console.log("OOB LEFT");}
    else if (trueX > 63.75*sizeRatios[settings.tableSize]) {legalLocation = false; console.log("OOB RIGHT");}
    else if (trueY < 0) {legalLocation = false; console.log("OOB TOP");}
    else if (trueY > 32*sizeRatios[settings.tableSize]) {legalLocation = false; console.log("OOB BOTTOM");}
    // test position of each ball.  
    // test on line for starting shot
    return legalLocation;
  }

  // console.log('Billiard from Ball.js',billiard);

  const handleClick = (ev) => {
    if (!(settings.gameStatus === 'free-move' || settings.gameStatus === 'first-shot')) return;
    if (!ev.target.className.includes('cue')) return
    console.log('YOU CLICKED ON THE CUE BALL!');
    if (!settings.ballInHand) dispatch(setBallInHand());
    else {
      if (testLegalBallDropLocation(mouselocationLeft, mouselocationTop)){
        dispatch(setBallOnTable());
        // setBallInHandTriggered(false);
      }
      else {console.log('can not drop ball here')}

//  THE ACTION LOOKS LIKE
      // export const freeMoveCueBall = (x,y) => ({
      //   type: 'FREE_MOVE_CUE_BALL',
      //   x,
      //   y,
      // })



      
    }
    

    // dispatch(cueStrike(20, 7*Math.PI/4, 0, 0));  //will later have parameters     power, angle 0=> right, Math.PI/2 => up Math.PI => left, 3Math.PI/2 => down strikeLocationX, strikeLocationY
  }

  let degYMod180 = billiard.yAngle % 180;
  let sinDegY = Math.sin((degYMod180%45)* Math.PI / 180)
  // console.log('degYMod180degYMod180degYMod180',degYMod180);
  // console.log('sinDegYsinDegYsinDegYsinDegY',sinDegY);
  let scale = `scale(${billiard.sinkingSize})`;
  return (
    <BallContainer
    className = {billiard.id}
    freeMove = {(settings.gameStatus === 'free-move' || settings.gameStatus === 'first-shot') && billiard.id === 'cue'}
    inHand = {settings.ballInHand}
    onClick = {(ev)=>handleClick(ev)}
    // onMouseDown = {(ev)=>handleClick(ev)}
    // onMouse = {(ev)=>handleClick(ev)}
    radius = {actualSizes.ballRadius * sizeRatios[settings.tableSize]}
    top = {(billiard.top + actualSizes.railWidth + actualSizes.cushionWidth) * sizeRatios[settings.tableSize]}
    left = {(billiard.left + actualSizes.railWidth + actualSizes.cushionWidth) * sizeRatios[settings.tableSize]}
    scale = {scale}
    // top = {initialBallLocations[settings.gameType][billiard.id].top * sizeRatios[settings.tableSize]}
    // left = {initialBallLocations[settings.gameType][billiard.id].left * sizeRatios[settings.tableSize]}
    >
      <Color
      className = {billiard.id}
      striped = {ballColors[billiard.id].striped}
      color = {ballColors[billiard.id].color}
      radius = {actualSizes.ballRadius * sizeRatios[settings.tableSize]}
      xAngle = {billiard.xAngle}
      >
        <Stripe
          className = {billiard.id}
          radius = {actualSizes.ballRadius * sizeRatios[settings.tableSize]}
          sinDegY = {100*sinDegY}
          degYMod180 = {degYMod180}
          yAngle = {billiard.yAngle}
          striped = {ballColors[billiard.id].striped}
          color = {ballColors[billiard.id].color}
        >
          <WhiteCenterCircle
          className = {billiard.id}
          sinDegY = {100*sinDegY}
          degYMod180 = {degYMod180}
          yAngle = {billiard.yAngle}
          >
            {/* {billiard.id !== 'cue' && billiard.id} */}
            {billiard.id}
          </WhiteCenterCircle>
        </Stripe>
      </Color>
    </BallContainer>
  )
}
export default Balls;
const WhiteCenterCircle = styled.div`
  height: 90%;
  /* height: ${props => props.degYMod180 > 90 ? `${.9*(props.sinDegY+50)}%` : `${.9*(props.sinDegY)}%`}; */
  width: 35%;
  /* height: ${props => props.degYMod180 > 90 ? `${.35*(props.sinDegY+50)}%` : `${.35*(props.sinDegY)}%`}; */
  border-radius: 50%;
  background-color: white;
  /* display: ${props => props.yAngle % 360 >= 180 ? 'none' : 'flex'}; */
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  overflow: hidden;
  font-weight: bold;
  font-size: 50%;
`
const Stripe = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  overflow: hidden;
  background-color : ${props => props.color};
  width: 100%;
  height: 40%;
  /* height: ${props => props.degYMod180 > 90 ? `${.4*(props.sinDegY+50)}%` : `${.4*(props.sinDegY)}%`}; */
  position: relative;
  /* margin-top: ${props => props.radius && -0.8*props.radius}px; */
  /* top: ${props => props.degYMod180 > 90 ? `${props.sinDegY+50}%` : `${props.sinDegY}%`}; */
`


// Math.sin(90 * Math.PI / 180)


const BallContainer = styled.div`
  cursor: ${props => props.freeMove ? props.inHand ? 'grabbing' : 'grab' : 'arrow'};
  height: ${props => props.radius && 2*props.radius}px;
  width: ${props => props.radius && 2*props.radius}px;
  left: ${props => props.left && props.left}px;
  top: ${props => props.top && props.top}px;
  position: absolute;
  z-index: 4;
  transform: ${props => props.scale && props.scale};
`
const Color = styled.div`
  height: ${props => props.radius && 2*props.radius}px;
  width: ${props => props.radius && 2*props.radius}px;
  border-radius: 50%;
  background-color: ${props => props.striped && props.striped ? "white" : props.color};
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  /* Turn above off for rotational movement in stripe */
  overflow: hidden;
  transform: ${props => `rotate(${360*props.xAngle/(2*Math.PI)}deg)`};
`


// ${props => props.striped && {
//   backgroundColor : props.color,
//   width: '100%',
//   height: '40%',
// }}