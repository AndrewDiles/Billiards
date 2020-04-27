import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled, { withTheme } from 'styled-components';

import {
  beginBallMotion,
  cueStrike,
} from "../../../actions";


import { ballColors, initialBallLocations } from '../../../Constants/ballConstants';
import { actualSizes, tableSizes, sizeRatios } from '../../../Constants/tableSizes';


const Balls = ( {billiard} ) => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  // console.log('Billiard from Ball.js',billiard);

  const handleClick = (ev) => {
    dispatch(cueStrike(20, 7*Math.PI/4, 0, 0));  //will later have parameters     power, angle 0=> right, Math.PI/2 => up Math.PI => left, 3Math.PI/2 => down strikeLocationX, strikeLocationY
  }

  let degYMod180 = billiard.yAngle % 180;
  let sinDegY = Math.sin((degYMod180%45)* Math.PI / 180)
  // console.log('degYMod180degYMod180degYMod180',degYMod180);
  // console.log('sinDegYsinDegYsinDegYsinDegY',sinDegY);

  return (
    <BallContainer
    onClick = {(ev)=>handleClick(ev)}
    radius = {actualSizes.ballRadius * sizeRatios[settings.tableSize]}
    top = {(billiard.top + actualSizes.railWidth + actualSizes.cushionWidth) * sizeRatios[settings.tableSize]}
    left = {(billiard.left + actualSizes.railWidth + actualSizes.cushionWidth) * sizeRatios[settings.tableSize]}
    // top = {initialBallLocations[settings.gameType][billiard.id].top * sizeRatios[settings.tableSize]}
    // left = {initialBallLocations[settings.gameType][billiard.id].left * sizeRatios[settings.tableSize]}
    >
      <Color
      id = {billiard.id}
      striped = {ballColors[billiard.id].striped}
      color = {ballColors[billiard.id].color}
      radius = {actualSizes.ballRadius * sizeRatios[settings.tableSize]}
      xAngle = {billiard.xAngle}
      >
        <Stripe
          radius = {actualSizes.ballRadius * sizeRatios[settings.tableSize]}
          sinDegY = {100*sinDegY}
          degYMod180 = {degYMod180}
          yAngle = {billiard.yAngle}
          striped = {ballColors[billiard.id].striped}
          color = {ballColors[billiard.id].color}
        >
          <WhiteCenterCircle
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


Math.sin(90 * Math.PI / 180)


const BallContainer = styled.div`
  height: ${props => props.radius && 2*props.radius}px;
  width: ${props => props.radius && 2*props.radius}px;
  left: ${props => props.left && props.left}px;
  top: ${props => props.top && props.top}px;
  position: absolute;
  z-index: 4;
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
  cursor: ${props => props.id === "cue" && 'grab'}
`


// ${props => props.striped && {
//   backgroundColor : props.color,
//   width: '100%',
//   height: '40%',
// }}