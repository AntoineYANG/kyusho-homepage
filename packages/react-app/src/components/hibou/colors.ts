/*
 * @Author: Kanata You 
 * @Date: 2022-06-24 19:29:44 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 13:26:30
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
  background: '#f1f2ec',
  backgroundDark: '#0c0d0f',
  font: '#1f1d18',
  fontDark: '#d3d4ce',
  shadow: '#4e4e4e',
  border: '#b2b2b2',
  primary: '#0A4AAD',
  danger: '#e4442f',
  iconColor: '#999999',
};


export default colors as Readonly<ColorSet>;
