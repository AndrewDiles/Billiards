import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import StyledButton from '../StyledButton';

import {
  cueStrike,
} from "../../actions";



const ShootButton = ( ) => {
  const settings = useSelector((state) => state.settings);
  const billiardSettings = useSelector((state) => state.billiards);
  
  const dispatch = useDispatch();

  const handleClickToShoot = () => {
    dispatch(cueStrike(1+15*(settings.shotPower+.01)*(settings.shotPower+.01), settings.shotAngle, settings.cueStrikeLocationX, settings.cueStrikeLocationY));  //will later have parameters     power, angle 0=> right, Math.PI/2 => up Math.PI => left, 3Math.PI/2 => down strikeLocationX, strikeLocationY
  }
  let disabled = false;
  if (!(settings.gameStatus === 'idle' || 
  settings.gameStatus === 'awaiting-shot' || 
  settings.gameStatus === 'free-move' ||
  settings.gameStatus === 'first-shot') ||
  settings.ballInHand || 
  billiardSettings.status === 'in-motion') disabled = true;

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
