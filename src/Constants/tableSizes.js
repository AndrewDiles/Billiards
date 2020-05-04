// import React from 'react';

// Dimensions are based on a standard 9 foot table
// pixel to cm ratio representations are:
// narrow:
// medium:
// full: 5 px / cm

// the following sizes are in cm
export const actualSizes = {
  feltWidth: 254,
  feltHeight: 127,
  tableWidth: 290,
  tableHeight: 163,
  railWidth: 8, //13 
  cushionWidth: 5, //5
  pocketRadius: 10,
  tableBorderRadius: 10,
  ballRadius: 4.2, //5.72
}

// px / cm ratio
export const sizeRatios = {
  narrow: 2.5,
  medium: 2.5,
  full: 4,
}
export const corners = ["TL", "BL", "TR", "BR"];
export const sides = ["T", "B"];
export const tableSizes = {
  narrow : {
    feltWidth:          sizeRatios.narrow * actualSizes.feltWidth,
    feltHeight:         sizeRatios.narrow * actualSizes.feltHeight,
    tableWidth:         sizeRatios.narrow * actualSizes.tableWidth,
    tableHeight:        sizeRatios.narrow * actualSizes.tableHeight,
    railWidth:          sizeRatios.narrow * actualSizes.railWidth,
    cushionWidth:       sizeRatios.narrow * actualSizes.cushionWidth,

    cornerGreenWidth:   156.25,
    cornerGreenHeight:  43.75,
    TLtopG:             13,
    TLleftG:            -42,
    TRtopG:             13,
    TRleftG:            545,
    BLtopG:             285,
    BLleftG:            -42,
    BRtopG:             285,
    BRleftG:            545,

    TLtopB:             3,
    TLleftB:            0,
    TRtopB:             2,
    TRleftB:            119,
    BLtopB:             3,
    BLleftB:            0,
    BRtopB:             2,
    BRleftB:            119,

    sideGreenWidth:     43.75,
    sideGreenHeight:    125,
    TtopG:              -25,
    TleftG:             310,
    BtopG:              242,
    BleftG:             310,

    TtopB:              -3,
    TleftB:             8,
    BtopB:              100,
    BleftB:             8,

    pocketRadius:       sizeRatios.narrow * actualSizes.pocketRadius,
    tableBorderRadius:  sizeRatios.narrow * actualSizes.tableBorderRadius,
    ballRadius:         sizeRatios.narrow * actualSizes.ballRadius,
    topPadding:         200,
    leftPadding:        0,
  },
  medium : {
    feltWidth:          sizeRatios.medium * actualSizes.feltWidth,
    feltHeight:         sizeRatios.medium * actualSizes.feltHeight,
    tableWidth:         sizeRatios.medium * actualSizes.tableWidth,
    tableHeight:        sizeRatios.medium * actualSizes.tableHeight,
    railWidth:          sizeRatios.medium * actualSizes.railWidth,
    cushionWidth:       sizeRatios.medium * actualSizes.cushionWidth,

    cornerGreenWidth:   156.25,
    cornerGreenHeight:  43.75,
    TLtopG:             13,
    TLleftG:            -42,
    TRtopG:             13,
    TRleftG:            545,
    BLtopG:             285,
    BLleftG:            -42,
    BRtopG:             285,
    BRleftG:            545,

    TLtopB:             3,
    TLleftB:            0,
    TRtopB:             2,
    TRleftB:            119,
    BLtopB:             3,
    BLleftB:            0,
    BRtopB:             2,
    BRleftB:            119,

    sideGreenWidth:     43.75,
    sideGreenHeight:    125,
    TtopG:              -25,
    TleftG:             310,
    BtopG:              242,
    BleftG:             310,

    TtopB:              -3,
    TleftB:             8,
    BtopB:              100,
    BleftB:             8,

    pocketRadius:       sizeRatios.medium * actualSizes.pocketRadius,
    tableBorderRadius:  sizeRatios.medium * actualSizes.tableBorderRadius,
    ballRadius:         sizeRatios.medium * actualSizes.ballRadius,
    topPadding:         50,
    leftPadding:        100,
  },
  full : {
    feltWidth:          sizeRatios.full * actualSizes.feltWidth,
    feltHeight:         sizeRatios.full * actualSizes.feltHeight,
    tableWidth:         sizeRatios.full * actualSizes.tableWidth,
    tableHeight:        sizeRatios.full * actualSizes.tableHeight,
    railWidth:          sizeRatios.full * actualSizes.railWidth,
    cushionWidth:       sizeRatios.full * actualSizes.cushionWidth,

    cornerGreenWidth:   250,
    cornerGreenHeight:  70,
    TLtopG:             30,
    TLleftG:            -60,
    TRtopG:             30,
    TRleftG:            865,
    BLtopG:             450,
    BLleftG:            -60,
    BRtopG:             450,
    BRleftG:            865,
    TLtopB:             5,
    TLleftB:            -15,
    TRtopB:             5,
    TRleftB:            205,
    BLtopB:             5,
    BLleftB:            -10,
    BRtopB:             5,
    BRleftB:            200,
    sideGreenWidth:     70,
    sideGreenHeight:    200,
    TtopG:              -45,
    TleftG:             491,
    BtopG:              390,
    BleftG:             491,
    TtopB:              -2,
    TleftB:             14,
    BtopB:              158,
    BleftB:             13,

    pocketRadius:       sizeRatios.full * actualSizes.pocketRadius,
    tableBorderRadius:  sizeRatios.full * actualSizes.tableBorderRadius,
    ballRadius:         sizeRatios.full * actualSizes.ballRadius,
    topPadding:         100,
    leftPadding:        200,
  }
};

// export const holeInfo = [
//   {TL: [9, 9, 7]}, // top, left, radius
//   {TR: [9, 280, 7]},
//   {BL: [152.5, 10, 7]},
//   {BR: [152.5, 279, 7]},
//   {T: [6.5, 144.5, 5.5]},
//   {B: [155.5, 144, 5.5]}
// ]
export const holeInfo = [
  {TL: [-11, -11, 10]}, // top, left, radius
  {TR: [-11, 262, 10]},
  {BL: [132, -11, 10]},
  {BR: [132, 262, 9]},
  {T: [-11.5, 126, 6.5]},
  {B: [136, 126, 6.5]}
]
export const holeInfoObject = {
  TL: [-11, -11, 10], // top, left, radius
  TR: [-11, 262, 10],
  BL: [132, -11, 10],
  BR: [132, 262, 9],
  T: [-11.5, 126, 6.5],
  B: [136, 126, 6.5]
}
export const holeAngleInfo = {
  TL: {
    left1: {top: 6.3, left: -2.7, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},       // hit box tests TOP lEFT of ball (0.29r right 0.29r down of TL)
    left2: {top: 9.3, left: -1.2, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},       // corners occue 29% of the way away from the edges of a box, r = 4.2
    right1: {top: -2.95, left: 5.8, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},     // tests TR of ball
    right2: {top: -1.2, left: 9, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},
  },
  TR: {
    left1: {top: -1.6, left: 255.05, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},    // tests TL of ball
    left2: {top: -3.45, left: 258.05, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},
    right1: {top: .3, left: 256.55, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},     // tests TR of ball
    right2: {top: -1.95, left: 258.3, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},
  },
  BL: {
    left1: {top: 130.3, left: -2.45, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},    // tests TL of ball
    left2: {top: 128.05, left: -1.45, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},
    right1: {top: 137.182, left: -1.45, testLeft: 7.182, testTop: 7.182, impactOn : 'BR'},   // tests BR of ball
    right2: {top: 129.8, left: 1.05, testLeft: 7.182, testTop: 7.182, impactOn : 'BR'},
  },
  BR: {
    left1: {top: 129.8, left: 253.8, testLeft: 1.218, testTop: 7.182, impactOn : 'BL'},   // tests BL of ball
    left2: {top: 131.55, left: 256.3, testLeft: 1.218, testTop: 7.182, impactOn : 'BL'},
    right1: {top: 128.05, left: 256.55, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},    // tests TR of ball
    right2: {top: 130.3, left: 258.05, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},
  },
  T: {
    left1: {top: -1.95, left: 124.8, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'},    // tests TL of ball
    left2: {top: -3.95, left: 125.3, testLeft: 1.218, testTop: 1.218, impactOn : 'TL'}, 
    right1: {top: -3.7, left: 137.3, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},    // tests TR of ball
    right2: {top: -1.7, left: 138, testLeft: 7.182, testTop: 1.218, impactOn : 'TR'},
  },
  B: {
    left1: {top: 130.55, left: 124.8, testLeft: 1.218, testTop: 7.182, impactOn : 'BL'},   // tests BL of ball
    left2: {top: 132.3, left: 125.3, testLeft: 1.218, testTop: 7.182, impactOn : 'BL'},
    right1: {top: 132.05, left: 129.3, testLeft: 7.182, testTop: 7.182, impactOn : 'BR'},   // tests BR of ball
    right2: {top: 130.08, left: 129.8, testLeft: 7.182, testTop: 7.182, impactOn : 'BR'},
  },
}


// Side radius: 5.5
// B: top: 155.5 left: 144
// T: top: 6.5 left: 144.5

// const tableSizes = {
//   narrow : {

//   },
//   medium : {

//   },
//   full : {
//     feltWidth: 1270,   // 254cm
//     feltHeight: 635,    // 127cm
//     tableWidth: 1450,  // 290cm
//     tableHeight: 815,   // 163cm
//     railWidth: 60,      // 12cm
//     cushionWidth: 30,   // 6cm
//     pocketRadius: 50,
//     tableBorderRadius: 50,
//     ballRadius: 28,     // 5.72cm, (rounded number off)
//   }
// };

// export default tableSizes;