import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  setGameStatusIdle,
  setGameStatusAwaitingShot,
  cueStrike,
  setShotPower
} from "../../actions";



const PowerBar = ({ maximumHeight }) => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleClickToChangePower = (ev) => {
    if (!(settings.gameStatus === 'idle' || settings.gameStatus === 'awaiting-shot' || 
    settings.gameStatus === 'first-move' || settings.gameStatus === 'first-shot')|| settings.ballInHand) return;
    let powerRatio = null;
    if (ev.target.className.includes('PLContainer')) {
    powerRatio = 1 - ev.nativeEvent.offsetY/maximumHeight;
    }
    else {
      let currentHeight = maximumHeight*settings.shotPower;
      let toRedHeight = currentHeight - ev.nativeEvent.offsetY;
      let desiredYOffet = maximumHeight - toRedHeight;
      powerRatio = 1 - desiredYOffet/maximumHeight;
    }
    dispatch(setShotPower(powerRatio));
  }
  // ${settings.shotPower*200}
  let topColor = `rgb(${settings.shotPower*255}, 0 , 50)`;
  let gradient = `linear-gradient( ${topColor}, rgb(0,255,50) )`;
  
  return (
    <Bar
    size = {settings.tableSize}
    >
      <PowerLevelContainer
      className = {'PLContainer'}
      disabled = {!(settings.gameStatus === 'idle' || 
      settings.gameStatus === 'awaiting-shot' || 
      settings.gameStatus === 'free-move' ||
      settings.gameStatus === 'first-shot') 
      || settings.ballInHand
    }
      onClick = {(ev)=>handleClickToChangePower(ev)}
      >
        <PowerLevel
        gradient = {gradient}
        powerHeight = {100*settings.shotPower}
        />
      </PowerLevelContainer>
    </Bar>
  )
}
export default PowerBar;
const PowerLevel = styled.div`
  /* background-color: red; */
  background-image: ${props => props.gradient && props.gradient};
  height: ${props => props.powerHeight && `${props.powerHeight}%`};
  width: 100%;
  border-radius: 25px;
`
const PowerLevelContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 25px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'ns-resize'};
  display: flex;
  flex-direction: column-reverse;
`
const Bar = styled.div`
  border: solid 5px black;
  border-radius: 25px;
  width: ${props => props.size === 'medium' ? '35%' : '50%'};
  height: 80%;
`