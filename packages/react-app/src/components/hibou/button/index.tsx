/*
 * @Author: Kanata You 
 * @Date: 2022-06-13 16:36:56 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 19:58:09
 */

import React from 'react';
import styled from 'styled-components';

import colors from '@components/hibou/colors';
import { useConfirm } from '@components/hibou/confirm';


const ButtonContainer = styled.div<{
  size: number;
  rounded?: boolean;
  running?: boolean;
}>(({
  size,
  rounded = false,
  running = false,
}) => ({
  flexShrink: 0,
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBlock: `${0.36 * size / 100}em`,
  marginInline: `${0.42 * size / 100}em`,
  borderRadius: rounded ? `${0.7 + 0.78 * size / 100}em` : '1px',
  paddingBlock: '0',
  paddingInline: '0',
  overflow: 'hidden',
  userSelect: 'none',

  '::before': running ? {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    backgroundImage: `conic-gradient(
      transparent,
      ${colors.primary}07,
      ${colors.primary}47,
      ${colors.primary} 27.5%,
      transparent 29%
    )`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: '0 0',
    pointerEvents: 'none',
    animation: 'rotate 2400ms linear infinite',
  } : {},

  '@keyframes rotate': {
    '100%': {
      transform: 'rotate(1turn)',
    },
  },
}));

const ButtonElement = styled.div<{
  size: number;
  rounded?: boolean;
  disabled?: boolean;
  primary?: boolean;
  danger?: boolean;
  running?: boolean;
}>(({
  size,
  rounded = false,
  disabled = false,
  primary = false,
  danger = false,
  running = false,
}) => ({
  flexShrink: 0,
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBlock: '2px',
  marginInline: '2px',
  borderRadius: rounded ? `${0.7 + 0.78 * size / 100}em` : '1px',
  paddingBlock: `${0.3 * size / 100}em`,
  paddingInline: `${0.78 * size / 100}em`,
  userSelect: 'none',
  cursor: running ? 'wait'
    : disabled ? 'not-allowed' : 'pointer',
  backgroundImage: !primary && !danger && !disabled
    ? `linear-gradient(${colors.primary}1b, ${colors.primary}1b)`
    : undefined,
  filter: running ? 'brightness(0.75)'
    : !primary && !danger && !disabled
    ? 'grayscale(0.4)'
    : undefined,
  fontSize: `${size}%`,
  lineHeight: '1.4em',
  fontWeight: '500',
  color: `#${
    primary || danger ? 'edf6fd' : '4d545c'
  }${running ? '88' : ''}`,
  '@media (prefers-color-scheme: light)': {
    backgroundColor: primary ? `${colors.primary}`
      : danger ? `${colors.danger}`
      : disabled ? `#22222230`
      : colors.background,
    border: `1px solid ${
      primary ? `${colors.primary}`
        : danger ? `${colors.danger}`
        : disabled ? `#22222230`
        : colors.background
    }`,
  },
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: primary ? `${colors.primary}`
      : danger ? `${colors.danger}`
      : disabled ? `#dddddd30`
      : colors.backgroundDark,
    border: `1px solid ${
      primary ? `${colors.primary}`
        : danger ? `${colors.danger}`
        : disabled ? `#dddddd30`
        : colors.backgroundDark
    }`,
  },
  ':hover': disabled || running ? {} : {
    filter: 'brightness(1.08)',
  },
  ':focus': disabled || running ? {} : {
    border: danger || primary ? `1px solid ${colors.background}ee` : `1px solid ${colors.primary}40`,
    boxShadow: `
      0 0 ${danger || primary ? 5 : 4}px ${danger || primary ? 2 : 1}px ${
        danger ? colors.danger : colors.primary
      }80
    `,
  },
  outline: 'none',
  whiteSpace: 'nowrap',
  flexWrap: 'nowrap',
  transition: 'background 30ms, box-shadow 60ms, filter 80ms',
}));

export interface ButtonProps {
  /**
   * The event to trigger when the button is clicked.
   * This method could be async.
   * The button will be disabled until the function returns a resolved value.
   */
  callback: () => (any | Promise<any>);
  /**
   * Whether the button is disabled.
   * 
   * @default false
   */
  disabled?: boolean;
  /**
   * Makes the corners of the button be rounded.
   * 
   * @default false
   */
  rounded?: boolean;
  /**
   * Confirmation determine whether the operation should be triggered.
   * 
   * If confirmation is required,
   * an object is supposed to be given.
   * 
   * optional `object.title` - title of the popover/dialog.
   * 
   * required `object.desc` - text to display.
   * 
   * required `object.type` - display mode.
   * 
   * valid values:
   * * `false` - do not confirm. (default)
   * * `"popover"` - show a popover. (default when `type` is `"danger"`)
   * * `"dialog"` - open a dialog.
   */
  shouldConfirm?: false | {
    type: 'popover' | 'dialog';
    title: string;
    desc: string;
  };
  /**
   * Size of the button.
   * 
   * valid values:
   * * `"small"`
   * * `"normal"`
   * * `"big"`
   * 
   * @default "normal"
   */
  size?: 'small' | 'normal' | 'big';
  /**
   * Preventing the button from being triggered too frequently,
   * once triggered,
   * it will be disabled temporarily.
   * 
   * @default 200
   */
  throttleTime?: number;
  /**
   * Explain the behavior of this button.
   * 
   * valid values:
   * + `"normal"`
   * + `"primary"`
   * + `"danger"`
   * 
   * @default "normal"
   */
  type?: 'normal' | 'primary' | 'danger';
}

/**
 * An interactive item,
 * trigger an operation when clicked.
 * 
 * Once a `Button` is clicked,
 * it will be inactive until the triggered operation returns a resolved value.
 * 
 * Confirmation can be required to be invoked after a `Button` is clicked,
 * to show some warnings and decide whether the operation should be executed.
 */
const Button: React.FC<ButtonProps & { children: any }> = React.memo(function Button ({
  callback,
  type = 'normal',
  disabled = false,
  rounded = false,
  shouldConfirm = type === 'danger' ? {
    type: 'popover',
    title: 'Confirmation',
    desc: 'Are you sure about what you are doing?',
  } : false,
  throttleTime = 200,
  size = 'normal',
  children
}) {
  const [running, setRunning] = React.useState(false);
  /**
   * Same as `running`, but synchronized.
   */
  const isRunningRef = React.useRef(false);

  const handler = React.useCallback(() => {
    if (disabled || isRunningRef.current) {
      return;
    }

    isRunningRef.current = true;
    setRunning(true);

    const beginTime = Date.now();

    Promise.resolve(callback()).then(() => {
      const settleTime = Date.now();

      const timeCost = settleTime - beginTime;

      if (timeCost < throttleTime) {
        setTimeout(() => {
          isRunningRef.current = false;
          setRunning(false);
        }, throttleTime - timeCost);
      } else {
        isRunningRef.current = false;
        setRunning(false);
      }
    });
  }, [callback, disabled, throttleTime]);

  let [Wrapper, blocked, execute] = useConfirm(handler);

  if (!shouldConfirm) {
    Wrapper = React.Fragment;
    execute = handler;
  }

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute();
    } else if (e.key === 'Escape') {
      (e.target as HTMLDivElement).blur();
    }
  }, [execute]);

  return (
    <Wrapper>
      <ButtonContainer
        size={{
          small: 80,
          normal: 100,
          big: 120
        }[size] ?? 100}
        rounded={rounded}
        running={running}
      >
        <ButtonElement
          role="button"
          tabIndex={disabled ? undefined : 0}
          onClick={execute}
          onKeyDown={handleKeyDown}
          size={{
            small: 80,
            normal: 100,
            big: 120
          }[size] ?? 100}
          rounded={rounded}
          primary={type === 'primary'}
          danger={type === 'danger'}
          disabled={disabled}
          aria-disabled={disabled}
          running={running || blocked}
        >
          {children}
        </ButtonElement>
      </ButtonContainer>
    </Wrapper>
  );
});


export default Button;
