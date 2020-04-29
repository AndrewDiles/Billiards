import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
// import Selections from './Selections';
// import tableSizes from '../Constants/tableSizes';

import SideBar from './SideBar';
import Game from './Game';



function App() {
  const settings = useSelector((state) => state.settings);
  // const { gameOn, setGameOn, settings, setSettings } = useContext(SettingsContext);

  
  return (
    <Router>
      <SideBar/>
      <GlobalStyles />
      <Game>

      </Game>
      
    </Router>
  );
}

export default App;





{/* <Screen
      tableSizes = {tableSizes}
      settings= {settings}
      >
        <Selections>
        </Selections>
        
        <TableContainer
        tableSizes = {tableSizes}
        settings= {settings}
        >
          <Table/>
        </TableContainer>
        
      </Screen> */}



// const TableContainer = styled.div`
// top:0;
// left: 0;
// width: 100vw;
// height: 100vh;
// min-height: ${props => props.tableSizes[props.settings.tableSize].tableHeight + 
// 2 * props.tableSizes[props.settings.tableSize].topPadding}px;
// min-width: ${props => props.tableSizes[props.settings.tableSize].tableWidth + 
// 2 * props.tableSizes[props.settings.tableSize].leftPadding}px;
// padding-left: ${props => props.tableSizes[props.settings.tableSize].leftPadding}px;
// padding-top: ${props => props.tableSizes[props.settings.tableSize].topPadding}px;
// /* display: flex;
// justify-content: center;
// text-align: center;
// align-items: center; */
// /* position: static; */
// & ~ div {
//   transform: ${props => props.settings.tableSize === "narrow" && 'rotate(270deg)'};
// }
// `

// const Screen = styled.div`
// background-color: lightgray;
// top:0;
// left: 0;
// width: 100vw;
// height: 100vh;
// /* position: static; */
// min-height: ${props => props.tableSizes[props.settings.tableSize].tableHeight + 
// 2 * props.tableSizes[props.settings.tableSize].topPadding}px;
// min-width: ${props => props.tableSizes[props.settings.tableSize].tableWidth + 
// 2 * props.tableSizes[props.settings.tableSize].leftPadding}px;
// `
