/*
 * @Author: Kanata You 
 * @Date: 2022-06-13 16:36:56 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 19:22:41
 */

import React from 'react';
import styled from 'styled-components';

import colors from '@components/hibou/colors';
import Button from '@components/hibou/button';


const Wrapper = styled.div({
  display: 'inline-block',
  position: 'relative',
  margin: 0,
  padding: 0,
  border: 'none',
});

const ConfirmPopup = styled.div<{
}>(({

}) => ({
  position: 'absolute',
  zIndex: 999,
  left: '50%',
  bottom: '100%',
  border: `1px solid ${colors.border}`,
  fontSize: '0.98rem',
  width: '16em',
  paddingBlockStart: '0.8em',
  paddingBlockEnd: '0',
  paddingInline: '0.6em',
  backgroundColor: 'green',
  transform: 'translateX(-50%)',
  '@media (prefers-color-scheme: light)': {
    backgroundColor: colors.background,
    color: colors.font,
  },
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: colors.backgroundDark,
    color: colors.fontDark,
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  '> div': {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',

    '&:first-child': {
      justifyContent: 'center',
      paddingInline: '0.3em',
    },
    '&:last-child': {
      justifyContent: 'flex-end',
      marginBlockStart: '0.8em',
      marginBlockEnd: '0.4em',
    },
  },
}));

export interface ConfirmProps {
  /**
   * Whether the dialog should display.
   */
  display: boolean;
  /**
   * The mode to display.
   * 
   * valid value:
   * + `"popup"` - display it right upon the interactive area. (default)
   * + `"dialog"` - display it as a dialog covering the whole page.
   */
  type?: 'popup' | 'dialog';
  /**
   * The operation to trigger when 'ok' is submitted.
   */
  onNext: () => void;
  /**
   * The operation to trigger when 'cancel' is submitted.
   */
  onCancel: () => void;
}

/**
 * A dialog displaying when an operation should be
 * confirmed again before straightly invoke it.
 */
const Confirm: React.FC<ConfirmProps & { children: any }> = React.memo(function Confirm ({
  display,
  type = 'popup',
  onNext,
  onCancel,
  children
}) {
  const Element = type === 'popup' ? ConfirmPopup : ConfirmPopup;

  return (
    <Wrapper>
      {children}
      {
        display && (
          <Element
            role="dialog"
            aria-live={type === 'popup' ? 'polite' : 'assertive'}
            aria-modal={type === 'dialog'}
            // tabIndex={disabled ? undefined : 0}
            // onClick={handler}
            // onKeyDown={handleKeyDown}
            // rounded={rounded}
            // primary={type === 'primary'}
            // danger={type === 'danger'}
            // disabled={disabled}
            // aria-disabled={disabled}
            // running={running}
          >
            <div>
              This operation may cause massive effect.
              Please make sure that you know what you are doing.
            </div>
            <div>
              <Button
                size="small"
                callback={onNext}
                type="danger"
                shouldConfirm={false}
              >
                I'm sure
              </Button>
              <Button
                size="small"
                callback={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Element>
        )
      }
    </Wrapper>
  );
});

export const useConfirm = (
  func: () => void, options: Omit<ConfirmProps, 'onNext' | 'onCancel' | 'display'> = {}
): [
  React.NamedExoticComponent<{
    children: any;
  }>,
  boolean,
  () => void
] => {
  const [display, setDisplay] = React.useState(false);
  /**
   * Same as `display`, but synchronized.
   */
  const displayRef = React.useRef(false);

  const ConfirmWrapper = React.memo<{ children: any }>(({ children }) => (
    <Confirm
      {...options}
      display={display}
      onCancel={() => {
        setDisplay(false);
        displayRef.current = false;
      }}
      onNext={() => {
        setDisplay(false);
        displayRef.current = false;
        func();
      }}
    >
      {children}
    </Confirm>
  ));

  const callback = () => {
    if (displayRef.current) {
      return;
    }

    displayRef.current = true;
    setDisplay(true);
  };

  return [
    ConfirmWrapper,
    display,
    callback
  ];
};


export default Confirm;
