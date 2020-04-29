import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

import {
  setGameStatusIdle,
  setGameStatusAwaitingShot,
  cueStrike,
} from "../../actions";



const ShootButton = ( ) => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleClickToShoot = () => {
    dispatch(cueStrike(1+80*settings.shotPower, settings.shotAngle, 0.5, 0.5));  //will later have parameters     power, angle 0=> right, Math.PI/2 => up Math.PI => left, 3Math.PI/2 => down strikeLocationX, strikeLocationY
  }
  let disabled = false;
  if (!(settings.gameStatus === 'idle' || 
  settings.gameStatus === 'awaiting-shot' || 
  settings.gameStatus === 'free-move' ||
  settings.gameStatus === 'first-shot') 
  || settings.ballInHand) disabled = true;

  return (
    <StyledButton
    handleClick = {() => handleClickToShoot()}
    disabled = {disabled}
    >
      SHOOT
    </StyledButton>
  )
}
export default ShootButton;
