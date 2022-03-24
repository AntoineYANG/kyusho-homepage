/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 00:48:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 00:53:41
 */

const { execSync } = require('child_process');


const main = () => {
  try {
    console.log(
      execSync(
        'cd ../build & git add . & git commit -m "Auto Publish" & git push origin master',
        {
          encoding: 'utf-8'
        }
      )
    );

    return 0;
  } catch (error) {
    return 1;
  }
};


process.exit(main());
