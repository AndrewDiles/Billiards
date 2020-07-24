import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

import {
  requestJoinGame,
  joinGameSuccess,
  joinGameError,
} from "../../actions";


const JoinLobbyButton = ({ gameInfo, setLobbyGames, lobbyGames, currentTime, playerNumber }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [joinLobbyMessage, setJoinLobbyMessage] = React.useState(null);
  const dispatch = useDispatch();

  let handleClick = () => {
    dispatch(requestJoinGame());
    let playerToAdd = userInfo.user.userName;
    let playerToAddWealth = userInfo.user.accumulatedWealth;
    let existingPlayerInLobby;
    let slotToAddNewPlayerInto = playerNumber;
    if (playerNumber === "Player1") {
      existingPlayerInLobby = gameInfo.Player2;
    }
    else if (playerNumber === "Player2") {
      existingPlayerInLobby = gameInfo.Player1;
    }

    // let player2Name = userInfo.user.userName;
    // let player2Wealth = userInfo.user.accumulatedWealth;
    fetch('/be/lobby/join', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        playerToAdd,
        playerToAddWealth,
        existingPlayerInLobby,
        slotToAddNewPlayerInto,

        // player1: gameInfo.Player1,
        // player2: player2Name,
        // player2Wealth: player2Wealth,
      }),
    }).then((res) => {
      if (res.status === 200) {
        let newGameInfo = {...gameInfo};
        let replacementLobbyGames = [...lobbyGames];
        if (slotToAddNewPlayerInto === "Player2") {
        newGameInfo.Player2 = userInfo.user.userName;
        newGameInfo.Player2Wealth = userInfo.user.accumulatedWealth;
        replacementLobbyGames.Player2 = newGameInfo.Player2;
        replacementLobbyGames.Player2Wealth = newGameInfo.Player2Wealth;
        }
        else if (slotToAddNewPlayerInto === "Player1") {
          newGameInfo.Player1 = userInfo.user.userName;
          newGameInfo.Player1Wealth = userInfo.user.accumulatedWealth;
          replacementLobbyGames.Player1 = newGameInfo.Player1;
          replacementLobbyGames.Player1Wealth = newGameInfo.Player1Wealth;
        }
        dispatch(joinGameSuccess({
          newGameInfo : newGameInfo,
        }));
        
        setLobbyGames(replacementLobbyGames);
      } else {
        console.log('res from join lobby game',res);
        dispatch(joinGameError());
        setJoinLobbyMessage(res.error);
        setTimeout(()=> {setJoinLobbyMessage(null)}, 3000);
      }
    })
  }

  let disabled = userInfo.currentGame || joinLobbyMessage !== null;

  return (
    <Wrapper>
      <h4>
        Wait: {Math.floor((currentTime - gameInfo.timeOpened)/1000)}s
      </h4>
      {joinLobbyMessage !== null ? (
        <h5>
        {joinLobbyMessage}
        </h5>
      ): (
        userInfo.user && gameInfo.Player1 === userInfo.user.userName ? (
          'WAITING FOR OPPONENT'
        ) : (
          <StyledButton
          handleClick = {handleClick}
          disabled = {disabled}
          >
            JOIN
          </StyledButton>
        )
      )}
      
    </Wrapper>
  )
}
export default JoinLobbyButton;



const Wrapper = styled.div`
width: 40%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
`