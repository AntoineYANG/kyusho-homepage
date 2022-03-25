/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 19:14:41 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 21:56:51
 */

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


const LANGS = {
  'zh-CN': '简体中文',
  'en-US': 'English (US)',
  'ja-JP': '日本語'
};

const Container = styled.div({
  zIndex: '9999',
  position: 'fixed',
  top: 16,
  right: 19,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.85rem',
  width: '7.4em',
  height: '1.95em',
  lineHeight: '1.95em',
  textAlign: 'center',
  color: '#000e',
  textShadow: '0 0 5px #fff, 0 0 3px #fff, 0 0 2px #fff',
  userSelect: 'none'
});

const Current = styled.div<{ active: boolean }>(({ active }) => ({
  backgroundColor: `rgba(242,232,246,${active ? 0.33 : 0.12})`,
  border: '1px solid rgb(185,112,236)',
  borderRadius: '0.8em',
  backdropFilter: 'blur(2px)',
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'background-color 200ms'
}));

const OptionGroup = styled.div({
});

const _OptionContainer = styled.div<{ active: boolean }>`
  background-color: ${({ active }) => `rgba(242,232,246,${active ? 0.6 : 0.25})`};
  padding: ${({ active }) => active ? '3px' : 0};
  border-radius: 0.8em;
  user-select: none;
  cursor: pointer;
  transition: padding 200ms;
  animation: rotation 1s infinite;
  background-image: ${({ active }) => active ? (
'conic-gradient(from 0deg, rgb(200,124,251), #0000, rgb(200,124,251), #0000, rgb(200,124,251) 80%)'
) : undefined};
`;

const _Option = styled.div<{ active: boolean }>(({ active }) => ({
  backgroundColor: `rgba(242,232,246,${active ? 1 : 0.25})`,
  backgroundImage: active ? (
    'linear-gradient(31deg, rgb(134,81,170) 6%, rgba(134,81,170,0.65), rgba(134,81,170,0.6), rgb(134,81,170) 88%)'
  ) : undefined,
  borderRadius: '0.8em',
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'background 200ms'
}));

const Option: React.FC<{ onClick: () => void }> = ({ children, onClick }) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <_OptionContainer
      active={focused}
    >
      <_Option
        role="option"
        aria-selected="false"
        active={focused}
        onFocus={() => !focused && setFocused(true)}
        onBlur={() => focused && setFocused(false)}
        onMouseOver={() => !focused && setFocused(true)}
        onMouseOut={() => focused && setFocused(false)}
        onTouchStart={() => !focused && setFocused(true)}
        onTouchEnd={() => focused && setFocused(false)}
        onMouseUp={() => focused && setFocused(false)}
        onClick={
          () => {
            onClick();
            setFocused(false);
          }
        }
      >
        {children}
      </_Option>
    </_OptionContainer>
  );
};

const LangSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    if (focused) {
      const cb = () => setFocused(false);
  
      document.body.addEventListener('click', cb);
  
      return document.body.removeEventListener('click', cb);
    }

    return;
  }, [focused, setFocused]);
  
  return (
    <Container
      onMouseOver={() => !focused && setFocused(true)}
      onMouseLeave={() => focused && setFocused(false)}
      onClick={e => !focused && [setFocused(true), e.stopPropagation()]}
    >
      <Current
        active={focused}
        role="option"
        aria-selected="true"
        aria-label="language"
      >
        {LANGS[i18n.language as keyof typeof LANGS] ?? i18n.language}
      </Current>
      {
        focused && (
          <OptionGroup>
            {
              Object.entries(LANGS).map(([lang, name]) => lang !== i18n.language && (
                <Option
                  key={lang}
                  onClick={() => {
                    i18n.changeLanguage(lang);
                  }}
                >
                  {name}
                </Option>
              ))
            }
          </OptionGroup>
        )
      }
    </Container>
  );
};


export default LangSwitch;
