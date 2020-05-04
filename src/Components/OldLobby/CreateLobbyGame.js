import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

const CreateLobbyGame = () => {


  return (
    <Wrapper>
      Open a lobby
    </Wrapper>
  )
}
export default CreateLobbyGame;



const Wrapper = styled.div`
width: 100%;
height: 100%;
border: 1px solid blue;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
`

