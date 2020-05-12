import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  beginBallMotion,
  updateBalls,
  endBallMotion,
  finalizeBallMotion,
  addToBallsSunkNine,
  removeBall,
  setBallInHand,
  freeMoveCueBallIllegal,
  freeMoveCueBallWhiteSunk,
  setGameStatusFreeMove,
  setGameStatusIdle,
  setGameWinnerEightBall,
  setGameWinnerNineBall,
  changeActivePlayer,
  setObjectives,
  setGameStatusAwaitingChoice,
  addToSunkBalls,

} from "../../actions";
import useInterval from '../../Hooks/use-interval';

import felt from '../../assets/pool_table/pool_table.png';
import { tableSizes, sizeRatios } from '../../Constants/tableSizes';

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
  const [pastSunkBalls, setPastSunkBalls] = useState([]);


  useInterval(() => {
    if (!(billiards.status === 'just-struck' || billiards.status === "in-motion")) {
      return;
    }
    else if (billiards.status === 'just-struck') {
      console.log('Cue strike landed')
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

  const nonActivePlayerWins = () => {
    if (userInfo.currentGame.activePlayer === 'player1') {
      dispatch(setGameWinnerEightBall('player2'));
      return;
    }
    else {
      dispatch(setGameWinnerEightBall('player1'));
      return;
    }
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
    // console.log('billiards.status',billiards.status)
    if (billiards.status === 'idle' || billiards.status === "free-move" || userInfo.currentGame.gameWinner) return;

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
          if (billiards.billiards[0].firstCollision >= 8 || !billiards.billiards[0].firstCollision) foul = true;
        }
        else if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "stripes") {
          if (billiards.billiards[0].firstCollision <= 8 || !billiards.billiards[0].firstCollision) foul = true;
        }
        // If no designated ball types, then foul on scratch or no ball contact
        else if (billiards.billiards[0].firstCollision === 8 || !billiards.billiards[0].firstCollision) foul = true;

        // See if white or 8 were sunk.  Saparate balls sunk into newly sunk and sunk balls that are accounted for
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
            if (newBall = ball) {
              newlySunkBalls.splice(index, 1);
            }
          })
        })
        userInfo.currentGame.player2.ballsSunk.forEach((ball) => {
          newlySunkBalls.forEach((newBall, index) => {
            if (newBall = ball) {
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

      } // End of 9 ball update

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
      {/* BELOW TO BE DELETED */}
      {/* <TestPoint
      settings = {settings}
      top = {6.5}
      left = {144.5}
      >

      </TestPoint> */}
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
// const TestPoint = styled.div`
// top: ${props => props.top * sizeRatios[props.settings.tableSize]}px;
// left: ${props => props.left * sizeRatios[props.settings.tableSize]}px;
// height:5px;
// width:5px;
// position: absolute;
// background-color: blue;
// z-index: 25;
// `

// test results (following are true before application of scaling ratios): 
// right wall impact when left >= 276.5, top>= 23 && top <=140
// left wall impact when left <= 13.5, top>= 23 && top <=140
// bottom wall impact when top >= 149.5 and left >=24 && 137 or left >= 151.5 && 265.5
// top wall impact when top <= 13 and left >=24 && 137 or left >= 151.5 && 265.5
// Corner radius: 7
// TL center: top: 9, left: 9
// TR: top 9, left: 280
// BL: top: 152.5, left: 10
// BR: top: 152.5, left 279
// Side radius: 5.5
// B: top: 155.5 left: 144
// T: top: 6.5 left: 144.5


// original update: 
// const update = () => {
//   console.log('billiards.status',billiards.status)
//   if (billiards.status === 'idle' || billiards.status === "free-move" ) return;

//   // Verify if balls are still moving
//   let stillMotion = false;
//   billiards.billiards.forEach((billiard)=>{
//     if (billiard.inMotion) stillMotion = true;
//   })
  
//   // Case 1: motion is ongoing, so keep updating the balls until there is no motion
//   if (stillMotion) {
//       dispatch(updateBalls(settings));
//       return;
//   }

//   // Case 2: motion is done.  Begin testing:
//   // case no ball was hit, change player turn and set ball in hand
//   else if ((!billiards.billiards[0].firstCollision) && settings.gameType === 'eight' && !settings.ballInHand ) {
//     console.log('1');
//     dispatch(changeActivePlayer());
//     dispatch(setBallInHand());
//     dispatch(setGameStatusFreeMove());
//   }
//     // Has the game ended?  Does the active player need to change?  Is the white ball in hand?  Do we need to change objectives
//   else {
//     // Key balls to consider are white, 8 and 9
//     let newlySunkBalls = [];
//     let whiteSunk = false;
//     let eightSunk = false;
//     let nineSunk = false;
//     // Test all balls and find all balls that have ever sunk
//     billiards.billiards.forEach((billiard, index) => {
//       // console.log('testing sinking size', billiard.sinkingSize)
//       if (billiard.sinkingSize <= 0) {
//         if (billiard.id === "cue") {
//           whiteSunk = true;
//         }
//         else {
//           newlySunkBalls.push(billiard.id);
//           if (billiard.id === 8) eightSunk = true;
//           else if (billiard.id === 9) nineSunk = true;
//           console.log('newlySunkBalls', newlySunkBalls)
//         }
//       }
//     })

//     // newlySunkBalls is now an array that contains the ids of all balls ever sunk minus the white ball

//     // Case: balls were sunk, 
//     if (newlySunkBalls.length>0 || whiteSunk) {

//       newlySunkBalls.forEach((justSunkId, index)=>{
//         // was originally going to remove the balls from the billiards redux state, but renders caused problems
//         // dispatch(removeBall(ball))

//         // verify that the ball has been newly sunk by cross checking against the past sunk balls
//         pastSunkBalls.forEach((pastSunkId)=> {
//           if (justSunkId === pastSunkId) {
//             newlySunkBalls.splice(index, 1);
//           }
//         })
//         // now newlySunkBalls is all the newly sunk balls (minus the cue ball)
//       })
//       // sub-case: no new balls were sunk
//       if ((newlySunkBalls.length === 0)) {
//         console.log("no new balls were sunk:", newlySunkBalls);
//         dispatch(finalizeBallMotion());
//         dispatch(setGameStatusIdle());
//         if (settings.gameType === 'eight') {
//           console.log('2');
//           dispatch(changeActivePlayer());
//         }
//         if (!billiards.billiards[0].firstCollision || whiteSunk) {
//           dispatch(setGameStatusFreeMove());
//           dispatch(setBallInHand());
//           dispatch(freeMoveCueBallWhiteSunk());
//           }
//         // begin doing similar above testing depending on which ball what collided with
//       }
//       // case there were new balls sunk, test for end game conditions
//       else {
//         if (settings.gameType === 'nine') {
//           // test legal shot
//           // if legal shot, non white sunk and nine sunk, game win
//           // if legal shot and not win, update next objective
//           // if not legal shot return balls to table

//           // still need to add game to history
//           // 9-ball game is over, player has won.  Add game win to history, currency and number of shots it took to win.
//           if (nineSunk && settings.gameType === 'nine'
//           // && legalFirstBallHit  // needs to be revised
//           // && !whiteSunk
//           ) {
//             dispatch(setGameWinnerNineBall())
//           }
//         }
//         else if (settings.gameType === 'eight') {
//           let solidsSunk = [];
//           let stripesSunk = [];
//           newlySunkBalls.forEach((ball)=>{
//             if (ball < 8) solidsSunk.push(ball);
//             else stripesSunk.push(ball);
//           })
//           // test end game : 8 sunk or white sunk on eight
//           if (eightSunk) {
//             if (whiteSunk) {
//               //gameLoss
//               if (userInfo.currentGame.activePlayer === 'player1') {
//                 dispatch(setGameWinnerEightBall('player2'));
//               }
//               else {
//                 dispatch(setGameWinnerEightBall('player1'));
//               }
//             }
//               let solidsSunk = [];
//               let stripesSunk = [];
//               newlySunkBalls.forEach((ball)=>{
//                 if (ball < 8) solidsSunk.push(ball)
//                 else stripesSunk.push(ball);
//               })
//               // if player has a ball type then add sunk balls to each players' total
//               if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType) {
//                 if (solidsSunk.length > 0 ) dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//               }
//             if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballsSunk.length !== 7) {
//               //gameLoss
//               if (userInfo.currentGame.activePlayer === 'player1') {
//                 dispatch(setGameWinnerEightBall('player2'));
//               }
//               else {
//                 dispatch(setGameWinnerEightBall('player1'));
//               }
//             }
//             else {
//               //gameWin
//               if (userInfo.currentGame.activePlayer === 'player1') {
//                 dispatch(setGameWinnerEightBall('player1'));
//               }
//               else {
//                 dispatch(setGameWinnerEightBall('player2'));
//               }
//             }
//           }
//           else if (whiteSunk) {
//             // player loses turn
//             console.log('3');
//             dispatch(changeActivePlayer());
//             dispatch(setBallInHand());
//             dispatch(setGameStatusFreeMove());
//             dispatch(freeMoveCueBallWhiteSunk());
//           }
//           // case a ball was sunk and the white was not sunk
//           else {
//             // case beginning of game and player does not have an objective
//             if (!userInfo.currentGame[userInfo.currentGame.activePlayer].ballType) {
//               console.log('NO BALL TYPES FOR OBJECTIVES')
//               console.log('solidsSunk',solidsSunk,'stripesSunk',stripesSunk)
//               // case player given choice
//               if (solidsSunk.length >0 && stripesSunk.length > 0) {
//                 dispatch(finalizeBallMotion());
//                 dispatch(setGameStatusAwaitingChoice());
//               }
//               // case forced to sink solids
//               else if (solidsSunk.length > 0) {
//                 dispatch(setObjectives(userInfo.currentGame.activePlayer, "solids"));
//                 dispatch(finalizeBallMotion());
//                 dispatch(setGameStatusIdle());
//                 dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//               }
//               // case forced to sink stripes
//               else {
//                 dispatch(setObjectives(userInfo.currentGame.activePlayer, "stripes"));
//                 dispatch(finalizeBallMotion());
//                 dispatch(setGameStatusIdle());
//                 dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//               }
//             }
//             // case players have objectives
//             else {
//               let firstBallHit = billiards.billiards[0].firstCollision;
//               let legalHit = false;
//               if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "stripes") {
//                 if (firstBallHit > 8) legalHit = true;
//               }
//               else if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "solids") {
//                 if (firstBallHit < 8) legalHit = true;
//               }
//               else (console.log('Unknown first ball struck error: ', firstBallHit));
//               if (userInfo.currentGame[userInfo.currentGame.activePlayer].ballsSunk.length === 7) {
//                 // This case should have been caught further up
//                 if (firstBallHit === 8) legalHit = true;
//               }
//               // case player legally hit their ball first
//               if (legalHit) {
//                 // case active player is shooting for stripes
//                 if(userInfo.currentGame[userInfo.currentGame.activePlayer].ballType === "stripes") {
//                   // case they didn't sink any of their balls and they lose their turn
//                   if (stripesSunk.length === 0) {
//                     dispatch(finalizeBallMotion());
//                     dispatch(setGameStatusIdle());
//                     dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//                     console.log('4');
//                     dispatch(changeActivePlayer());
//                   }
//                   // case they did sink at least one of their balls and retain their turn
//                   else {
//                     dispatch(finalizeBallMotion());
//                     dispatch(setGameStatusIdle());
//                     dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//                   }
//                 }
//                 // case active player is shooting for solids
//                 else {
//                   if (solidsSunk.length === 0) {
//                     dispatch(finalizeBallMotion());
//                     dispatch(setGameStatusIdle());
//                     dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//                     console.log('5');
//                     dispatch(changeActivePlayer());
//                   }
//                   // case they did sink at least one of their balls and retain their turn
//                   else {
//                     dispatch(finalizeBallMotion());
//                     dispatch(setGameStatusIdle());
//                     dispatch(addToSunkBalls(solidsSunk, stripesSunk));
//                   }
//                 }
//               }
//             } // end case players have objectives
//           } // end case a ball was sunk and the white was not sunk
//         } // end case playing eightball or nineball
//       } // end case there were new balls sunk, test for end game conditions
//     } // end case balls were sunk

//     // case no balls have ever been sunk
//     else {
//       dispatch(finalizeBallMotion());
//       // if (settings.gameType === 'eight') {
//       //   console.log('6')
//       //   dispatch(setGameStatusIdle());
//       //   dispatch(changeActivePlayer());
//       // }
//       if (settings.gameType === 'nine' && newlySunkBalls.length > 0) {
//         dispatch(setGameStatusIdle());
//         dispatch(addToBallsSunkNine(newlySunkBalls))
//       }
//       // if no ball was hit then the shot as illegal and the player can freely move the white ball
//       if (!billiards.billiards[0].firstCollision) {
//       dispatch(setGameStatusFreeMove());
//       dispatch(setBallInHand());
//       }
//       // begin doing similar above testing depending on which ball what collided with

//       // dispatch(setBallInHand());
//       // dispatch(freeMoveCueBallIllegal());
//     } // end case no balls have ever been sunk
    
//     // place newly sunk balls into array
//       newlySunkBalls.forEach((justSunkId)=>{
//       let newPastSunkBalls = pastSunkBalls;
//       newPastSunkBalls.push(justSunkId);
//       setPastSunkBalls(newPastSunkBalls);
//     })
//   } // end cases balls moving /  not moving
//   return
// } // end of update