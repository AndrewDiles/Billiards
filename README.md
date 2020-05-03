This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Interesting obstacles

Originally I performed the update() function on a setTimeout, at a given refreshRate rate that was held in state (and therefor mutible to prevent potential lag), however, the setInterval maintained an ancestral, and unchanged, billiards state, and so the condition required to stop the update callback was never met.  Because of this, I changed to requestAnimationFrame, and had to use Date to determine the interval of time that had elapsed.

In an efffort to reduce the amount of re-rendering, I decided to turn the stationary objects (exs: table, rail, cushion, holes) into a React.memo.  This worked in the end, but at the time the Balls component was being rendered as a child of Table, and since their information changed, the Table re-rendered anyway.  I ended up moving the Table Wrapper outside of the Table function and rendering the balls as a child of the Wrapper and not the TableMemo to prevent the Memo from re-rendering and to maintain the balls' relative positioning to the table.

## Fixed bugs:
Correct jerking nature of free-move cue ball
Changed movement to test increments of that update's movement and test for collisions along each interval to increase accuracy
location of red spot as contact point on cue ball is adjusted
add hit detection on hole's knotches

## Bugs to fix:

Not enough contact points on angled cushion beside holes.  Ball can pass through ( just cause them to sink when out of bounds or make more contact points).
Correct hit detection during free movement
Free movement forces specified distance on first free move
free move box detection by tableSize


rotation of ball not working properly
collision affects on balls seems to misbehave based on which quadrant is hit.