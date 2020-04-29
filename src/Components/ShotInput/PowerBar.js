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
  return (
    <Bar>
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
        powerHeight = {100*settings.shotPower}
        />
      </PowerLevelContainer>
    </Bar>
  )
}
export default PowerBar;
const PowerLevel = styled.div`
  background-color: red;
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
  width: 50%;
  height: 80%;
`


