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

export const holeInfo = [
  {TL: [9, 9, 7]}, // top, left, radius
  {TR: [9, 280, 7]},
  {BL: [152.5, 10, 7]},
  {BR: [152.5, 279, 7]},
  {T: [6.5, 144.5, 5.5]},
  {B: [155.5, 144, 5.5]}
]


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