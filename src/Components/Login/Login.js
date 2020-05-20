import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';

import blueBG from '../../assets/circle blues/circle-blues.png';
import StyledButton from '../StyledButton';

import {
  requestUserInfo,
  receiveUserInfo,
  receiveUserInfoError,
  requestCreateNewUser,
} from "../../actions";

const Login = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  
  if (userInfo.user) {
    return (
      <Redirect to="/home" />
    )
  }

  const handleLogin = () => {
    if (!userName || !password) return;
    dispatch(requestUserInfo());
    // console.log('userName',userName,'password',password)
    fetch('/be/logIn', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userName: userName,
        password: password 
      }),
    }).then((res) => {
      // console.log('respresprespresprespresp',resp)
      if (res.status === 200) {
        res.json().then((data) => {
          // console.log(userData, "IM IN USERDATA LOGGED IN");
          let userInfo = {
            userName: data.user.userName,
            dubloons: data.user.dubloons,
            gameHistory: data.user.gameHistory,
            inventory: data.user.inventory,
            accumulatedWealth: data.user.accumulatedWealth
          };
          dispatch(receiveUserInfo(userInfo));
        });
      } else if (res.status === 404) {
        console.log('res',res);
        dispatch(receiveUserInfoError());
        setErrorMessage("The Captain's log shows no records of your prescence - stowaway?");
        setTimeout(()=>{setErrorMessage(null)}, 2000)
      } else if (res.status === 400) {
        dispatch(receiveUserInfoError());
        setErrorMessage("The Captain's log is in disagreement with your credentials.");
        setTimeout(()=>{setErrorMessage(null)}, 2000)
      } else {
        setErrorMessage("The Captain is confused - please try again.");
        setTimeout(()=>{setErrorMessage(null)}, 2000)
        console.log("Server error");
      }
    })
  }


  const handleNewAccount = () => {
    if (newPassword !== newPassword2 || !newPassword2 || !newUserName) return;
    dispatch(requestCreateNewUser());
    fetch('/be/createAccount', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userName: newUserName,
        password: newPassword 
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          let userInfo = {
            userName: data.user.userName,
            dubloons: data.user.dubloons,
            gameHistory: data.user.gameHistory,
            inventory: data.user.inventory,
            accumulatedWealth: data.user.accumulatedWealth
          };
          dispatch(receiveUserInfo(userInfo));
        });
      } else if (res.status === 404) {
        console.log('res',res);
        dispatch(receiveUserInfoError());
        setErrorMessage("The Captain's log shows no records of your prescence - stowaway?");
        setTimeout(()=>{setErrorMessage(null)}, 2000)
      } else if (res.status === 400) {
        dispatch(receiveUserInfoError());
        setErrorMessage("The Captain's log is in disagreement with your credentials.");
        setTimeout(()=>{setErrorMessage(null)}, 2000)
      } else {
        setErrorMessage("The Captain is confused - please try again.");
        setTimeout(()=>{setErrorMessage(null)}, 2000)
        console.log("Server error");
      }
    })
  }

  return (
    <Wrapper>
      {/* <div/> */}
      <Column>
        username
        <StyledInput onChange = {(ev)=>{setUserName(ev.target.value)}} value = {userName} type = "textfield"/>
        <br/>
        password
        <StyledInput onChange = {(ev)=>{setPassword(ev.target.value)}} value = {password} type = "password"/>
        <br/>
        <StyledButton
        handleClick = {handleLogin}
        disabled = {!password || !userName || errorMessage}
        >
          LOGIN
        </StyledButton>
      </Column>

      <Column>
        {errorMessage &&
          <ErrorBox>
            {errorMessage}
          </ErrorBox>
        }
      </Column>

      <Column>
        username
        <StyledInput onChange = {(ev)=>{setNewUserName(ev.target.value)}} value = {newUserName} type = "textfield"/>
        <br/>
        password
        <StyledInput onChange = {(ev)=>{setNewPassword(ev.target.value)}} value = {newPassword} type = "password"/>
        <br/>
        password again
        <StyledInput onChange = {(ev)=>{setNewPassword2(ev.target.value)}} value = {newPassword2} type = "password"/>
        <br/>
        <StyledButton
        handleClick = {handleNewAccount}
        disabled = {!newPassword || !newPassword2 || !newUserName || errorMessage || newPassword !== newPassword2}
        >
          CREATE ACCOUNT
        </StyledButton>
      </Column>

      {/* <div/> */}
    </Wrapper>
  )
}
export default Login;

const StyledInput = styled.input`


`
const ErrorBox = styled.div`
  border: red dashed 3px;
  width: 200px;
  color: red;
  font-weight: bolder;
  font-size: 1.2em;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
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
flex-direction: row;
justify-content: space-evenly;
align-items: center;
text-align: center;
padding: 0 50px;
@media screen and (max-width: 750px) {
  flex-direction: column;
}
`