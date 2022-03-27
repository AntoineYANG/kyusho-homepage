/*
 * @Author: Kanata You 
 * @Date: 2022-03-27 19:26:10 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 19:27:30
 */

const useTitle = (title: string) => {
  (document.getElementsByTagName('title')[0] as HTMLTitleElement).innerText = title;
};


export default useTitle;
