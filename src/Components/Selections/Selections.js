import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

import {
  changeTableSize,
  addBalls,
  changeGameType,
  setGameStatusFirstShot,
  quitGame,
  removeCurrentGame,
  logUserOut,
  joinGameSuccess
} from "../../actions";

// import { SettingsContext } from '../../SettingsContext';

import StyledButton from '../StyledButton';

const Selections = ({isSliding}) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const [href, setHref] = React.useState('');
  React.useEffect(()=>{
    setHref(window.location.href);
  },[window.location.href])

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
    let player1 = "player1";
    if (userInfo.user) player1 = userInfo.user.userName;
    if (text === "eight") {
      dispatch(joinGameSuccess(
        {
          activePlayer: "player1",
          gameWinner: null,
          player1 : {
            name: player1,
            ballType: null,
            ballsSunk: [],
          },
          player2 : {
            name: "player2",
            ballType: null,
            ballsSunk: [],
          }
        }
      ));
    }
    if (text === "nine") {
      dispatch(joinGameSuccess(
        {
          player1Name: player1,
          player1GameInfo: {
            ballsSunk: [],
            numberOfShots: 0,
            activePlayer: true
          }
        }
      ));
    }
    dispatch(setGameStatusFirstShot());
  }
  const handleQuit = () => {
    dispatch(quitGame());
    dispatch(removeCurrentGame());
  }
  let disabled = false;
  // if (!(settings.status === 'idle' || settings.status === 'error')) disabled = true;
  // if (!(userInfo.status === 'idle' || userInfo.status === 'error')) disabled = true;
  // if (!(billiards.status === 'idle' || billiards.status === 'error')) disabled = true;

  // console.log(window.location.href.includes('home'));

  return (
    <Wrapper>
      {settings.gameOn ? (
        <>
          <StyledNavLink to="/">
            <StyledButton
            handleClick = {handleQuit}
            disabled = {disabled}
            >
              QUIT GAME
            </StyledButton>
          </StyledNavLink>
          <StyledButton
          handleClick = {handleClick}
          disabled = {disabled}
          value = "narrow"
          selected = {settings.tableSize === 'narrow'}
          >
            Size: Narrow
          </StyledButton>
          <StyledButton
          handleClick = {handleClick}
          disabled = {disabled}
          value = "medium"
          selected = {settings.tableSize === 'medium'}
          >
            Size: Medium
          </StyledButton>
          <StyledButton
          handleClick = {handleClick}
          disabled = {disabled}
          value = "full"
          selected = {settings.tableSize === 'full'}
          >
            Size: Large
          </StyledButton>
        </>
      ) : (
        <>
          {!href.includes('home') &&
            <StyledNavLink to="/">
              <StyledButton
              handleClick = {() => {setHref('home')}}
              >
                HOME
              </StyledButton>
            </StyledNavLink>
          }
          {userInfo.user ? (
            <>
            <StyledNavLink to="/home">
              <StyledButton
              handleClick = {() => {setHref('home');dispatch(logUserOut())}}
              // disabled = {}
              >
                LOGOUT
              </StyledButton>
            </StyledNavLink>
            {!href.includes('account') &&
              <StyledNavLink to="/view-account">
                <StyledButton
                handleClick = {() => {setHref('view-account')}}
                // disabled = {}
                >
                  VISIT YOUR CABIN
                </StyledButton>
              </StyledNavLink>
            }
            </>
          ) : (
            !href.includes('login') &&
              <StyledNavLink to="/login">
                <StyledButton
                handleClick = {() => {setHref('login')}}
                // disabled = {}
                >
                  GO TO LOGIN
                </StyledButton>
              </StyledNavLink>
          )}
          {!href.includes('view-lobby') && userInfo.user &&
            <StyledNavLink to="/view-lobby">
              <StyledButton
              handleClick = {() => {setHref('view-lobby')}}
              >
                FIND MATES
              </StyledButton>
            </StyledNavLink>
          }
          <StyledNavLink to="/billiards">
            <StyledButton
            handleClick = {() => handleClickBallMaker("eight")}
            disabled = {disabled}
            >
              Hotseat - Eight
            </StyledButton>
          </StyledNavLink>
          <StyledNavLink to="/billiards">
            <StyledButton
            handleClick = {() => handleClickBallMaker("nine")}
            disabled = {disabled}
            >
              Single - Nine
            </StyledButton>
          </StyledNavLink>
          <StyledNavLink to="/billiards">
            <StyledButton
            handleClick = {() => handleClickBallMaker("test")}
            disabled = {disabled}
            >
              Experiment
            </StyledButton>
          </StyledNavLink>
        </>
      )}
    </Wrapper>
  )
}
export default Selections;
const StyledNavLink = styled(NavLink)`
  width: 100px;
`
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