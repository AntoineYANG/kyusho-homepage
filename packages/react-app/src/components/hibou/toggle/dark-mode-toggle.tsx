/*
 * @Author: Kanata You 
 * @Date: 2022-07-10 16:10:41 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 17:39:25
 */

import React from 'react';
import styled from 'styled-components';
import lottieWeb from 'lottie-web';

import colors from '../colors';

import animation from './lightdark-mode.json';


const ToggleContainer = styled.div<{ checked: boolean }>(({
  checked
}) => ({
  flexGrow: 0,
  flexShrink: 0,
  marginBlock: '0.7em',
  marginInline: '0.9em',
  width: '3.3em',
  height: '1.5em',
  borderRadius: '0.75em',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: checked ? 'rgb(20,28,67)' : 'rgb(248,251,248)',
  boxShadow: `
    inset 0.5px 0.5px 6px ${colors.shadow}40,
    0 0 4px ${colors.shadow}20
  `,
  overflow: 'hidden',

  '& *': {
    pointerEvents: 'none',
  },

  ':focus': {
    boxShadow: `
      inset 0.5px 0.5px 6px ${colors.shadow}aa,
      0 0 4px 2px ${colors.primary}80,
      0 0 4px ${colors.shadow}aa !important
    `,
  },

  transition: 'background-color 360ms 80ms',
}));

const ToggleThumb = styled.div<{ checked: boolean }>(({
  checked
}) => ({
  flexGrow: 0,
  flexShrink: 0,
  position: 'absolute',
  top: '50%',
  left: checked ? 'calc(1.8em + 2px)' : '3.6px',
  width: 'calc(1.5em - 6px)',
  height: 'calc(1.5em - 6px)',
  borderRadius: '50%',
  outline: 'none',
  transform: `translateY(-50%) rotate(${
    checked ? 360 : 270
  }deg) scale(3.5)`,
  filter: checked ? 'saturate(1.25) brightness(2)' : 'saturate(1.5)',
  transition: 'left 600ms, transform 520ms linear 40ms, filter 200ms',
}));

export type PreferColorScheme = 'light' | 'dark';

let state: PreferColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark' : 'light';  

const listeners: (() => void)[] = [];

export const usePreferColorScheme = () => {
  const [mode, setMode] = React.useState<PreferColorScheme>(state);

  React.useEffect(() => {
    const cb = () => requestAnimationFrame(() => {
      setMode(state);
    });

    listeners.push(cb);

    return () => {
      const which = listeners.findIndex(e => e === cb);

      if (which !== -1) {
        listeners.splice(which, 1);
      }
    };
  }, []);

  return mode;
};

export interface DarkModeToggleProps {
  /**
   * The default "checked" state of dark mode.
   * 
   * If not provided,
   * the state will be initialized to the value of
   * `prefers-color-scheme`.
   */
  defaultChecked?: boolean;
  /**
   * Handle the change of dark mode setting.
   */
  onChange?: (state: boolean) => void;
}

/**
 * Toggle for dark mode switch.
 * 
 * When initialized without props `"defaultChecked"`
 * or media `prefers-color-scheme` is changed,
 * the value will be set to `prefers-color-scheme`.
 * 
 * Manually change the value of this toggle will
 * emit an event which could be subscribed by the hook `"usePreferColorScheme()"`.
 */
const DarkModeToggle: React.FC<DarkModeToggleProps> = React.memo(function DarkModeToggle ({
  defaultChecked,
  onChange,
}) {
  const [darkMode, setDarkMode] = React.useState(
    defaultChecked ?? window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const nextState = darkMode ? 'dark' : 'light';

  if (state !== nextState) {
    state = nextState;
    listeners.forEach(cb => cb());
  }

  React.useEffect(() => {
    const cb = (ev: MediaQueryListEvent) => {
      setDarkMode(ev.matches);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', cb);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', cb);
    };
  }, []);

  React.useEffect(() => {
    onChange?.(darkMode);

    const prevCn = `hibou-color-scheme-${darkMode ? 'light' : 'dark'}`;
    const nextCn = `hibou-color-scheme-${darkMode ? 'dark' : 'light'}`;

    document.querySelectorAll(`.${prevCn}`).forEach(e => {
      e.classList.remove(prevCn);
      e.classList.add(nextCn);
    });

    document.querySelectorAll('.hibou-color-scheme-init').forEach(e => {
      e.classList.remove('hibou-color-scheme-init');
      e.classList.add(nextCn);
    });
  }, [darkMode, onChange]);

  const handleToggle = React.useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const handleKeyDown = React.useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === ' ') {
      handleToggle();
    }
  }, [handleToggle]);

  const animContainer = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (animContainer.current) {
      const anim = lottieWeb.loadAnimation({
        container: animContainer.current,
        renderer: 'svg',
        loop: 0,
        autoplay: false,
        animationData: animation,
      });

      anim.setSpeed(1.25);
      anim.playSegments(darkMode ? [38, 62] : [106, 151], true);

      return () => anim.destroy();
    }

    return;
  }, [darkMode]);

  return (
    <ToggleContainer
      role="checkbox"
      aria-checked={darkMode}
      tabIndex={0}
      checked={darkMode}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <ToggleThumb
        ref={animContainer}
        checked={darkMode}
      />
    </ToggleContainer>
  );
});


export default DarkModeToggle;
