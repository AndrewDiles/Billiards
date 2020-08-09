import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import crookedStick from '../../../assets/crookedStick.png';
import plainOlCue from '../../../assets/plainOlCue.png';
import magicWand from '../../../assets/magicWand.png';
import boomStick from '../../../assets/boomStick.png';
import wirtsLeg from '../../../assets/wirtsLeg.png';

import { actualSizes, sizeRatios } from '../../../Constants/tableSizes';

const PredictiveLine = ( {side} ) => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const billiards = useSelector((state) => state.billiards);
  
  let cueUrl = plainOlCue;
  if (userInfo.user) {
    if (userInfo.user.inventory.wirtsLeg) cueUrl = wirtsLeg;
    else if (userInfo.user.inventory.boomStick) cueUrl = boomStick;
    else if (userInfo.user.inventory.magicWand) cueUrl = magicWand;
    else if (userInfo.user.inventory.plainOlCue) cueUrl = plainOlCue;
    else if (userInfo.user.inventory.crookedStick) cueUrl = crookedStick;
  }
  let tableMarginX, tableMarginY, stickLength, stickHeight;
  if (settings.tableSize === 'full') {
    tableMarginX = 200;
    tableMarginY = 100;
    stickLength = 704;
    stickHeight = 400;
  }
  else if(settings.tableSize === 'medium') {
    tableMarginX = 100;
    tableMarginY = 50;
    stickLength = 440;
    stickHeight = 250;
  }
  else if (settings.tableSize === 'narrow') {
    tableMarginX = 0;
    tableMarginY = 0;
    stickLength = 440;
    stickHeight = 250;
  }

  let transform = `rotate(${-180*settings.shotAngle/Math.PI}deg)`;
  let centerOfCueBallX = ((billiards.billiards[0].left + actualSizes.railWidth + actualSizes.cushionWidth + actualSizes.ballRadius/2) * sizeRatios[settings.tableSize]) + tableMarginX;
  let centerOfCueBallY = ((billiards.billiards[0].top + actualSizes.railWidth + actualSizes.cushionWidth + actualSizes.ballRadius/2) * sizeRatios[settings.tableSize]) + tableMarginY;
  let topOfStick = centerOfCueBallY - stickHeight/2 + ((actualSizes.ballRadius/2) * sizeRatios[settings.tableSize]);
  let leftOfStick = centerOfCueBallX - stickLength + ((actualSizes.ballRadius/2) * sizeRatios[settings.tableSize]);

  // let marginRight = `${50*Math.cos(settings.shotAngle)}px`;
  // let marginTop = `${50*Math.sin(settings.shotAngle)}px`;

  // settings.shotAngle has angle of shot  
  return (
    <StyledImg
      transform = {transform}
      height = {stickHeight}
      length = {stickLength}
      typeof = {topOfStick}
      left = {leftOfStick}
      top = {topOfStick}
      // marginRight = {marginRight}
      // marginTop = {marginTop}
      src = {cueUrl} 
      alt = "The pool cue"
    />
  )
}
export default PredictiveLine;

const StyledImg = styled.img`
  z-index: 2;
  position: fixed;
  user-select: none;
  top: ${props => props.top && props.top}px;
  left: ${props => props.left && props.left}px;
  height: ${props => props.height && props.height}px;
  width: ${props => props.length && props.length}px;
  transform-origin: right ${props => props.height && props.height/2}px;
  transform: ${props => props.transform && props.transform};
`