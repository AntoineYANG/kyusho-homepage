/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 15:46:53 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-24 16:02:35
 */
'use strict';

const fs = require('fs-extra');


const copyPublicDir = (source, outputPath, template) => {
  fs.copySync(
    source,
    outputPath, {
      dereference: true,
      filter:      file => file !== template,
    }
  );
};


module.exports = copyPublicDir;
