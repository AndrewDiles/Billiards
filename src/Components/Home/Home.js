import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import ReactPlayer from "react-player"

import blueBG from '../../assets/circle blues/circle-blues.png';
import StyledButton from '../StyledButton';

const Home = () => {
  // const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  window.YTConfig = {
    host: 'https://www.youtube.com' 
  } 
  // if (userInfo.user){
  // console.log('userInfo.user',userInfo.user)
  // console.log('userInfo.user.userName',userInfo.user.userName)
  // }

  return (
    <Wrapper>
      <h1>
        {!userInfo.user ? (
          "Welcome to Blue Shark's Billiards"
        ) : (
          `Welcome back ${userInfo.user.userName}`
        )}
      </h1>
      <RowDiv>
        <Column>
          <h3>
            Please make an account to play against other shark-shooters remotely.
          </h3>
          <h3>
            Or enjoy local player without an account.
          </h3>
          {/* <h3/></h3> */}
          {!userInfo.user ? (
            <NavLink to="/login">
              <StyledButton
              handleClick = {() => {}}
              // disabled = {}
              >
                GO TO LOGIN
              </StyledButton>
            </NavLink>
          ) : (
            <>
              <NavLink to="/view-account">
                <StyledButton
                handleClick = {() => {}}
                // disabled = {}
                >
                  HEAD TO YOUR CABIN
                </StyledButton>
              </NavLink>
              <NavLink to="/view-lobby">
                <StyledButton
                handleClick = {() => {}}
                // disabled = {}
                >
                  FIND MATES
                </StyledButton>
              </NavLink>
            </>
          )}
          <h3>
            Curious how to use this GUI?  See below for instructions:
          </h3>
          <ReactPlayer
          height = {'300px'}
          width = {'533px'}
          url="https://youtu.be/08cdUCacaHI"
          />          
        </Column>
        <Column>
          <h3>
            Curious how to play pool?  See below rules:
          </h3>
          <ReactPlayer
          height = {'300px'}
          width = {'533px'}
          url="https://www.youtube.com/watch?v=eDKt-kaOtGE"
          />
          {/* <br></br> */}
          <ReactPlayer
          height = {'300px'}
          width = {'533px'}
          url="https://www.youtube.com/watch?v=HOgFBLlk2aI"
          />
        </Column>


      </RowDiv>
      
    </Wrapper>
  )
}
export default Home;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  background-color: rgba(255,255,255,0.05);
  border-radius: 25px;
  margin: 0 2%;
  min-height: 700px;
  width: 600px;
  padding: 15px;
`
const RowDiv = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
`