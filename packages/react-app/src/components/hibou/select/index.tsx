/*
 * @Author: Kanata You 
 * @Date: 2022-07-10 19:43:21 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 14:07:19
 */

import React from 'react';
import styled from 'styled-components';

import colors from '@components/hibou/colors';
import { usePreferColorScheme } from '../toggle/dark-mode-toggle';


const Wrapper = styled.div<{
  dark: boolean;
  expanded: boolean;
  disabled: boolean;
  alignOptions: 'center' | 'left' | 'right';
  direction: 'bottom' | 'top';
}>(({
  dark,
  expanded,
  disabled,
  alignOptions,
  direction,
}) => ({
  position: 'relative',
  outline: 'none',
  marginBlock: '0.3em',
  border: `1px solid ${colors.border}80`,
  borderRadius: '2px',
  [`${dark ? '&' : 'x'}`]: {
    color: disabled ? '#888' : '#ddd',
  },
  [`${dark ? 'x' : '&'}`]: {
    color: disabled ? '#888' : '#222',
  },
  [`&:hover, &:focus${expanded ? ', &' : ''}`]: disabled ? {} : {
    backgroundColor: '#6662',
    [`${dark ? '&' : 'x'}`]: {
      color: '#eee',
    },
    [`${dark ? 'x' : '&'}`]: {
      color: '#111',
    },
  },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  cursor: 'pointer',

  '& label': {
    lineHeight: '1.6em',
  },

  '> label, > span': {
    userSelect: 'none',
    pointerEvents: 'none',
  },

  '> label': {
    display: 'block',
    marginInline: '0.6em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '> span': {
    display: 'block',
    width: '1.8em',
    textAlign: 'center',
    transform: `scaleY(0.5) translateY(${expanded ? 100 : 5}%)`,
    opacity: expanded ? 0 : 0.5,
    transition: 'transform 200ms, opacity 200ms',
  },

  '> div': {
    top: direction === 'bottom' ? '100%' : undefined,
    bottom: direction === 'top' ? '100%' : undefined,
    left: alignOptions === 'left' ? 0
      : alignOptions === 'center' ? '50%'
      : undefined,
    right: alignOptions === 'right' ? 0 : undefined,
    transform: alignOptions === 'center' ? 'translateX(-50%)' : undefined,
  },
}));

const GroupElement = styled.div<{ dark: boolean }>(({ dark }) => ({
  position: 'absolute',
  zIndex: 1,
  marginBlock: '0.1em',
  paddingBlock: '0.32em',
  paddingInline: 0,
  [`${dark ? '&' : 'x'}`]: {
    backgroundColor: '#0004',
    backdropFilter: 'brightness(0.9) blur(4px)',
    boxShadow: '2px 3px 2px 0px #0008',
  },
  [`${dark ? 'x' : '&'}`]: {
    backgroundColor: '#fff4',
    backdropFilter: 'brightness(1.1) blur(4px)',
    boxShadow: '2px 3px 2px 0px #0002',
  },
}));

const Splitter = styled.hr({
  margin: '0.4em 0.86em',
  borderInline: 'none',
  borderBlockStart: 'none',
  borderBlockEnd: '1px solid #888',
});

const Option = styled.div<{ disabled: boolean; dark: boolean }>(({
  disabled,
  dark,
}) => ({
  outline: 'none',
  whiteSpace: 'nowrap',
  paddingBlock: '0.15em',
  paddingInline: '0.3em',
  [`${dark ? '&' : 'x'}`]: {
    color: disabled ? '#888' : '#ddd',
  },
  [`${dark ? 'x' : '&'}`]: {
    color: disabled ? '#888' : '#222',
  },
  '&:hover, &:focus': disabled ? {} : {
    [`${dark ? '&' : 'x'}`]: {
      color: '#eee',
      backgroundColor: '#fff2',
    },
    [`${dark ? 'x' : '&'}`]: {
      color: '#111',
      backgroundColor: '#0002',
    },
  },
  cursor: disabled ? undefined : 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  lineHeight: '1.3em',

  '& *': {
    userSelect: 'none',
    pointerEvents: 'none',
  },

  '& > label': {
    flexGrow: 0,
    flexShrink: 0,
    marginInlineEnd: '0.4em',

    '&.label': {
      flexGrow: 1,

      '> span': {
        display: 'block',
        fontSize: '80%',
        lineHeight: '1.3em',
        marginBlockStart: '-0.2em',
        marginBlockEnd: '0.3em',
        opacity: 0.7,
      },
    },

    '&.checked': {
      margin: '0 0.4em',
      width: '1.2em',
      textAlign: 'center',
    },
  },
}));

export interface SelectOption<T> {
  /**
   * A label to group options.
   */
  group?: string;
  /**
   * Unique value.
   */
  value: T;
  /**
   * Display name, default to the JSON string of the value.
   */
  label?: string;
  /**
   * Description.
   */
  desc?: string;
  /**
   * @default false
   */
  disabled?: boolean;
}

interface SelectProps<T> {
  /**
   * @default false
   */
  disabled?: boolean;
  /**
   * Options of this item.
   */
  options: SelectOption<T>[];
  /**
   * Horizontal alignment of the option group.
   * 
   * @default "left"
   */
  alignOptions?: 'center' | 'left' | 'right';
  /**
   * Vertical position of the option group.
   * 
   * @default "bottom"
   */
  direction?: 'bottom' | 'top';
  /**
   * Length (em) of the text area.
   * 
   * @default 8
   */
  width?: number;
  /**
   * @default "right"
   */
  arrow?: 'none' | 'left' | 'right';

  value: SelectOption<T> | SelectOption<T>[];
  onChange: (
    | ((value: SelectOption<T>) => void)
    | ((value: SelectOption<T>[]) => void)
  );
}

const Group = <T extends any>({
  options,
  value,
  onChange,
  width = 8,
  dark,
}: SelectProps<T> & { dark: boolean }): JSX.Element => {
  const isMultiple = Array.isArray(value);

  const [finished, setFinished] = React.useState(false);

  return (
    <GroupElement dark={dark}>
      {
        options.map((item, i) => typeof item === 'string' ? (
          <Splitter
            key={i}
          />
        ) : (() => {
          const disabled = item.disabled ?? false;
          const active = isMultiple ? value.includes(item) : item === value;

          return (
            <Option
              dark={dark}
              role={isMultiple ? 'checkbox' : 'radio'}
              aria-selected={isMultiple ? undefined : active}
              aria-checked={isMultiple ? active : undefined}
              aria-disabled={disabled}
              disabled={disabled}
              key={i}
              tabIndex={disabled ? undefined : 0}
              onClick={
                e => {
                  if (finished) {
                    return;
                  }

                  if (disabled) {
                    return e.stopPropagation();
                  }

                  setFinished(true);

                  if (isMultiple) {
                    (onChange as (value: SelectOption<T>[]) => void)(
                      active ? value.filter(e => e !== item) : [...value, item]
                    );
                  } else if (value !== item) {
                    (onChange as (value: SelectOption<T>) => void)(item);
                  }
                }
              }
              onKeyPress={
                e => {
                  if (e.key === 'Enter') {
                    e.currentTarget.click();
                  }
                }
              }
            >
              <label className="checked" >
                {active ? '\u2713' : ''}
              </label>
              <label
                className="label"
                style={{
                  minWidth: `${width}em`,
                }}
              >
                {
                  formatSelectTitle(item)
                }
                {
                  item.desc && (
                    <span>
                      {item.desc}
                    </span>
                  )
                }
              </label>
            </Option>
          );
        })())
      }
    </GroupElement>
  );
};

const formatSelectTitle = (option: SelectOption<unknown>): string => {
  return option.label ?? (
    typeof option.value === 'string' ? option.value : JSON.stringify(option.value)
  );
};

export interface SingleSelectProps<T> extends SelectProps<T> {
  /**
   * Currently selected option.
   */
  value: SelectOption<T>;
  /**
   * Listener triggered when the selected item changes.
   */
  onChange: (value: SelectOption<T>) => void;
}

let removeFocus: (() => void) | undefined = undefined;

/**
 * A group of selectable items.
 */
export const SingleSelect = <T extends any = string>({
  disabled = false,
  options,
  value,
  onChange,
  alignOptions = 'left',
  direction = 'bottom',
  width = 8,
  arrow = 'right',
}: SingleSelectProps<T>): JSX.Element => {
  if (!options.includes(value)) {
    throw new Error('Current value of the select is not in the given options.');
  }

  const colorScheme = usePreferColorScheme();

  const [expanded, setExpanded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>();

  const clickThisRef = React.useRef(false);

  React.useEffect(() => {
    if (expanded) {
      const blur = () => setExpanded(false);

      removeFocus?.();
      removeFocus = blur;

      const handleClick = () => {
        if (clickThisRef.current) {
          clickThisRef.current = false;

          return;
        }

        setExpanded(false);
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && ref.current) {
          let focus = document.querySelector(':focus');

          while (focus && focus !== document.body) {
            if (focus === ref.current) {
              return;
            }

            focus = focus.parentElement;
          }
          
          setExpanded(false);
        }
      };

      document.addEventListener('click', handleClick);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keyup', handleKeyUp);
        
        if (removeFocus === blur) {
          removeFocus = undefined;
        }
      };
    }

    return;
  }, [expanded, setExpanded]);

  const handleMouseEnter = React.useCallback(() => {
    if (disabled || expanded) {
      return;
    }

    removeFocus?.();

    setExpanded(true);
  }, [disabled, expanded]);

  const handleMouseLeave = React.useCallback(() => {
    if (disabled || !expanded) {
      return;
    }

    removeFocus?.();

    setExpanded(false);
  }, [disabled, expanded]);

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    clickThisRef.current = e.target === e.currentTarget;
  }, []);

  return (
    <Wrapper
      role="radiogroup"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      dark={colorScheme === 'dark'}
      expanded={expanded}
      alignOptions={alignOptions}
      direction={direction}
      disabled={false}
      ref={e => e && [ref.current = e]}
    >
      {
        arrow === 'left' && (
          <span>
            {'\u02c5'}
          </span>
        )
      }
      <label
        style={{
          width: `${width}em`,
        }}
      >
        {
          formatSelectTitle(value)
        }
      </label>
      {
        arrow === 'right' && (
          <span>
            {'\u02c5'}
          </span>
        )
      }
      {
        expanded && (
          <Group<T>
            options={options}
            value={value}
            onChange={onChange}
            width={width}
            dark={colorScheme === 'dark'}
          />
        )
      }
    </Wrapper>
  );
};
