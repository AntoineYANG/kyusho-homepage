/*
 * @Author: Kanata You 
 * @Date: 2022-06-24 13:38:15 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 01:12:55
 */

import React from 'react';
import styled from 'styled-components';

import LongTouchable, { useLongTouchHandlers } from '../abilities/long-touchable';
import colors from '../colors';


const CardElement = styled.div({
  marginBlock: '2em',
  paddingBlockStart: '1.8em',
  paddingBlockEnd: '2.4em',
  paddingInline: '1.8em',
  border: `1px solid ${colors.border}40`,
  lineHeight: '1.8em',
});

export interface CardProps {
  children?: any;
}

const Card: React.FC<CardProps & LongTouchable> = React.memo(function Card ({
  children,
  ...props
}) {
  const {
    handleMouseDown,
    handleTouchStart,
    handleMouseMove,
    handleTouchMove,
    style: longTouchStyle,
  } = useLongTouchHandlers(props);

  return (
    <CardElement
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        ...longTouchStyle,
      }}
    >
      {children}
    </CardElement>
  );
});


export default Card;
