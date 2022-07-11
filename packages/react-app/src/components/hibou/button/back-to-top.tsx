/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 21:43:39 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 22:23:59
 */

import React from 'react';
import styled from 'styled-components';

import colors from '../colors';
import { usePreferColorScheme } from '../toggle/dark-mode-toggle';


const Btn = styled.svg<{
  _display: boolean;
  busy: boolean;
  dark: boolean;
}>(({ _display, busy, dark }) => ({
  pointerEvents: _display ? 'all' : 'none',
  position: 'fixed',
  zIndex: 1,
  bottom: '22vh',
  right: '8vw',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  overflow: 'hidden',
  boxShadow: `
    0 0 12px ${colors.shadow}40,
    inset 0 0 16px #ffffff40
  `,
  cursor: 'pointer',
  opacity: _display ? busy ? 0.3 : 1 : 0,

  [dark ? '&' : 'x']: {
    backgroundColor: colors.backgroundDark,
  },

  [dark ? 'x' : '&']: {
    backgroundColor: colors.background,
  },

  '> path': {
    fill: `${colors.border}`,
    stroke: 'none',
  },

  transition: 'opacity 500ms',
}));

export interface BackToTopProps {
  /**
   * @default 0.6
   */
  displayThreshold?: number;
}

const BackToTop: React.FC<BackToTopProps> = React.memo(function BackToTop({
  displayThreshold = 0.6,
}) {
  const colorScheme = usePreferColorScheme();

  const [display, setDisplay] = React.useState(true);
  const [busy, setBusy] = React.useState(false);

  const handleClick = React.useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGSVGElement;

    let tmp: Element | null = target.parentElement;

    while (tmp) {
      const ele = tmp;

      ele.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      
      tmp = tmp.parentElement;
    }
  }, []);

  const ref = React.useRef<SVGSVGElement>();

  React.useEffect(() => {
    if (ref.current) {
      const containers: Element[] = [];
      
      let tmp: Element | null = ref.current.parentElement;

      while (tmp) {
        const ele = tmp;

        containers.push(ele);
        
        tmp = tmp.parentElement;
      }

      // debounce
      let flag = false;

      const check = () => {
        if (flag) {
          return;
        }

        flag = true;
        setTimeout(() => {
          flag = false;
        }, 200);

        const scrollY = containers.reduce<number>((val, cur) => {
          return val + cur.scrollTop;
        }, 0);
        
        const scrollHeight = window.innerHeight;
  
        setDisplay(scrollY >= scrollHeight * displayThreshold);
      };

      containers.forEach(e => {
        (e as HTMLElement).addEventListener('scroll', check);
      });

      check();

      return () => {
        containers.forEach(e => {
          (e as HTMLElement).removeEventListener('scroll', check);
        });
      };
    }

    return;
  }, [displayThreshold]);

  React.useEffect(() => {
    const handleMouseDown = () => {
      setBusy(true);
    };

    const handleMouseUp = () => {
      setBusy(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('touchcancel', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchcancel', handleMouseUp);
    };
  }, []);
  
  return (
    <Btn
      _display={display}
      busy={busy}
      dark={colorScheme === 'dark'}
      role="button"
      tabIndex={display ? undefined : -1}
      onClick={handleClick}
      onMouseDown={e => e.stopPropagation()}
      onMouseUp={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
      onTouchEnd={e => e.stopPropagation()}
      onTouchCancel={e => e.stopPropagation()}
      viewBox="0 0 40 40"
      ref={e => e && [ref.current = e]}
    >
      <path
        d={
          `M16,31 H24 V19 H32 L20,8 L9,19 H16 Z`
        }
      />
    </Btn>
  );
});


export default BackToTop;
