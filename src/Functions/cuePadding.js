export const determinePadding = (x,y) => {
  let padding = '0 0 0 0';
  console.log('x',x,'y',y)
  if (x === 0 && y === 0 ) padding = '60px 60px 0 0';
  else if (x === 0.1 && y === 0) padding = '64px 50px 0 0';
  else if (x === 0.2 && y === 0) padding = '68px 40px 0 0';
  else if (x === 0.3 && y === 0) padding = '72px 25px 0 0';
  else if (x === 0.4 && y === 0) padding = '76px 10px 0 0';
  else if (x === 0.5 && y === 0) padding = '80px 0 0 0';
  else if (x === 0.6 && y === 0) padding = '76px 0 0 10px';
  else if (x === 0.7 && y === 0) padding = '72px 0 0 25px';
  else if (x === 0.8 && y === 0) padding = '68px 0 0 40px';
  else if (x === 0.9 && y === 0) padding = '64px 0 0 50px';
  else if (x === 1.0 && y === 0) padding = '60px 0 0 60px';

  else if (x === 0 && y === 0.1 ) padding = '50px 60px 0 0';
  else if (x === 0.1 && y === 0.1) padding = '54px 50px 0 0';
  else if (x === 0.2 && y === 0.1) padding = '58px 42px 0 0';
  else if (x === 0.3 && y === 0.1) padding = '62px 28px 0 0';
  else if (x === 0.4 && y === 0.1) padding = '66px 16px 0 0';
  else if (x === 0.5 && y === 0.1) padding = '70px 0 0 0';
  else if (x === 0.6 && y === 0.1) padding = '66px 0 0 16px';
  else if (x === 0.7 && y === 0.1) padding = '62px 0 0 28px';
  else if (x === 0.8 && y === 0.1) padding = '58px 0 0 42px';
  else if (x === 0.9 && y === 0.1) padding = '54px 0 0 50px';
  else if (x === 1.0 && y === 0.1) padding = '50px 0 0 60px';

  else if (x === 0 && y === 0.2 ) padding = '22px 70px 0 0';
  else if (x === 0.1 && y === 0.2) padding = '28px 56px 0 0';
  else if (x === 0.2 && y === 0.2) padding = '34px 40px 0 0';
  else if (x === 0.3 && y === 0.2) padding = '40px 25px 0 0';
  else if (x === 0.4 && y === 0.2) padding = '46px 13px 0 0';
  else if (x === 0.5 && y === 0.2) padding = '50px 0 0 0';
  else if (x === 0.6 && y === 0.2) padding = '46px 0 0 13px';
  else if (x === 0.7 && y === 0.2) padding = '40px 0 0 25px';
  else if (x === 0.8 && y === 0.2) padding = '34px 0 0 40px';
  else if (x === 0.9 && y === 0.2) padding = '28px 0 0 56px';
  else if (x === 1.0 && y === 0.2) padding = '22px 0 0 70px';

  else if (x === 0 && y === 0.3 ) padding = '12px 80px 0 0';
  else if (x === 0.1 && y === 0.3) padding = '16px 64px 0 0';
  else if (x === 0.2 && y === 0.3) padding = '20px 50px 0 0';
  else if (x === 0.3 && y === 0.3) padding = '26px 35px 0 0';
  else if (x === 0.4 && y === 0.3) padding = '30px 18px 0 0';
  else if (x === 0.5 && y === 0.3) padding = '32px 0 0 0';
  else if (x === 0.6 && y === 0.3) padding = '30px 0 0 18px';
  else if (x === 0.7 && y === 0.3) padding = '26px 0 0 35px';
  else if (x === 0.8 && y === 0.3) padding = '20px 0 0 50px';
  else if (x === 0.9 && y === 0.3) padding = '16px 0 0 64px';
  else if (x === 1.0 && y === 0.3) padding = '12px 0 0 80px';

  else if (x === 0 && y === 0.4 ) padding = '6px 80px 0 0';
  else if (x === 0.1 && y === 0.4) padding = '8px 65px 0 0';
  else if (x === 0.2 && y === 0.4) padding = '10px 50px 0 0';
  else if (x === 0.3 && y === 0.4) padding = '13px 35px 0 0';
  else if (x === 0.4 && y === 0.4) padding = '15px 16px 0 0';
  else if (x === 0.5 && y === 0.4) padding = '16px 0 0 0';
  else if (x === 0.6 && y === 0.4) padding = '15px 0 0 16px';
  else if (x === 0.7 && y === 0.4) padding = '13px 0 0 35px';
  else if (x === 0.8 && y === 0.4) padding = '10px 0 0 50px';
  else if (x === 0.9 && y === 0.4) padding = '8px 0 0 65px';
  else if (x === 1.0 && y === 0.4) padding = '6px 0 0 80px';

  else if (x === 0 && y === 0.5 ) padding = '0 80px 0 0';
  else if (x === 0.1 && y === 0.5) padding = '0 65px 0 0';
  else if (x === 0.2 && y === 0.5) padding = '0 50px 0 0';
  else if (x === 0.3 && y === 0.5) padding = '0 35px 0 0';
  else if (x === 0.4 && y === 0.5) padding = '0 16px 0 0';
  else if (x === 0.5 && y === 0.5) padding = '0 0 0 0';
  else if (x === 0.6 && y === 0.5) padding = '0 0 0 16px';
  else if (x === 0.7 && y === 0.5) padding = '0 0 0 35px';
  else if (x === 0.8 && y === 0.5) padding = '0 0 0 50px';
  else if (x === 0.9 && y === 0.5) padding = '0 0 0 65px';
  else if (x === 1.0 && y === 0.5) padding = '0 0 0 80px';

  else if (x === 0 && y === 0.6 ) padding = '0 80px 6px 0';
  else if (x === 0.1 && y === 0.6) padding = '0 65px 8px 0';
  else if (x === 0.2 && y === 0.6) padding = '0 50px 10px 0';
  else if (x === 0.3 && y === 0.6) padding = '0 35px 13px 0';
  else if (x === 0.4 && y === 0.6) padding = '0 16px 15px 0';
  else if (x === 0.5 && y === 0.6) padding = '0 0 16px 0';
  else if (x === 0.6 && y === 0.6) padding = '0 0 15px 16px';
  else if (x === 0.7 && y === 0.6) padding = '0 0 13px 35px';
  else if (x === 0.8 && y === 0.6) padding = '0 0 10px 50px';
  else if (x === 0.9 && y === 0.6) padding = '0 0 8px 65px';
  else if (x === 1.0 && y === 0.6) padding = '0 0 6px 80px';

  else if (x === 0 && y === 0.7 ) padding = '0 75px 12px 0';
  else if (x === 0.1 && y === 0.7) padding = '0 58px 16px 0';
  else if (x === 0.2 && y === 0.7) padding = '0 43px 20px 0';
  else if (x === 0.3 && y === 0.7) padding = '0 28px 26px 0';
  else if (x === 0.4 && y === 0.7) padding = '0 15px 30px 0';
  else if (x === 0.5 && y === 0.7) padding = '0 0 32px 0';
  else if (x === 0.6 && y === 0.7) padding = '0 0 30px 15px';
  else if (x === 0.7 && y === 0.7) padding = '0 0 26px 28px';
  else if (x === 0.8 && y === 0.7) padding = '0 0 20px 43px';
  else if (x === 0.9 && y === 0.7) padding = '0 0 16px 58px';
  else if (x === 1.0 && y === 0.7) padding = '0 0 12px 75px';

  else if (x === 0 && y === 0.8 ) padding = '0 70px 22px 0';
  else if (x === 0.1 && y === 0.8) padding = '0 56px 28px 0';
  else if (x === 0.2 && y === 0.8) padding = '0 40px 34px 0';
  else if (x === 0.3 && y === 0.8) padding = '0 25px 40px 0';
  else if (x === 0.4 && y === 0.8) padding = '0 13px 46px 0';
  else if (x === 0.5 && y === 0.8) padding = '0 0 50px 0';
  else if (x === 0.6 && y === 0.8) padding = '0 0 46px 13px';
  else if (x === 0.7 && y === 0.8) padding = '0 0 40px 25px';
  else if (x === 0.8 && y === 0.8) padding = '0 0 34px 40px';
  else if (x === 0.9 && y === 0.8) padding = '0 0 28px 56px';
  else if (x === 1.0 && y === 0.8) padding = '0 0 22px 70px';

  else if (x === 0 && y === 0.9 ) padding = ' 0 60px 50px 0';
  else if (x === 0.1 && y === 0.9) padding = '0 50px 54px 0';
  else if (x === 0.2 && y === 0.9) padding = '0 42px 58px 0';
  else if (x === 0.3 && y === 0.9) padding = '0 28px 62px 0';
  else if (x === 0.4 && y === 0.9) padding = '0 16px 66px 0';
  else if (x === 0.5 && y === 0.9) padding = '0 0 70px 0';
  else if (x === 0.6 && y === 0.9) padding = '0 0 66px 16px';
  else if (x === 0.7 && y === 0.9) padding = '0 0 62px 28px';
  else if (x === 0.8 && y === 0.9) padding = '0 0 58px 42px';
  else if (x === 0.9 && y === 0.9) padding = '0 0 54px 50px';
  else if (x === 1.0 && y === 0.9) padding = '0 0 50px 60px';

  else if (x === 0 && y === 1.0 ) padding = '0 60px 60px 0';
  else if (x === 0.1 && y === 1.0) padding = '0 50px 64px 0';
  else if (x === 0.2 && y === 1.0) padding = '0 40px 68px 0';
  else if (x === 0.3 && y === 1.0) padding = '0 25px 72px 0';
  else if (x === 0.4 && y === 1.0) padding = '0 10px 76px 0';
  else if (x === 0.5 && y === 1.0) padding = '0 0 80px 0';
  else if (x === 0.6 && y === 1.0) padding = '0 0 76px 10px';
  else if (x === 0.7 && y === 1.0) padding = '0 0 72px 25px';
  else if (x === 0.8 && y === 1.0) padding = '0 0 68px 40px';
  else if (x === 0.9 && y === 1.0) padding = '0 0 64px 50px';
  else if (x === 1.0 && y === 1.0) padding = '0 0 60px 60px';
  return padding;
}

// Below are failed attempts

// let paddingRight = 0;
  // let paddingTop = 0;
  // let paddingLeft = 0;
  // let paddingBottom = 0;

  // const determinePadding = (x, y) => {
  //   let radius = 50*(Math.sqrt((x-0.5)*(x-0.5)+(y-0.5)*(y-0.5)));
  //   // console.log('radius',radius)
  //   let theta;
  //   if (radius !== 0){
  //     // theta = Math.acos((x-0.5)/radius);
  //     theta = 90*x/(x+y);
  //     paddingTop = Math.sin(theta)*radius;
  //     paddingRight = 10*Math.cos(theta)*radius;
  //     if (paddingRight < 0) {
  //       paddingLeft = -1 * paddingRight;
  //       paddingRight = 0;
  //     }
  //     if (paddingTop < 0) {
  //       paddingBottom = -1 * paddingTop;
  //       paddingTop = 0;
  //     }
  //   }
  //   // console.log('paddingRight',paddingRight,'paddingTop',paddingTop)
  // }
  // determinePadding(settings.cueStrikeLocationX,settings.cueStrikeLocationY);
  // const determinePadding = (x,y) => {

  // // let xMult = 60+40*(Math.abs(y-.5));
  // // let yMult = 60+40*(Math.abs(x-.5));
  //   let left = 0;
  //   let right = 0;
  //   let top = 0;
  //   let bottom = 0;
  // //   if (x<0.5) {
  // //     right = xMult-xMult*x/0.5;
  // //   }
  // //   else if (x>0.5) {
  // //     left = xMult-xMult*x/0.5;
  // //   }
  // //   if (y<0.5) {
  // //     top = yMult-yMult*x/0.5;
  // //   }
  // //   else if (y>0.5) {
  // //     bottom = yMult-yMult*x/0.5;
  // //   }
  //   let yTest = y;
  //   if (y<0.5) yTest = Math.abs(y-0.5)+0.5;
  //   switch (yTest) {
  //     case 1 : {
  //       if (x<0.5) {
  //         right = Math.abs(60-60*x/0.5);
  //       }
  //       else if (x>0.5) {
  //         left = Math.abs(60-60*x/0.5);
  //       }
  //     }
  //     case 0.9 : {
  //       if (x<0.5) {
  //         right = Math.abs(64-64*x/0.5);
  //       }
  //       else if (x>0.5) {
  //         left = Math.abs(64-64*x/0.5);
  //       }
  //     }
  //     case 0.8 : {
  //       if (x<0.5) {
  //         right = Math.abs(68-68*x/0.5);
  //       }
  //       else if (x>0.5) {
  //         left = Math.abs(68-68*x/0.5);
  //       }
  //     }
  //     case 0.7 : {
  //       if (x<0.5) {
  //         right = Math.abs(72-72*x/0.5);
  //       }
  //       else if (x>0.5) {
  //         left = Math.abs(72-72*x/0.5);
  //       }
  //     }
  //     case 0.6 : {
  //       if (x<0.5) {
  //         right = Math.abs(76-76*x/0.5);
  //       }
  //       else if (x>0.5) {
  //         left = Math.abs(76-76*x/0.5);
  //       }
  //     }
  //     case 0.5 : {
  //       if (x<=0.5) {
  //         right = Math.abs(80-80*x/0.5);
  //       }
  //       else if (x>0.5) {
  //         left = Math.abs(80-80*x/0.5);
  //       }
  //     }
  //   }

  //   let xTest = x;
  //   if (x<0.5) xTest = Math.abs(x-0.5)+0.5;
  //   switch (xTest) {
  //     case 1 : {
  //       if (y<0.5) {
  //         top = Math.abs(60-60*y/0.5);
  //       }
  //       else if (x>0.5) {
  //         bottom = Math.abs(60-60*y/0.5);
  //       }
  //     }
  //     case 0.9 : {
  //       if (y<0.5) {
  //         top = Math.abs(64-64*y/0.5);
  //       }
  //       else if (x>0.5) {
  //         bottom = Math.abs(64-64*y/0.5);
  //       }
  //     }
  //     case 0.8 : {
  //       if (y<0.5) {
  //         top = Math.abs(68-68*y/0.5);
  //       }
  //       else if (x>0.5) {
  //         bottom = Math.abs(68-68*y/0.5);
  //       }
  //     }
  //     case 0.7 : {
  //       if (y<0.5) {
  //         top = Math.abs(72-72*y/0.5);
  //       }
  //       else if (x>0.5) {
  //         bottom = Math.abs(72-72*y/0.5);
  //       }
  //     }
  //     case 0.6 : {
  //       if (y<0.5) {
  //         top = Math.abs(76-76*y/0.5);
  //       }
  //       else if (x>0.5) {
  //         bottom = Math.abs(76-76*y/0.5);
  //       }
  //     }
  //     case 0.5 : {
  //       if (y<=0.5) {
  //         top = Math.abs(80-80*y/0.5);
  //       }
  //       else if (x>0.5) {
  //         bottom = Math.abs(80-80*y/0.5);
  //       }
  //     }
  //   }
  //   return (`${top}px ${right}px ${bottom}px ${left}px`)
  // }