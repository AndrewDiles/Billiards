import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import StyledButton from '../StyledButton';

import {
  cueStrike,
  addToShotTotal,
  setGameStatusIdle,
  setObjectives,
  addToSunkBalls,
} from "../../actions";

const ShootButton = ( ) => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const billiardSettings = useSelector((state) => state.billiards);
  
  const dispatch = useDispatch();

  let cuePower = 15;
  if (userInfo.user) {
    if (userInfo.user.inventory.wirtsLeg) cuePower = 25;
    else if (userInfo.user.inventory.boomStick) cuePower = 30;
    else if (userInfo.user.inventory.magicWand) cuePower = 20;
    else if (userInfo.user.inventory.plainOlCue) cuePower = 15;
    else if (userInfo.user.inventory.crookedStick) cuePower = 10;
  }

  let angleMultiplier = 1;
  if (userInfo.user) {
    if (userInfo.user.inventory.rainbowChalk) angleMultiplier = 0.1;          // rainbowChalk reduces range by 90%
    else if (userInfo.user.inventory.purpleChalk) angleMultiplier = 0.25;     // purpleChalk reduces range by 75%    
    else if (userInfo.user.inventory.chalk) angleMultiplier = 0.5;            // chalk reduces range by 50%
  }
  // one degree: 0.00872664625
  // half degree: 0.00436332312
  let angleVariation = angleMultiplier * 0.00872664625 * ((Math.random())-.5); // this gives error of +/- half a degree x chalkMultiplier

  const handleClickToShoot = () => {
    dispatch(cueStrike(1+cuePower*(settings.shotPower+.01)*(settings.shotPower+.01), angleVariation + settings.shotAngle, settings.cueStrikeLocationX, settings.cueStrikeLocationY));  //will later have parameters     power, angle 0=> right, Math.PI/2 => up Math.PI => left, 3Math.PI/2 => down strikeLocationX, strikeLocationY
    if (settings.gameType === "nine") {
      dispatch(addToShotTotal());
    }
  }
  const handleClickToSetObjective = (ballType) => {
    dispatch(setObjectives(userInfo.currentGame.activePlayer, ballType));
    // set balls sunk
    let solids = [];
    let stripes = [];
    billiardSettings.billiards.forEach((billiard)=> {
      if (billiard.sinkingSize <= 0){
        if (billiard.id < 8 && billiard.id !== "cue") {
          solids.push(billiard.id);
        }
        else if (billiard.id > 8 && billiard.id !== "cue") {
          stripes.push(billiard.id)
        }
      } 
    })
    dispatch(addToSunkBalls(solids, stripes));
    dispatch(setGameStatusIdle());
  }
  let disabled = false;
  if (!(settings.gameStatus === 'idle' || 
  settings.gameStatus === 'awaiting-shot' || 
  settings.gameStatus === 'free-move' ||
  settings.gameStatus === 'first-shot') ||
  settings.ballInHand || 
  billiardSettings.status === 'in-motion') disabled = true;

  if (settings.gameStatus === "awaiting-Choice") {
    return (
      <>
        <StyledButton 
        handleClick = {() => handleClickToSetObjective("solids")}
        disabled = {false}
        >
          SOLIDS
        </StyledButton>
        <StyledButton
        handleClick = {() =>handleClickToSetObjective("stripes")}
        disabled = {false}
        >
          STRIPES
        </StyledButton>
      </>
    )
  }
  else {
    return (
      <StyledButton
      handleClick = {() => handleClickToShoot()}
      disabled = {disabled}
      >
        SHOOT
      </StyledButton>
    )
  }
}
export default ShootButton;
