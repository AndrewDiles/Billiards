import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import grabGreen from '../../../assets/grabGreen.png';
import grabRed from '../../../assets/grabRed.png';

import { testBallCollisions } from '../../../Functions/physics';

import {
  setBallOnTable,
  setBallInHand,
  freeMoveCueBallIllegal
} from "../../../actions";

import { ballColors } from '../../../Constants/ballConstants';
import { actualSizes, tableSizes, sizeRatios } from '../../../Constants/tableSizes';

const Balls = ( {billiard} ) => {
  const settings = useSelector((state) => state.settings);
  const billiardInfo = useSelector((state) => state.billiards)
  const [legalDrop, setLegalDrop] = React.useState(true);
  const dispatch = useDispatch();

  useEffect((ev)=>{
    const table = document.getElementById('Table');
    
    const moveFunction = (ev) => {
      // console.log('move function triggered');
      if (billiardInfo.status === "in-motion") {
        return;
      }
      if (!(ev.target.className.includes("Hole-Green") || ev.target.className.includes("cue"))){
        const borderSize = tableSizes[settings.tableSize].cushionWidth + tableSizes[settings.tableSize].railWidth;
        if (settings.gameStatus === 'first-shot') {
          dispatch(freeMoveCueBallIllegal(
            50,
            ((ev.offsetY-tableSizes[settings.tableSize].ballRadius)-borderSize)/sizeRatios[settings.tableSize]
          ));
        }
        else {
          dispatch(freeMoveCueBallIllegal(
            ((ev.offsetX-tableSizes[settings.tableSize].ballRadius)-borderSize)/sizeRatios[settings.tableSize],
            ((ev.offsetY-tableSizes[settings.tableSize].ballRadius)-borderSize)/sizeRatios[settings.tableSize]
          ));
        }

        if (testLegalBallDropLocation(ev.offsetX, ev.offsetY)){
          setLegalDrop(true);
        }
        else {
          setLegalDrop(false);
        }
      }
    }
    // if (!settings.ballInHand) return;
    if (settings.ballInHand && billiard.id==="cue") {
      table.addEventListener('mousemove',moveFunction);
      table.addEventListener('mousedown',(event) => handleTableClick(event));
      return () => {
        table.removeEventListener('mousemove',moveFunction);
        table.removeEventListener('mouseclick',(event) => handleTableClick(event));
      }
    }
  }, [settings.ballInHand, settings.gameStatus] )
  
  const testLegalBallDropLocation = (x,y) => {
    // console.log('legal drop test begins, (x,y) =', x,y)
    let trueX = (x-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize];
    let trueY = (y-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize]
    let legalLocation = false;
    
    if (trueX >= 13 && trueX <= 268 && trueY >= 13 && trueY <= 141.1) legalLocation = true;
    // test position of each ball.  
    if (legalLocation) {
      const insideAnotherBall = testBallCollisions(trueY-13.08, trueX-13.08, billiardInfo.billiards, billiardInfo.billiards[0]);
      if (insideAnotherBall.length !== 0) legalLocation = false;
      // console.log('insideAnotherBall',insideAnotherBall)
    }
    return legalLocation;
  }

  const handleTableClick = (event) => {
    // console.log('Table Clicked');
    if (!(settings.gameStatus === 'free-move' || settings.gameStatus === 'first-shot')) return;
    // if (testLegalBallDropLocation(mouselocationLeft, mouselocationTop)){
    //   dispatch(setBallOnTable());
    // }
    // console.log('Table Clicked and function did not bail');
    if (testLegalBallDropLocation(event.offsetX, event.offsetY)){
      dispatch(setBallOnTable());
      const TableWrapper = document.getElementById('TableWrapper');
      TableWrapper.style.cursor = 'default';
      setLegalDrop(true);
    }
    else {console.log('can not drop ball here. Top:', billiardInfo.billiards[0].top, 'Left:', billiardInfo.billiards[0].left)}
  }
  const handleClick = (ev) => {
    // console.log('Ball Clicked')
    if (!(settings.gameStatus === 'free-move' || settings.gameStatus === 'first-shot')) return;
    if (!ev.target.className.includes('cue')) return
    // console.log('YOU CLICKED ON THE CUE BALL!');
    if (!settings.ballInHand) dispatch(setBallInHand());
    // dispatch(cueStrike(20, 7*Math.PI/4, 0, 0));  //will later have parameters     power, angle 0=> right, Math.PI/2 => up Math.PI => left, 3Math.PI/2 => down strikeLocationX, strikeLocationY
  }

  let degYMod180 = billiard.yAngle % 180;
  let sinDegY = Math.sin((degYMod180%45)* Math.PI / 180)
  let scale = `scale(${billiard.sinkingSize})`;

  const TableWrapper = document.getElementById('TableWrapper');
  if (TableWrapper && settings.ballInHand) {
    legalDrop ? TableWrapper.style.cursor = `url(${grabGreen}), auto` : TableWrapper.style.cursor = `url(${grabRed}), auto`
  }

  return (
    <BallContainer
    legalDrop = {legalDrop}
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
    opacity = {parseFloat(billiard.sinkingSize)}
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
          {billiard.id !== 'cue' &&
            <WhiteCenterCircle
            className = {billiard.id}
            sinDegY = {100*sinDegY}
            degYMod180 = {degYMod180}
            yAngle = {billiard.yAngle}
            >
              {billiard.id}
              <Shine/>  
              {/* Shine actually doesn't currently make sense, as the light source would cause a shine in the same location, yet these shines rotates differently */}
            </WhiteCenterCircle>
          }
        </Stripe>
      </Color>
    </BallContainer>
  )
}
export default Balls;
const Shine = styled.div`
  height: 50%;
  width: 50%;
  border-radius: 50%;
  position: absolute;
  bottom: 15%;
  right: 15%;
  background-color: azure;
  opacity: 0.3;
`
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
  opacity: ${props => props.opacity};
  /* opacity: 0.5; */
  /* border: red solid 1px; TEST PURPOSES*/ 
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



// Failed code from inside moveFunction:
// else {
  // let pathsKeys = Object.keys(ev.path);
  // console.log('pathpathpathpathpthaptahpt', paths);
  // let tableInfo = paths.find(element=>{element.classList.includes("Table")})
  // let tableInfo = {};
  // let tableInfo = ev.path.find(element=>{element.classList.includes("Table")})
  // let leftMargin = tableInfo.offsetLeft;
  // let topMargin = tableInfo.offsetTop;
  // let tableWidth = tableInfo.offsetWidth;
  // let tableHeight = tableInfo.offsetHeight;
  
  // const feltWidth = tableSizes[settings.tableSize].feltWidth;
  // const feltHeight = tableSizes[settings.tableSize].feltHeight;
  
  // /sizeRatios[settings.tableSize];
  
  // /sizeRatios[settings.tableSize];
  // const borderSize = tableSizes[settings.tableSize].cushionWidth + tableSizes[settings.tableSize].railWidth;
  // const marginLeft = tableSizes[settings.tableSize].leftPadding;
  // const marginTop = tableSizes[settings.tableSize].topPadding;
  // let x = (ev.ClientX - borderSize - marginLeft);
  // let y = (ev.ClientY - borderSize - marginTop);
  // setMouselocationLeft(parseFloat(x));
  // setMouselocationTop(parseFloat(y));
  // dispatch(freeMoveCueBall(
  //   (ev.offsetX-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize],
  //   (ev.offsetY-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize]
  //   ));
  // console.log(leftMargin,topMargin,tableWidth,tableHeight)
// }
// console.log('ev.targetev.targetev.target',ev)
// console.log(ev,'evevevevevevevevevevev');

// CHANGE THIS FROM OFFSET TO ABSOLUTE POSITION

// console.log('LEFT event from mousemove listener',ev.offsetX);
// console.log('TOP event from mousemove listener',ev.offsetY);

// setMouselocationLeft(parseFloat(ev.offsetX));
// setMouselocationTop(parseFloat(ev.offsetY));

// let location = {x: ev.clientX, y: ev.clientY};
// setMouselocation(location);
// let left = (ev.clientX/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].leftPadding;
// let top = (ev.clientY/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].topPadding;
// dispatch(freeMoveCueBall((ev.clientX/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].leftPadding
// ,(ev.clientY/sizeRatios[settings.tableSize]) - borderSize - tableSizes[settings.tableSize].topPadding));
// dispatch(freeMoveCueBall(left,top));
// console.log('mouselocationLeftmouselocationLeftmouselocationLeftmouselocationLeft',mouselocationLeft)
// dispatch(freeMoveCueBall(
//   (ev.offsetX-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize],
//   (ev.offsetY-tableSizes[settings.tableSize].ballRadius)/sizeRatios[settings.tableSize]
//   ));


// Failed code from inside testLegalBallDropLocation
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
    // console.log('trueX',trueX,'........trueY',trueY);
    // if (trueX < 0) {legalLocation = false; console.log("OOB LEFT");}
    // else if (trueX > 63.75*sizeRatios[settings.tableSize]) {legalLocation = false; console.log("OOB RIGHT");}
    // else if (trueY < 0) {legalLocation = false; console.log("OOB TOP");}
    // else if (trueY > 32*sizeRatios[settings.tableSize]) {legalLocation = false; console.log("OOB BOTTOM");}