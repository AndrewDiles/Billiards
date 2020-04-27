import React, { useContext } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";

// import tableSizes from '../../Constants/tableSizes';
const StyledButton = ( { handleClick, value, children} ) => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const billiards = useSelector((state) => state.billiards);
  
  // import color stylings?

  let disabled = false;
  if (!(settings.status === 'idle' || settings.status === 'error')) disabled = true;
  if (!(userInfo.status === 'idle' || userInfo.status === 'error')) disabled = true;
  if (!(billiards.status === 'idle' || billiards.status === 'error')) disabled = true;

  // if (!(
  //   settings.status !== 'idle' && 
  //   settings.status !== 'error' &&
  //   userInfo.status !== 'idle' &&
  //   userInfo.status !== 'error' &&
  //   billiards.status !== 'idle' &&
  //   billiards.status !== 'error'
  // )) disabled = false;
  // console.log('disableddisableddisableddisableddisableddisabled',disabled)

  return (
      <ButtonStylings
      disabled = {disabled}
      onClick = {(ev)=> handleClick(ev)}
      value = {value}
      >
        {children}
      </ButtonStylings>
  )
}
export default StyledButton;

const ButtonStylings = styled.button`
  width: 200px;
  padding: 15px;
  background-color: pink;
  z-index: 10;
  margin: 5px;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: salmon;
  }
`