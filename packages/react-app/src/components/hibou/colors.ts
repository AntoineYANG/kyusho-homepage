/*
 * @Author: Kanata You 
 * @Date: 2022-06-24 19:29:44 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 15:44:06
 */

export interface ColorSet {
  background: string;
  backgroundDark: string;
  font: string;
  fontDark: string;
  shadow: string;
  border: string;
  primary: string;
  danger: string;
  iconColor: string;
}

const colors: ColorSet = {
  background: '#fcfcfc',
  backgroundDark: '#141414',
  font: '#434343',
  fontDark: '#ababab',
  shadow: '#4e4e4e',
  border: '#b2b2b2',
  primary: '#0A4AAD',
  danger: '#e4442f',
  iconColor: '#999999',
};


export default colors as Readonly<ColorSet>;
