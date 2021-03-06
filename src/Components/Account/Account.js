import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';

import blueBG from '../../assets/circle blues/circle-blues.png';

import Stash from './Stash';
import GameHistory from './GameHistory';

const Account = () => {
  const userInfo = useSelector((state) => state.userInfo);
  
  if (!userInfo.user) {
    return (
      <Redirect to="/logIn" />
    )
  }

  return (
    <Wrapper>
      <Styledh1>
        Welcome to your cabin, {userInfo.user.userName}!
      </Styledh1>
      <CabinContent>
        <Column>
          <Stash/>
        </Column>
        <Column>
          <GameHistory/>
        </Column>
      </CabinContent>
    </Wrapper>
  )
}
export default Account;
const Styledh1 = styled.h1`
  font-weight: bolder;
  @media screen and (max-width: 1100px) {
    margin-left: 100px;
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 50%; */
  width: 500px;
  align-items: center;
  border: white 1px solid;
  background-color: rgba(255,255,255,0.05);
  border-radius: 25px;
  @media screen and (max-width: 1100px) {
    margin-top: 25px;
    margin-left: 50px;
  }
  @media screen and (max-width: 700px) {
    width: 500px;
    margin-top: 10px;
    margin-left: 30px;
  }
  @media screen and (max-width: 550px) {
    width: 325px;
  }
`
const CabinContent = styled.div`
  display:flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: top;
  text-align: center;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
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
padding-left: 40px;
@media screen and (max-width: 700px) {
    padding-left: 0;
  }
`

