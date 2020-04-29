import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Selections from '../Selections';

import { useSpring, animated } from 'react-spring';

import { openSideBar,closeSideBar } from '../../actions';

import {right} from 'react-icons-kit/entypo/right';
import {cog} from 'react-icons-kit/entypo/cog';
import {left} from 'react-icons-kit/entypo/left';
import { Icon } from 'react-icons-kit';

import escheresque_ste from '../../assets/escheresque_ste/escheresque_ste.png';

const Sidebar = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [isSliding, setIsSliding] = React.useState(false);
  
  const toggleSlidebar = async () => {
    if (isSliding) return;
    if (settings.sideBarOpen) dispatch(closeSideBar());
    else dispatch(openSideBar());
    setIsSliding(true);
    setTimeout(()=> setIsSliding(false), 1000)
  }
  
  const configs = {
    tension: 300,
    friction: 25,
    mass: 5,
  }

  const opening = useSpring({
    width: '300px',
    from: {
      width: '30px',
    },
    config: configs
  });

  const closing = useSpring({
    width: '30px',
    from: {
      width: '300px',
    },
    config: configs
  });
  const closed = {width: '30px'};

  const openingMargin = useSpring({
    margin: '0 0 0 290px',
    from: {
      margin: '0 0 0 30px',
    },
    config: configs
  });

  const closingMargin = useSpring({
    margin: '0 0 0 30px',
    from: {
      margin: '0 0 0 290px',
    },
    config: configs
  });
  const closedMargin = {margin: '0 0 0 30px'};

  return (
    // <SlideMotion>
      <NavWrapper
      style = {settings.sideBarOpen ? opening : settings.sideBarOpen === undefined ? closed : closing}
      >
        <IconDiv style = {settings.sideBarOpen ? openingMargin : settings.sideBarOpen === undefined ? closedMargin : closingMargin}>
        {settings.sideBarOpen ? (
          <StyledIcon onClick = {toggleSlidebar} size={64} icon={left}/>
        ) : (
          <StyledIcon onClick = {toggleSlidebar} size={64} icon={cog}/>
        )}
        </IconDiv>
        <Selections
        isSliding = {isSliding}
        />
        {/* <NavLink to="/">HOME</NavLink>
        <NavLink to="/shop">SHOP</NavLink>
        {user === null ? (
          <NavLink to="/account">ACCOUNT</NavLink>
        ) : (
          <NavLink to="/userInformation">{accountTitle}</NavLink>
        )} */}
        {/* <NavLink to="/account">
          {user === null ? (
            "SIGN IN"
          ) : (
            <button className="signOutBtn" onClick={handleSignOut}>
              SIGN OUT
            </button>
          )}
        </NavLink>
        <div>
          {/* <img src={supermarket} alt="cart button" /> */}

          {/* <CartButton 
            onMouseEnter={() => {
              setCartVisibilityPreHover(cartVisible);
              setCartVisible(true);
            }}
            onMouseLeave={() => {
              if (cartVisibilityPreHover && clickStatus) setCartVisible(true);
              else if (cartVisibilityPreHover && !clickStatus)
                setCartVisible(false);
              else if (!cartVisibilityPreHover && clickStatus)
                setCartVisible(true);
              else if (!cartVisibilityPreHover && !clickStatus)
                setCartVisible(false);
            }}
            onClick={() => {
              setClickStatus(!clickStatus);
            }}
          > <FaShoppingCart  style={{marginRight: "10px"}} size={20}/>
            {cartNum > 0 ? `CART (${cartNum})` : "CART"}
          </CartButton> */}

      </NavWrapper>
    // </SlideMotion>
  );
  // width: ${props => props.open ? '300px' : '30px'};
  // width: ${props => props.open ? props.opening : props.closing};
  // margin-left: ${props => props.open ? '290px' : '0'};
};
const IconDiv = styled(animated.div)`
  transition-duration: 700ms;
`

const NavWrapper = styled(animated.nav)`
  position:fixed;
  z-index: 14;
  background: lightgrey;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: center; */
  min-height: 100vh;
  height: 100%;
  transition-duration: 700ms;
  /* transition-delay: 2000ms; */
  
  /* background-image: "url(../../assets/retina_wood)"; */
  /* background: "url(src/assets/retina_wood/retina_wood.png)"; */
  background: url(${escheresque_ste});
`;

/* Background pattern from Toptal Subtle Patterns */
const StyledIcon = styled(Icon)`
  cursor: pointer;
  background: url(${escheresque_ste});
  border-radius: 0 0 50% 0;
  color: rgba(255,255,255,0.3);
  &:hover {
    color: gold;
  }
  

`

export default Sidebar;