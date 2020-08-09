import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import ReactPlayer from "react-player"

import blueBG from '../../assets/circle blues/circle-blues.png';
import StyledButton from '../StyledButton';

const Home = () => {
  // const settings = useSelector((state) => state.settings);
  const [refreshedWindow, setReshreshedWindow] = React.useState(window);
  const userInfo = useSelector((state) => state.userInfo);
  window.YTConfig = {
    host: 'https://www.youtube.com' 
  }

  return (
    <Wrapper>
      <h1
      style={{padding:"50px"}}
      >
        {!userInfo.user ? (
          "Welcome to Blue Shark's Billiards"
        ) : (
          `Welcome back ${userInfo.user.userName}`
        )}
      </h1>
      <RowDiv>
        <Column
        colNum = '1'
        >
          <h3>
            Please make an account to play against other shark-shooters remotely.
          </h3>
          <Note>
            note: multi-player play has yet to be completed
          </Note>
          <h3>
            Or enjoy local play without an account.
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
          height = {'200px'}
          width = {'356px'}
          url="https://youtu.be/M1SxJ5DfHD4"
          />          
        </Column>
        <Column
        colNum = '2'
        >
          <h3>
            Curious how to play pool?  See below rules:
          </h3>
          <ReactPlayer
          height = {'200px'}
          width = {'356px'}
          url="https://www.youtube.com/watch?v=eDKt-kaOtGE"
          />
          <br/>
          <ReactPlayer
          height = {'200px'}
          width = {'356px'}
          url="https://www.youtube.com/watch?v=HOgFBLlk2aI"
          />
        </Column>

      </RowDiv>
      
    </Wrapper>
  )
}
export default Home;
const Note = styled.h5`
  color: crimson;
`
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
  @media screen and (max-width: 1100px) {
    border-radius: ${props => props.colNum === '1' ? '25px 25px 0 0' : '0 0 25px 25px'};
  }
  @media screen and (max-width: 700px) {
    width: 400px;
  }
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
padding-left: 40px;
`