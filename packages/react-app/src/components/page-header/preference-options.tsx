/*
 * @Author: Kanata You 
 * @Date: 2022-07-10 15:47:57 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 23:00:06
 */

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import DarkModeToggle from '@components/hibou/toggle/dark-mode-toggle';
import { SingleSelect } from '@components/hibou/select';
import { supportedLanguages } from '@locales/i18n';


const BtnGroup = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

const LangSwitch: React.FC = React.memo(function LangSwitch () {
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

  const languages = supportedLanguages.map(e => ({
    value: e.value,
    label: e.locale,
    desc: e.name,
  }));
  const value = languages.find(e => e.value === i18n.language) ?? languages[0]!;

  if (value.value !== i18n.language) {
    i18n.changeLanguage(value.value);
  }
  
  return (
    <SingleSelect<string>
      alignOptions="right"
      options={languages}
      value={value}
      onChange={d => i18n.changeLanguage(d.value)}
    />
  );
});

const PreferenceOptions: React.FC = React.memo(function PreferenceOptions () {

  return (
    <BtnGroup>
      <LangSwitch />
      <DarkModeToggle />
    </BtnGroup>
  );
});


export default PreferenceOptions;
