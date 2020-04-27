import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  changeTableSize,
  addBalls,
  changeGameType,
} from "../../actions";

// import { SettingsContext } from '../../SettingsContext';


import { tableSizes } from '../../Constants/tableSizes';
import StyledButton from '../StyledButton';



const Selections = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  // const { settings, setSettings } = useContext(SettingsContext);

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
  }

  return (
    <Wrapper>
      <StyledButton
      handleClick = {() => handleClickBallMaker("eight")}
      >
        Eight
      </StyledButton>
      <StyledButton
      handleClick = {() => handleClickBallMaker("nine")}
      >
        Nine
      </StyledButton>
      <StyledButton
      handleClick = {() => handleClickBallMaker("test")}
      >
        TestMakeBalls
      </StyledButton>
      <StyledButton
      handleClick = {handleClick}
      value = "narrow"
      >
        Narrow
      </StyledButton>
      <StyledButton
      handleClick = {handleClick}
      value = "medium"
      >
        Medium
      </StyledButton>
      <StyledButton
      handleClick = {handleClick}
      value = "full"
      >
        Full
      </StyledButton>
    </Wrapper>
  )
}
export default Selections;
const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  top: 0;
  right: 0;
`