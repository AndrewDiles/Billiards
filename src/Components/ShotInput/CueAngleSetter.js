import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import crookedStick from '../../assets/crookedStick.png';
import plainOlCue from '../../assets/plainOlCue.png';
import magicWand from '../../assets/magicWand.png';
import boomStick from '../../assets/boomStick.png';
import wirtsLeg from '../../assets/wirtsLeg.png';

import { setShotAngle, setCueStrikeLocation } from "../../actions";

import {determinePadding} from '../../Functions/cuePadding';

import { Icon } from 'react-icons-kit';
import {rotateCcw} from 'react-icons-kit/feather/rotateCcw';
import {rotateCw} from 'react-icons-kit/feather/rotateCw';
import {arrowRight} from 'react-icons-kit/feather/arrowRight';
import {arrowLeft} from 'react-icons-kit/feather/arrowLeft';
import {arrowDown} from 'react-icons-kit/feather/arrowDown';
import {arrowUp} from 'react-icons-kit/feather/arrowUp';


const CueAngleSetter = () => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const handleClickToChangeAngle = (angle) => {
    dispatch(setShotAngle(angle))
  }
  const handleClickToSetStrikePosition = (x,y) => {
    if (x < 0 && settings.cueStrikeLocationX === 0) return;
    else if (x > 0 && settings.cueStrikeLocationX === 1) return;
    else if (y < 0 && settings.cueStrikeLocationY === 0) return;
    else if (y > 0 && settings.cueStrikeLocationY === 1) return;
    // console.log('dispatching change to strike location');
    // console.log('from input x',x,'from input y',y)
    // console.log('x:',settings.cueStrikeLocationX+x, 'y:',settings.cueStrikeLocationY+y);
    dispatch(setCueStrikeLocation(settings.cueStrikeLocationX+x, settings.cueStrikeLocationY+y))
  }

  let transform = `rotate(${-180*settings.shotAngle/Math.PI}deg)`;
  let marginRight = `${50*Math.cos(settings.shotAngle)}px`;
  let marginTop = `${50*Math.sin(settings.shotAngle)}px`;
  let padding = determinePadding(settings.cueStrikeLocationX,settings.cueStrikeLocationY);
  let cueUrl = plainOlCue;
  
  if (userInfo.user) {
    if (userInfo.user.inventory.wirtsLeg) cueUrl = wirtsLeg;
    else if (userInfo.user.inventory.boomStick) cueUrl = boomStick;
    else if (userInfo.user.inventory.magicWand) cueUrl = magicWand;
    else if (userInfo.user.inventory.plainOlCue) cueUrl = plainOlCue;
    else if (userInfo.user.inventory.crookedStick) cueUrl = crookedStick;
  }

  return (
    <ColumnWrapper>
      <ButtonsDiv>
        <StyledIcon onClick = {() => handleClickToChangeAngle(-45*Math.PI/180)} size={20} icon={rotateCcw}/>
        <StyledIcon onClick = {() => handleClickToChangeAngle(-5*Math.PI/180)} size={15} icon={rotateCcw}/>
        <StyledIcon onClick = {() => handleClickToChangeAngle(-.5*Math.PI/180)} size={10} icon={rotateCcw}/>
        <StyledIcon onClick = {() => handleClickToChangeAngle(.5*Math.PI/180)} size={10} icon={rotateCw}/>
        <StyledIcon onClick = {() => handleClickToChangeAngle(5*Math.PI/180)} size={15} icon={rotateCw}/>
        <StyledIcon onClick = {() => handleClickToChangeAngle(45*Math.PI/180)} size={20} icon={rotateCw}/>
      </ButtonsDiv>
      <StyledIcon onClick = {() => handleClickToSetStrikePosition(0, 0.1)} size={15} icon={arrowUp} direction = {"up"} x = {settings.cueStrikeLocationX} y = {settings.cueStrikeLocationY}/>
      <RowWrapper>
        <StyledIcon onClick = {() => handleClickToSetStrikePosition(-0.1, 0)} size={15} icon={arrowLeft} direction = {"left"} x = {settings.cueStrikeLocationX} y = {settings.cueStrikeLocationY}/>
        <StyledCircle
        padding = {padding}
        size = {settings.tableSize}
        >
          <StyledImg
          id = {'cue-stick-setter'}
          transform = {transform}
          marginRight = {marginRight}
          marginTop = {marginTop}
          src = {cueUrl} 
          alt = "A small image of a cue stick to visualize the angle of a shot"
          />
          <RedSpot
          x = {settings.cueStrikeLocationX}
          y = {settings.cueStrikeLocationY}
          size = {settings.tableSize}
          >

          </RedSpot>
        </StyledCircle>
        <StyledIcon onClick = {() => handleClickToSetStrikePosition(0.1, 0)} size={15} icon={arrowRight} direction = {"right"} x = {settings.cueStrikeLocationX} y = {settings.cueStrikeLocationY}/>
      </RowWrapper>
      <StyledIcon onClick = {() => handleClickToSetStrikePosition(0, -0.1)} size={15} icon={arrowDown} direction = {"down"} x = {settings.cueStrikeLocationX} y = {settings.cueStrikeLocationY}/>
    </ColumnWrapper>
  )
}

export default CueAngleSetter;
// right: ${props => props.size !== 'narrow' ? }
const RedSpot = styled.div`
  background-color: red;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  position: absolute;
`
const StyledCircle = styled.div`
  border: black solid 5px;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: linen;
  padding: ${props => props.padding};
  transform: ${props => props.size === 'narrow' && 'rotate(90deg)'};
`
const StyledImg = styled.img`
  user-select: none;
  height: 50px;
  width: 50px;
  transform: ${props => props.transform && props.transform};
  margin-right: ${props => props.marginRight && props.marginRight};
  margin-top: ${props => props.marginTop && props.marginTop};
`
const StyledIcon = styled(Icon)`
  /* cursor: pointer; */
  cursor: ${props => !props.direction ? 'pointer' : 
  props.direction === 'up' && props.y === 1 ? 'not-allowed' :
  props.direction === 'down' && props.y === 0 ? 'not-allowed' :
  props.direction === 'left' && props.x === 0 ? 'not-allowed' :
  props.direction === 'right' && props.x === 1 ? 'not-allowed' :
  'pointer'};
  border-radius: 50%;
  color: rgba(255,255,255,0.3);
  z-index: 10;
  &:hover {
    transform: scale(1.5);
    color: gold;
  }
`
const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`