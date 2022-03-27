/*
 * @Author: Kanata You 
 * @Date: 2022-03-27 18:12:25 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 21:11:05
 */

import axios from 'axios';


export class FetchError extends Error {
  
  readonly clause: Error | undefined;

  constructor(msg: string, options?: { clause?: Error }) {
    super(msg);
    this.clause = options?.clause;
  }

}

const getArticle = async (aid: string): Promise<string | null> => {
  try {
    const res = (
      await axios.get(
        ARTICLE_API.replace('[aid]', aid), {
          headers: {
            Accept: 'text/plain'
          }
        }
      )
    ).data as string;
    
    return res;
  } catch (error) {
    console.error(new FetchError(
      `aid ${aid} not found`, {
        clause: error
      }
    ));
    
    return null;
  }
};


export default getArticle;
