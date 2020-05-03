import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import ReactPlayer from "react-player"

import blueBG from '../../assets/circle blues/circle-blues.png';
import StyledButton from '../StyledButton';

const Account = () => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  
  if (!userInfo.user) {
    return (
      <Redirect to="/logIn" />
    )
  }

  return (
    <Wrapper>
      <h1>
        Account Screen
      </h1>
      
      
    </Wrapper>
  )
}
export default Account;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
`
const RowDiv = styled.div`
  display:flex;
  flex-direction: row;
`
const Wrapper = styled.div`
color: linen;
/* background-color: lightgray; */
background-image: url(${blueBG});
/* top:0;
left: 0; */
min-width: 100vw;
min-height: 100vh;
/* position: static; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
`

