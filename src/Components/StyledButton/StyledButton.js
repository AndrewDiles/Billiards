import React from 'react';
import styled from 'styled-components';

import RotatingOrb from './RotatingOrb';
const StyledButton = ( { handleClick, value, disabled, selected, children} ) => {
  const [visible, setVisible]  = React.useState(false);
  const initialButtonInfo = {height: 0, width: 0};
  const [buttonInfo, setButtonInfo] = React.useState(initialButtonInfo);

  const activateOrb =(event) => {
    setVisible(true);
    setButtonInfo({height: event.target.getBoundingClientRect().height, width: event.target.getBoundingClientRect().width});
  }
  const deactivateOrb =(ev) => {
    setVisible(false);
    setButtonInfo(initialButtonInfo);
  }

  React.useEffect(()=>{
    return () => {
      deactivateOrb();
    }
  },[])

  return (
      <ButtonStylings
      disabled = {disabled || null}
      onClick = {(ev)=> {handleClick(ev);deactivateOrb(ev);}}
      value = {value}
      selected = {selected}
      children = {children}
      onMouseEnter = {(ev=> activateOrb(ev))}
      onMouseLeave = {(ev=> deactivateOrb(ev))}
      >
        {visible &&
          <RotatingOrb
          id = "orb"
          visible = {visible}
          buttonInfo ={buttonInfo}
          />
        }
        {children}
      </ButtonStylings>
  )
}
export default StyledButton;

const ButtonStylings = styled.button`
  width: 100px;
  padding: 5px;
  position: relative;
  color: ${props => props.children === "READY" && 'lime'};
  color: ${props => props.children === "NOT READY" && 'red'};
  background-color: ${props => props.selected ? 'rgba(207, 181, 59, 0.8)' : 'rgba(255,255,255,0.3)'};
  z-index: 10;
  margin: 5px;
  border-radius: 10px;
  /* font-size: 1.3em; */
  font-weight: bolder;
  text-align: center;
  transition: background-color .75s;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: gold;
  }
`