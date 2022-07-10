/*
 * @Author: Kanata You 
 * @Date: 2022-07-10 14:31:28 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 19:18:52
 */

import React from 'react';
import styled from 'styled-components';

import colors from '@components/hibou/colors';


const ToggleContainer = styled.div<{ disabled: boolean; checked: boolean }>(({
  disabled, checked
}) => ({
  flexGrow: 0,
  flexShrink: 0,
  marginBlock: '0.7em',
  marginInline: '0.9em',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  outline: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: disabled ? colors.border : checked ? colors.primary : colors.border,
  opacity: disabled ? 0.7 : undefined,
  boxShadow: `
    inset 0.5px 0.5px 6px ${colors.shadow}aa,
    0 0 4px ${colors.shadow}80
  `,
  filter: !disabled && checked ? 'saturate(1.5)' : undefined,
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

  transition: 'background-color 400ms, filter 400ms',
}));

const ToggleThumb = styled.div({
  flexGrow: 0,
  flexShrink: 0,
  position: 'absolute',
  top: '50%',
  borderRadius: '50%',
  outline: 'none',
  backgroundColor: colors.background,
  transform: 'translateY(-50%)',
  boxShadow: `
    -2px 0 8px 3px ${colors.shadow}60
  `,
  transition: 'left 400ms',
});

export interface ToggleProps {
  /**
   * Whether the "checked" state is `true`.
   */
  checked: boolean;
  /**
   * Handle the change of the "checked" state.
   */
  onChange: (checked: boolean) => void;
  /**
   * Whether the button is disabled, default to `false`.
   */
  disabled?: boolean;
  /**
   * Adjust the size of the toggle.
   */
  size?: number;
  /**
   * Adjust the width of the toggle.
   */
  width?: number;
}

/**
 * A toggle button.
 */
const Toggle: React.FC<ToggleProps> = React.memo(function Toggle ({
  checked,
  onChange,
  disabled = false,
  size = 1,
  width = 1,
}) {
  const handleToggle = React.useCallback(() => {
    if (disabled) {
      return;
    }

    onChange(!checked);
  }, [checked, onChange, disabled]);

  const handleKeyDown = React.useCallback((ev: React.KeyboardEvent) => {
    if (ev.key === ' ') {
      handleToggle();
    }
  }, [handleToggle]);

  return (
    <ToggleContainer
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? undefined : 0}
      disabled={disabled}
      checked={checked}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      style={{
        width: `${3.05 * size * width}em`,
        height: `${1.5 * size}em`,
        borderRadius: `${0.75 * size}em`,
      }}
    >
      <ToggleThumb
        style={{
          left: checked ? `calc(${3.05 * size * width - 1.4 * size}em + 2px)` : '3px',
          width: `calc(${1.5 * size}em - 6px)`,
          height: `calc(${1.5 * size}em - 6px)`,
        }}
      />
    </ToggleContainer>
  );
});


export default Toggle;
