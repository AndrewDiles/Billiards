import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

const InLobbyOptions = ({ gameInfo }) => {


  return (
    <Wrapper>
      <StyledButton>
        AYE!
      </StyledButton>
      <StyledButton>
        JUMP SHIP
      </StyledButton>
    </Wrapper>
  )
}
export default InLobbyOptions;



const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
`

