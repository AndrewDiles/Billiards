import React from 'react';
import styled from 'styled-components';

import { tableSizes, corners, sides } from '../../../Constants/tableSizes';

import Corner from '../Corners';
import Side from '../Sides';

export function TableMemoComponent({ settings }) {
  console.log('TABLE MEMO HAS RE-RENDERED')

  return (
    <Rail
    size = {settings.tableSize}
    tableSizes = {tableSizes}
    >
      <Cushion
      size = {settings.tableSize}
      tableSizes = {tableSizes}
      >
        {corners.map((corner)=>{
          return (
            <Corner
            key = {corner}
            corner = {corner}
            />
          )
        })}
        {sides.map((side)=>{
          return (
            <Side
            key = {side}
            side = {side}
            />
          )
        })}
      </Cushion>
    </Rail>
  )
}
export const TableMemo = React.memo(TableMemoComponent);

const Cushion = styled.div`
  width: ${props => 4 * props.tableSizes[props.size].cushionWidth + props.tableSizes[props.size].feltWidth}px;
  height: ${props => 4 * props.tableSizes[props.size].cushionWidth + props.tableSizes[props.size].feltHeight}px;
  border-radius: ${props => props.tableSizes[props.size].tableBorderRadius && props.tableSizes[props.size].tableBorderRadius}px;
  border: solid ${props => props.tableSizes[props.size].cushionWidth && + props.tableSizes[props.size].cushionWidth}px silver;
  position: relative;
  top: -${props => props.tableSizes[props.size].cushionWidth && props.tableSizes[props.size].cushionWidth}px;
  left: -${props => props.tableSizes[props.size].cushionWidth && props.tableSizes[props.size].cushionWidth}px;
`

const Rail = styled.div`
  width: ${props => props.tableSizes[props.size].tableWidth && props.tableSizes[props.size].tableWidth}px;
  height: ${props => props.tableSizes[props.size].tableHeight && props.tableSizes[props.size].tableHeight}px;
  border-radius: ${props => props.tableSizes[props.size].tableBorderRadius && props.tableSizes[props.size].tableBorderRadius}px;
  border: solid ${props => props.tableSizes[props.size].railWidth && props.tableSizes[props.size].cushionWidth &&
  props.tableSizes[props.size].railWidth + props.tableSizes[props.size].cushionWidth}px brown;
`
// const Outer = styled.div`
//   width: ${props => props.tableSizes[props.settings.tableSize].tableWidth && props.tableSizes[props.settings.tableSize].tableWidth}px;
//   height: ${props => props.tableSizes[props.settings.tableSize].tableHeight && props.tableSizes[props.settings.tableSize].tableHeight}px;
//   border-radius: ${props => props.tableSizes[props.settings.tableSize].tableBorderRadius && props.tableSizes[props.settings.tableSize].tableBorderRadius}px;
//   background: green;
//   display: flex;
//   justify-content: center;
//   text-align: center;
//   align-items: center;
//   transform: ${props => props.settings.tableSize === "narrow" && 'rotate(90deg)'};
// `