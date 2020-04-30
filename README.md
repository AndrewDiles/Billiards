This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Interesting obstacles

Originally I performed the update() function on a setTimeout, at a given refreshRate rate that was held in state (and therefor mutible to prevent potential lag), however, the setInterval maintained an ancestral, and unchanged, billiards state, and so the condition required to stop the update callback was never met.  Because of this, I changed to requestAnimationFrame, and had to use Date to determine the interval of time that had elapsed.

In an efffort to reduce the amount of re-rendering, I decided to turn the stationary objects (exs: table, rail, cushion, holes) into a React.memo.  This worked in the end, but at the time the Balls component was being rendered as a child of Table, and since their information changed, the Table re-rendered anyway.  I ended up moving the Table Wrapper outside of the Table function and rendering the balls as a child of the Wrapper and not the TableMemo to prevent the Memo from re-rendering and to maintain the balls' relative positioning to the table.

## Fixed bugs:
Correct jerking nature of free-move cue ball
Changed movement to test increments of that update's movement and test for collisions along each interval to increase accuracy

## Bugs to fix:

Correct hit detection during free movement

Change apply physics to foresee impact