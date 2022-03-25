/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 18:45:53 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 19:11:45
 */

import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUsTrans from './en-us.json';
import zhCnTrans from './zh-cn.json';
import jaTrans from './ja.json';


const resources = {
  en: {
    translation: enUsTrans
  },
  zh: {
    translation: zhCnTrans
  },
  ja: {
    translation: jaTrans
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
