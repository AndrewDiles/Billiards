import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import cueStickPng from '../../assets/cueStick.png';

import { setShotAngle } from "../../actions";

import { Icon } from 'react-icons-kit';
import {rotateCcw} from 'react-icons-kit/feather/rotateCcw';
import {rotateCw} from 'react-icons-kit/feather/rotateCw';

const CueAngleSetter = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleClickToChangeAngle = (angle) => {
    dispatch(setShotAngle(angle))
  }

console.log('shot Angle: ',settings.shotAngle)
// console.log('testing math:', 50*Math.cos(settings.shotAngle))
// console.log('testing math:', `${50*Math.cos(settings.shotAngle)}px`)

let transform = `rotate(${-180*settings.shotAngle/Math.PI}deg)`;

let marginRight = `${50*Math.cos(settings.shotAngle)}px`;
let marginTop = `${50*Math.sin(settings.shotAngle)}px`;


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
      <StyledCircle>
        <StyledImg
        id = {'cue-stick-setter'}
        transform = {transform}
        marginRight = {marginRight}
        marginTop = {marginTop}
        src = {cueStickPng} 
        alt = "A small image of a cue stick to visualize the angle of a shot"
        />
      </StyledCircle>
    </ColumnWrapper>
  )
}
export default CueAngleSetter;
const StyledCircle = styled.div`
  border: black solid 5px;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  cursor: pointer;
  border-radius: 50%;
  color: rgba(255,255,255,0.3);
  &:hover {
    color: gold;
  }
`
const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
`
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`