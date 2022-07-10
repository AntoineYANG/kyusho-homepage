/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 18:45:53 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 23:34:50
 */

import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUsTrans from './en-us.json';
import zhCnTrans from './zh-cn.json';
import jaTrans from './ja.json';


const resources = {
  'en-US': {
    name: 'English (United States)',
    locale: 'English (US)',
    translation: enUsTrans
  },
  'zh-CN': {
    name: 'Chinese (China Mainland)',
    locale: '简体中文',
    translation: zhCnTrans
  },
  'ja-JP': {
    name: 'Japanese (Japan)',
    locale: '日本語',
    translation: jaTrans
  },
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

export const supportedLanguages = Object.entries(resources).map(([k, v]) => ({
  value: k,
  name: v.name,
  locale: v.locale,
}));
