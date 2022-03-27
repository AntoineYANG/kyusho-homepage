/*
 * @Author: Kanata You 
 * @Date: 2022-03-27 22:34:51 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 22:36:27
 */

const isMobile = () => {
  try {
    return [
      'Android', 'iPhone','SymbianOS', 'Windows Phone','iPad', 'iPod'
    ].some(tag => navigator.userAgent.includes(tag));
  } catch (error) {
    return true;
  }
};


export default isMobile;
