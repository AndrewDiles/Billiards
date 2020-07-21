import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  beginBallMotion,
  updateBalls,
  // endBallMotion,  // obsolete
  finalizeBallMotion,
  // removeBall,  // obsolete
  setBallInHand,
  freeMoveCueBallWhiteSunk,
  setGameStatusFreeMove,
  setGameStatusIdle,
  setGameWinnerEightBall,
  setGameWinnerNineBall,
  changeActivePlayer,
  setObjectives,
  setGameStatusAwaitingChoice,
  addToSunkBalls,
  addToShotTotal,
  // incrementNumberOfShots, // obsolete
  returnBallsToTable,
  addSunkBalls,
  requestAddGameToHistory,
  addGameToHistorySuccess,
  addGameToHistoryError,

} from "../../actions";
import useInterval from '../../Hooks/use-interval';

import felt from '../../assets/pool_table/pool_table.png';
import { tableSizes } from '../../Constants/tableSizes';

import { TableMemo } from './TableMemo/TableMemo';
import Ball from './Balls';

// z-index guide:
// table: default, 0, as objects will be children of it
// pockets: 2
// balls / rail: 4
// objects on rail: 6
// cue: 8
// GUI elements: 10

const Table = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const billiards = useSelector((state) => state.billiards);
  const userInfo = useSelector((state) => state.userInfo);
  const [startTime, setStartTime] = useState(false);

  useInterval(() => {
    // console.log('useInterval function begins');
    if (!(billiards.status === 'just-struck' || billiards.status === "in-motion")) {
      return;
    }
    else if (billiards.status === 'just-struck') {
      // console.log('Cue strike landed')
      // console.log('billiards.status',billiards.status);
      setStartTime(Date.now())
      dispatch(beginBallMotion());
      update();
      return;
    }
    else {
      // console.log('billiards.status',billiards.status);
      if (Date.now() - startTime >= settings.refreshRate) {
        setStartTime(Date.now())
        update();
      }
    }
  }, settings.refreshRate);

  const setGameWinner = () => {
    if (userInfo.currentGame.activePlayer === 'player1') {
      dispatch(setGameWinnerEightBall('player2'));
      return;
    }
    else {
      dispatch(setGameWinnerEightBall('player1'));
      return;
    }
  }

  const nonActivePlayerWins = () => {
    setGameWinner();
    // if player is logged in, add game's record to their history and reward them dubloons
    if (userInfo.user) {
      let gameInfo = {
        type: "eight",
        opponent: "hot-seat",
        result: `Completed`,
        reward: 25,
        date: Date(),
      }
      dispatch(requestAddGameToHistory());

      fetch('/be/game/gameOver', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userName: userInfo.user.userName,
          gameInfo: gameInfo, 
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            dispatch(addGameToHistorySuccess(data.userInfo));
          });
        } else {
          console.log('error: res',res);
          dispatch(addGameToHistoryError());
        }
      })
    }
    setGameWinner();
  }
  const endTurnChangePlayerFreeMove = () => {
    dispatch(finalizeBallMotion());
    dispatch(changeActivePlayer());
    dispatch(setBallInHand());
    dispatch(setGameStatusFreeMove());
  }
  const endTurnChangePlayerWhiteSunk = () => {
    dispatch(finalizeBallMotion());
    dispatch(changeActivePlayer());
    dispatch(setBallInHand());
    dispatch(freeMoveCueBallWhiteSunk());
    dispatch(setGameStatusFreeMove());
  }

  const update = () => {
    if (billiards.status === 'idle' || billiards.status === "free-move") return;
    if (settings.gameType !== 'test' && userInfo.currentGame.gameWinner) return;
    
    // Verify if balls are still moving
    let stillMotion = false;
    billiards.billiards.forEach((billiard)=>{
      if (billiard.inMotion) stillMotion = true;
    })
    
    // Case 1: motion is ongoing, so keep updating the balls until there is no motion
    if (stillMotion) {
        dispatch(updateBalls(settings));
        return;
    }
    // Case 2: motion has ceased, up date balls Sunk, test for game loss conditions, change player, etc
    else {
      // Case 2.1: Eightball
      if (settings.gameType === 'eight') {
        // Establish shot's outcome:
        // Test if the shot was a foul
        let foul = false;
        // See if players have designated ball types and set foul according to first contact
        if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "solids") {
          if (billiards.billiards[0].firstCollision > 8 || !billiards.billiards[0].firstCollision ||
            ( billiards.billiards[0].firstCollision === 8 && userInfo.currentGame[userInfo.currentGame.activePlayer].ballsSunk.length !== 7 )
            ) foul = true;
        }
        else if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "stripes") {
          if (billiards.billiards[0].firstCollision < 8 || !billiards.billiards[0].firstCollision ||
            ( billiards.billiards[0].firstCollision === 8 && userInfo.currentGame[userInfo.currentGame.activePlayer].ballsSunk.length !== 7 )
            ) foul = true;
        }
        // If no designated ball types, then foul on scratch or no ball contact
        else if (billiards.billiards[0].firstCollision === 8 || !billiards.billiards[0].firstCollision) foul = true;

        // See if white or 8 were sunk.  Separate balls sunk into newly sunk and sunk balls that are accounted for
        let allBallsEverSunk = [];
        let whiteSunk = false;
        let eightSunk = false;
        // All balls with sinkingSize === 0 have sunk (at some point)
        billiards.billiards.forEach((billiard, index) => {
          if (billiard.sinkingSize <= 0) {
            if (billiard.id === "cue") {
              whiteSunk = true;
              foul = true;
            }
            else {
              allBallsEverSunk.push(billiard.id);
              if (billiard.id === 8) eightSunk = true;
            }
          }
        })
        // Remove balls that have already been attributed to players to find the new balls that have been sunk
        let newlySunkBalls = [...allBallsEverSunk];
        userInfo.currentGame.player1.ballsSunk.forEach((ball) => {
          newlySunkBalls.forEach((newBall, index) => {
            if (newBall === ball) {
              newlySunkBalls.splice(index, 1);
            }
          })
        })
        userInfo.currentGame.player2.ballsSunk.forEach((ball) => {
          newlySunkBalls.forEach((newBall, index) => {
            if (newBall === ball) {
              newlySunkBalls.splice(index, 1);
            }
          })
        })

        // Case no balls were hit
        // Case player was shooting at the 8 ball, game foul => game loss
        if (foul && userInfo.currentGame[userInfo.currentGame.activePlayer].ballsSunk.length === 7) {
          console.log('Game foul while trying to sink the 8 ball, game loss');
          nonActivePlayerWins();




          return;
        }
        // Case foul, but no game loss
        else if ((!billiards.billiards[0].firstCollision) && !settings.ballInHand && !whiteSunk) {
          console.log('No balls hit, game foul');
          endTurnChangePlayerFreeMove();
          return;
        }
        else if ((!billiards.billiards[0].firstCollision) && !settings.ballInHand && whiteSunk) {
          console.log('No balls hit and scratch, game foul');
          endTurnChangePlayerWhiteSunk();
          return;
        }
        // Begin testing for end game conditions
        
        // Case no balls were sunk
        if (newlySunkBalls.length === 0) {
          // Case no-scratch and a ball was hit
          if (!whiteSunk && billiards.billiards[0].firstCollision  && billiards.billiards[0].firstCollision !== 8) {
            console.log('No new balls were sunk, change active player');
            dispatch(finalizeBallMotion());
            dispatch(changeActivePlayer());
            dispatch(setGameStatusIdle());
            return;
          }
          // Case no-scratch but no ball was hit
          else if (!whiteSunk && (!billiards.billiards[0].firstCollision || billiards.billiards[0].firstCollision === 8 )) {
            console.log('No new balls were sunk, and game foul (illegal-contact), change active player');
            endTurnChangePlayerFreeMove();
            return;
          }
          // Case scratch
          else {
            console.log('No new balls were sunk, and game foul (scratch), change active player');
            endTurnChangePlayerWhiteSunk();
            return;
          }
        }
        // Case one ore more new balls were sunk
        else {
          // Test for end game
          if (eightSunk) {
            // Sinking the eight ball means you lose if you scratched or commited a foul (no contact already handled)
            if (whiteSunk || 
              userInfo.currentGame[userInfo.currentGame.activePlayer].ballsSunk.length !== 7 || 
              billiards.billiards[0].firstCollision !== 8
            ) {
              console.log('8 sunk illegally, game loss for active player');
              nonActivePlayerWins();
            }
            // If none of the above criteria are met, then the player wins
            else {
              console.log('8 sunk legally, active player wins');
              dispatch(setGameWinnerEightBall(userInfo.currentGame.activePlayer));

              // if player is logged in, add game's record to their history and reward them dubloons
              if (userInfo.user) {
                let gameInfo = {
                  type: "eight",
                  opponent: "hot-seat",
                  result: `Completed`,
                  reward: 25,
                  date: Date(),
                }
                dispatch(requestAddGameToHistory());

                fetch('/be/game/gameOver', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ 
                    userName: userInfo.user.userName,
                    gameInfo: gameInfo, 
                  }),
                }).then((res) => {
                  if (res.status === 200) {
                    res.json().then((data) => {
                      dispatch(addGameToHistorySuccess(data.userInfo));
                      dispatch(setGameWinnerEightBall(userInfo.currentGame.activePlayer));
                    });
                  } else {
                    console.log('error: res',res);
                    dispatch(addGameToHistoryError());
                  }
                })
              }
            }
          } // End Case eight was sunk
          // Balls were sunk, and the game is not ending.
          // Step 1 : sort the balls into sunk stripes and solids
          let solidsSunk = [];
          let stripesSunk = [];
          newlySunkBalls.forEach((ball)=>{
            if (ball < 8) solidsSunk.push(ball);
            else stripesSunk.push(ball);
          })
          // Step 2:  test if players have declared ball types (stripes / solids)
          // Case players do not have declared ball types
          if (!userInfo.currentGame[userInfo.currentGame.activePlayer].ballType) {
            // Sub-case active player is given the choice
            if (solidsSunk.length > 0 && stripesSunk.length > 0 && !whiteSunk) {
              console.log('active player sunk both stripes and solids and did not scratch, choose ball type');
              dispatch(finalizeBallMotion());
              dispatch(setGameStatusAwaitingChoice());
              return;
            }
            // Sub-case active player is forced to sink solids
            else if (solidsSunk.length > 0 && !whiteSunk) {
              console.log('active player sunk only solids, retain turn');
              dispatch(setObjectives(userInfo.currentGame.activePlayer, "solids"));
              dispatch(finalizeBallMotion());
              dispatch(setGameStatusIdle());
              dispatch(addToSunkBalls(solidsSunk, stripesSunk));
              return;
            }
            // Sub-case active player is forced to sink stripes
            else if (stripesSunk.length > 0 && !whiteSunk){
              console.log('active player sunk only stripes, retain turn');
              dispatch(setObjectives(userInfo.currentGame.activePlayer, "stripes"));
              dispatch(finalizeBallMotion());
              dispatch(setGameStatusIdle());
              dispatch(addToSunkBalls(solidsSunk, stripesSunk));
              return;
            }
          } // End case players do not have declared ball Types
          // Case players have declared ball types
          else {
            // add the sunk balls to the players' arrays regardless of whose turn it will be
            dispatch(addToSunkBalls(solidsSunk, stripesSunk));
            // Case foul ( scratch and incorrect first contact ), change players and switch free move on
            if (foul && whiteSunk) {
              console.log('scratch - change active player');
              endTurnChangePlayerWhiteSunk();
              return;
            }
            // Case foul ( no scratch, incorrect first contact ), change players and switch free move on
            else if (foul && !whiteSunk) {
              console.log('foul - change active player');
              endTurnChangePlayerFreeMove();
              return;
            }
            // Case balls were sunk, players have types, shot was legal, test if the player sunk at last one of their own ball
            else {
              if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "solids") {
                // Case they only sunk the wrong balls
                if (solidsSunk.length === 0) {
                  console.log('active player only sunk oppositions ball(s) - change active player');
                  endTurnChangePlayerFreeMove();
                  return;
                }
                // Case a legal, productive, turn, player retains their turn
                else {
                  console.log('nice shot, retain turn');
                  dispatch(finalizeBallMotion());
                  dispatch(setGameStatusIdle());
                  return;
                }
              }
              else if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "stripes") {
                // Case they only sunk the wrong balls
                if (stripesSunk.length === 0) {
                  console.log('active player only sunk oppositions ball(s) - change active player');
                  endTurnChangePlayerFreeMove();
                  return;
                }
                // Case a legal, productive, turn, player retains their turn
                else {
                  console.log('nice shot, retain turn')
                  dispatch(finalizeBallMotion());
                  dispatch(setGameStatusIdle());
                  return;
                }
              }
            }
          }
        }
      } // End of 8 ball update
      // Case 2.2: Nineball
      else if (settings.gameType === 'nine') {

        // Regardless of outcome, numberOfShots will be increased by clicking shoot button

        // Determine is object ball was hit first
        let foul = false;
        let targetBallNumber = 1;
        for(let i=0; i<userInfo.currentGame.player1GameInfo.ballsSunk.length; i++) {
          if (userInfo.currentGame.player1GameInfo.ballsSunk[i] === targetBallNumber) {
            targetBallNumber ++;
            i = -1;
          }
        }
        if (targetBallNumber !== billiards.billiards[0].firstCollision) {
          foul = true;
          if (!billiards.billiards[0].firstCollision) {
            console.log('Foul - no ball hit.')
          }
          else {
            console.log('Foul - incorrect first contact.  Cue hit ', billiards.billiards[0].firstCollision, ' ball and should have hit the ', targetBallNumber);
          }
        }

        // See if white or 9 were sunk.  Separate balls sunk into newly sunk and sunk balls that are accounted for
        let allBallsEverSunk = [];
        let whiteSunk = false;
        let nineSunk = false;
        // All balls with sinkingSize === 0 have sunk (at some point)
        billiards.billiards.forEach((billiard, index) => {
          if (billiard.sinkingSize <= 0) {
            if (billiard.id === "cue") {
              whiteSunk = true;
            }
            else {
              allBallsEverSunk.push(billiard.id);
              if (billiard.id === 9) nineSunk = true;
            }
          }
        })
        // Remove balls that have already been counted as sunk to find the new balls that have been sunk
        let newlySunkBalls = [...allBallsEverSunk];
        userInfo.currentGame.player1GameInfo.ballsSunk.forEach((ball) => {
          newlySunkBalls.forEach((newBall, index) => {
            if (newBall === ball) {
              newlySunkBalls.splice(index, 1);
            }
          })
        })

        // console.log('foul', foul)
        // console.log('whiteSunk', whiteSunk)
        // console.log('nineSunk', nineSunk)
        // console.log('allBallsEverSunk',allBallsEverSunk)
        // console.log('newlySunkBalls',newlySunkBalls)

        // Regardless of impending game state, numberOfShots will be increased as a penalty if the white ball was sunk
        if (whiteSunk) dispatch(addToShotTotal());

        // Cases 2.2.1: no balls were hit - reset game status
        if (!billiards.billiards[0].firstCollision) {
          // Sub case 2.2.1.1: white sunk - return white ball, etc
          if (whiteSunk) {
            dispatch(finalizeBallMotion());
            dispatch(setBallInHand());
            dispatch(freeMoveCueBallWhiteSunk());
            dispatch(setGameStatusFreeMove());
          }
          // Sub case 2.2.1.2: no scratch - reset game status
          else {
            dispatch(finalizeBallMotion());
            dispatch(setGameStatusIdle());
          }
        }
        // Cases 2.2.2: illegal first ball hit
        else if (foul && whiteSunk) {
          // Sub case 2.2.2.1: white sunk - return white ball, put ball in hand, return sunk balls, return sunk balls, reset game status
          if (newlySunkBalls.length > 0) dispatch(returnBallsToTable(newlySunkBalls));
          dispatch(finalizeBallMotion());
          dispatch(setBallInHand());
          dispatch(freeMoveCueBallWhiteSunk());
          dispatch(setGameStatusFreeMove());
        }
        // Sub case 2.2.2.2: foul no white sunk - return sunk balls, return sunk balls, reset game status
        else if (foul) {
          if (newlySunkBalls.length > 0) dispatch(returnBallsToTable(newlySunkBalls));
          dispatch(finalizeBallMotion());
          dispatch(setGameStatusIdle());
        }
        // Cases 2.2.3: legal strike
        // Sub cases 2.2.3.1: no balls sunk
        else if (newlySunkBalls.length === 0) {
          // Sub sub case 2.2.3.1.1: whiteSunk - ball in hand, etc
          if (whiteSunk) {
            dispatch(finalizeBallMotion());
            dispatch(setBallInHand());
            dispatch(freeMoveCueBallWhiteSunk());
            dispatch(setGameStatusFreeMove());
          }
          // Sub sub case 2.2.3.1.2: no scratch - reset gameStatus
          else {
            dispatch(finalizeBallMotion());
            dispatch(setGameStatusIdle());
          }
        }
        // Sub cases 2.2.3.2: balls sunk
        else if (newlySunkBalls.length > 0) {
          // Sub sub case 2.2.3.2.1: Nine ball sunk
          if (nineSunk) {
            dispatch(setGameWinnerNineBall());
            // if player is logged in, add game's record to their history and reward them dubloons
            if (userInfo.user) {
              let gameInfo = {
                type: "nine",
                opponent: null,
                result: `win${userInfo.currentGame.player1GameInfo.numberOfShots}`,
                reward: 50,
                date: Date(),
              }
              dispatch(requestAddGameToHistory());
              fetch('/be/game/gameOver', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                  userName: userInfo.user.userName,
                  gameInfo: gameInfo, 
                }),
              }).then((res) => {
                if (res.status === 200) {
                  res.json().then((data) => {
                    dispatch(addGameToHistorySuccess(data.userInfo));
                    dispatch(setGameWinnerNineBall());
                  });
                } else {
                  console.log('error: res',res);
                  dispatch(addGameToHistoryError());
                }
              })
            }
            else dispatch(setGameWinnerNineBall());
          }
          // Sub sub case 2.2.3.2.2: white sunk
          else if (whiteSunk) {
            dispatch(addSunkBalls(newlySunkBalls));
            dispatch(finalizeBallMotion());
            dispatch(setBallInHand());
            dispatch(freeMoveCueBallWhiteSunk());
            dispatch(setGameStatusFreeMove());
          }
          // Sub sub case 2.2.3.2.3: catch all for no foul, no scratch, no game end and one or more balls sunk
          else {
            dispatch(addSunkBalls(newlySunkBalls));
            dispatch(finalizeBallMotion());
            dispatch(setGameStatusIdle());
          }
        }
      } // End of 9 ball update

      // Case 2.3 Experimentation
      else {
        // put experimental ball back on table if sunk
        if (billiards.billiards[1].sinkingSize !== 1) {
          dispatch(returnBallsToTable([1]));
        }
        dispatch(finalizeBallMotion());
        // put cue ball back on table if sunk
        if (billiards.billiards[0].sinkingSize !== 1) {
          dispatch(setBallInHand());
          dispatch(freeMoveCueBallWhiteSunk());
          dispatch(setGameStatusFreeMove());
        }
        else {
          dispatch(setGameStatusIdle());
        }
      }

    } // End Case motion has ceased
    return
  } // end of update

  return (
    <TableWrapper
    id = {'TableWrapper'}
    // className = {"Table"}
    settings = {settings}
    tableSizes = {tableSizes}
    ballInHand = {settings.ballInHand}
    >
      {settings.ballInHand &&
      <HighIndexTable
      id = {'Table'}
      className = {"Table"}
      settings = {settings}
      tableSizes = {tableSizes}
      ballInHand = {settings.ballInHand}
      />}
      <TableMemo
      settings = {settings}
      />
      {billiards.billiards.map((billiard)=>{
        return (
          <Ball
          key = {billiard && billiard.id}
          billiard = {billiard}
          />
        )
      })}
    </TableWrapper>
  )
}

export default Table;
const TableWrapper = styled.div`
  width: ${props => props.tableSizes[props.settings.tableSize].tableWidth && props.tableSizes[props.settings.tableSize].tableWidth}px;
  height: ${props => props.tableSizes[props.settings.tableSize].tableHeight && props.tableSizes[props.settings.tableSize].tableHeight}px;
  border-radius: ${props => props.tableSizes[props.settings.tableSize].tableBorderRadius && props.tableSizes[props.settings.tableSize].tableBorderRadius}px;
  background: green;
  background-image: url(${felt});
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: fixed;
  transform: ${props => props.settings.tableSize === "narrow" && 'rotate(90deg)'};
  overflow: hidden;
  cursor: ${props => props.ballInHand && 'grabbing'};
`
const HighIndexTable = styled.div`
  width: ${props => props.tableSizes[props.settings.tableSize].tableWidth && props.tableSizes[props.settings.tableSize].tableWidth}px;
  height: ${props => props.tableSizes[props.settings.tableSize].tableHeight && props.tableSizes[props.settings.tableSize].tableHeight}px;
  border-radius: ${props => props.tableSizes[props.settings.tableSize].tableBorderRadius && props.tableSizes[props.settings.tableSize].tableBorderRadius}px;
  position: absolute;
  /* cursor: ${props => props.ballInHand && 'grabbing'}; */
  z-index: 10;
  display: ${props => !props.ballInHand && 'none'};
`