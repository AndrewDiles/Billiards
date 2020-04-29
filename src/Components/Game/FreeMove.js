import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const FreeMove = () => {
  const settings = useSelector((state) => state.settings);
  let width = '950px';
  if (settings.tableSize === "full") width = '1550px';
  else if (settings.tableSize === "narrow") width = '750px';
  return (
    <StyledSpan
    width = {width}
    >
      FREE MOVE
    </StyledSpan>
  )
}
export default FreeMove;

const StyledSpan = styled.span`
  z-index: 8;
  position: absolute;
  top: 0;
  width: ${props=> props.width && props.width};
  text-align: center;
  color: white;
  font-size: 1.5em;
`
// z-index 8