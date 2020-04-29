import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  changeTableSize,
  addBalls,
  changeGameType,
  setGameStatusFirstShot,
} from "../../actions";

// import { SettingsContext } from '../../SettingsContext';


import { tableSizes } from '../../Constants/tableSizes';
import StyledButton from '../StyledButton';



const Selections = ({isSliding}) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  // const { settings, setSettings } = useContext(SettingsContext);
  if (!settings.sideBarOpen || isSliding) {
    return (<></>)
  }
  // import color stylings?

  const handleClick = (ev) => {
    // console.log(ev.target.value);
    // let newSettings = {...settings};
    dispatch(changeTableSize(ev.target.value));
    // newSettings.tableSize = ev.target.value;
    // setSettings(newSettings);
  }
  const handleClickBallMaker = (text) => {
    // dispatch(addBalls(settings.gameType));
    dispatch(changeGameType(text));
    dispatch(addBalls(text));
    dispatch(setGameStatusFirstShot());

  }
  let disabled = false;
  // if (!(settings.status === 'idle' || settings.status === 'error')) disabled = true;
  // if (!(userInfo.status === 'idle' || userInfo.status === 'error')) disabled = true;
  // if (!(billiards.status === 'idle' || billiards.status === 'error')) disabled = true;

  return (
    <Wrapper>
      <StyledButton
      handleClick = {() => handleClickBallMaker("eight")}
      disabled = {disabled}
      >
        Eight
      </StyledButton>
      <StyledButton
      handleClick = {() => handleClickBallMaker("nine")}
      disabled = {disabled}
      >
        Nine
      </StyledButton>
      <StyledButton
      handleClick = {() => handleClickBallMaker("test")}
      disabled = {disabled}
      >
        TestMakeBalls
      </StyledButton>
      <StyledButton
      handleClick = {handleClick}
      disabled = {disabled}
      value = "narrow"
      >
        Narrow
      </StyledButton>
      <StyledButton
      handleClick = {handleClick}
      disabled = {disabled}
      value = "medium"
      >
        Medium
      </StyledButton>
      <StyledButton
      handleClick = {handleClick}
      disabled = {disabled}
      value = "full"
      >
        Full
      </StyledButton>
    </Wrapper>
  )
}
export default Selections;
const Wrapper = styled.div`
  /* position: absolute; */
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  top: 0;
  right: 0;
`