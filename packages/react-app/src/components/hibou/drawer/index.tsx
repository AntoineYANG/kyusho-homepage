/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 19:40:39 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 21:54:58
 */

import isMobile from '@utils/is-mobile';
import React from 'react';
import styled from 'styled-components';

import colors from '../colors';
import { usePreferColorScheme } from '../toggle/dark-mode-toggle';


const Container = styled.div({
  position: 'fixed',
  zIndex: 1,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
});

const Mask = styled.div<{ _display: boolean }>(({ _display }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: _display ? 'all' : 'none',
  backdropFilter: _display ? 'blur(2px) brightness(0.7)' : undefined,

  transition: 'backdrop-filter 400ms',
}));

const Body = styled.div<{
  _display: boolean;
  dark: boolean;
  position: 'right' | 'left' | 'bottom' | 'top';
}>(({ _display, dark, position }) => ({
  pointerEvents: _display ? 'all' : 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  overflow: 'hidden',
  position: 'absolute',
  zIndex: 3,

  [['left', 'right'].includes(position) ? '& ' : 'x ']: {
    top: 0,
    [position]: 0,
    height: '100%',
    minWidth: '30%',
    maxWidth: '60%',

    '@media screen and (orientation: portrait)': {
      maxWidth: '75%',
    },

    transform: _display ? 'none' : `translateX(${
      position === 'left' ? '-' : '+'
    }100%)`,
  },

  [['top', 'bottom'].includes(position) ? '& ' : 'x ']: {
    left: 0,
    [position]: 0,
    width: '100%',
    minHeight: '30%',
    maxHeight: '70%',

    transform: _display ? 'none' : `translateY(${
      position === 'top' ? '-' : '+'
    }100%)`,
  },

  [dark ? '&' : 'x']: {
    backgroundColor: colors.backgroundDark,
    color: colors.fontDark,
  },

  [dark ? 'x' : '&']: {
    backgroundColor: colors.background,
    color: colors.font,
  },

  '> *': {
    padding: '20px',
  },

  '> header': {
    flexGrow: 0,
    flexShrink: 0,
    fontSize: '1.2rem',
    fontWeight: 'bolder',
    lineHeight: '1.5em',
    textAlign: 'center',
    paddingBlock: '0.5em',
    borderBlockEnd: `1px solid ${colors.border}40`,
    marginBlockEnd: '0.4em',
  },

  '> div': {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  boxShadow: _display ? `
    0 0 40px ${colors.shadow}40,
    inset 0 0 65px #ffffff20
  ` : undefined,

  transition: 'transform 400ms, box-shadow 400ms',
}));

const Btn = styled.svg<{
  _display: boolean;
  dark: boolean;
  position: 'right' | 'left' | 'bottom' | 'top';
}>(({ _display, dark, position }) => ({
  pointerEvents: _display ? 'none' : 'all',
  position: 'absolute',
  zIndex: 2,
  bottom: position === 'bottom' ? 0
    : position === 'top' ? '100%' : '35%',
  left: ['top', 'bottom'].includes(position) ? '50%'
    : position === 'left' ? 0 : '100%',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  transform: `translate(-${
    position === 'right' ? '65'
      : position === 'left' ? '35' : '50'
  }%, ${
    position === 'top' ? '65'
      : position === 'bottom' ? '35' : '50'
  }%)`,
  overflow: 'hidden',
  boxShadow: `
    0 0 20px ${colors.shadow}20,
    inset 0 0 25px #ffffff40
  `,
  cursor: 'pointer',
  opacity: _display ? 0 : 1,

  [dark ? '&' : 'x']: {
    backgroundColor: colors.backgroundDark,
  },

  [dark ? 'x' : '&']: {
    backgroundColor: colors.background,
  },

  '> path': {
    transform: `rotate(${
      {
        right: 270,
        left: 90,
        bottom: 0,
        top: 180
      }[position]
    }deg)`,
    transformOrigin: 'center',
    fill: `${colors.border}20`,
    stroke: `${colors.border}cc`,
    strokeWidth: 2,
  },

  transition: `opacity ${_display ? '200ms 300ms' : '30ms'}`,
}));

export interface DrawerProps {
  display?: boolean | undefined;
  handleClose?: () => void;
  /**
   * @default "right"
   */
  position?: 'right' | 'left' | 'bottom' | 'top';
  /**
   * @default true
   */
  forceBottomWhenPortrait?: boolean;
  title?: string;
  children?: any;
}

const Drawer: React.FC<DrawerProps> = React.memo(function Drawer ({
  display: displayP,
  handleClose,
  position: _position = 'right',
  forceBottomWhenPortrait = true,
  title,
  children,
}) {
  if ([displayP, handleClose].filter(d => d === undefined).length === 1) {
    console.error(
      `You must give both "display" and "handleClose" to make this Drawer passive.`
    );
  }

  const passive = [displayP, handleClose].filter(d => d === undefined).length === 0;

  const position = isMobile() && forceBottomWhenPortrait ? 'bottom' : _position;

  const colorScheme = usePreferColorScheme();
  const [displayS, setDisplayS] = React.useState(false);

  const [display, setDisplay] = React.useMemo(() => {
    if (passive) {
      return [displayP, handleClose];
    }
    
    return [displayS, setDisplayS];
  }, [displayP, displayS, handleClose, passive]) as [boolean, (v: boolean) => void];
  
  const handleClickMask = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setDisplay(false);
    }
  }, [setDisplay]);

  const handleClickBtn = React.useCallback(() => {
    setDisplay(true);
  }, [setDisplay]);

  return (
    <Container
      aria-hidden={!display}
    >
      <Mask
        _display={display}
        onClick={handleClickMask}
      >
        <Body
          _display={display}
          dark={colorScheme === 'dark'}
          position={position}
        >
          {
            title !== undefined && (
              <header>
                {title}
              </header>
            )
          }
          <div>
            {display && children}
          </div>
        </Body>
        {
          passive || (
            <Btn
              _display={display}
              dark={colorScheme === 'dark'}
              position={position}
              role="button"
              tabIndex={display ? undefined : -1}
              onClick={handleClickBtn}
              viewBox="0 0 40 40"
            >
              <path
                d={
                  `M16,32 H24 V19 H31 L20,9 L9,19 H16 Z`
                }
              />
            </Btn>
          )
        }
      </Mask>
    </Container>
  );
});


export default Drawer;
