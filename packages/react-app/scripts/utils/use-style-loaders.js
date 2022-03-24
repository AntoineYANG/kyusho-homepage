/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 21:18:41 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-18 23:25:09
 */
'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');


const useStyleLoaders = (
  isDev,
  cssOptions,
  preProcessor,
  dir,
  paths,
  enableSourceMap
) => {
  const loaders = [
    isDev && require.resolve('style-loader'),
    !isDev && {
      loader:  MiniCssExtractPlugin.loader,
      // css is located in `static/css`, use '../../' to locate index.html folder
      // in production `paths.publicUrlOrPath` can be a relative path
      options: paths.referencePath.startsWith('.')
        ? { publicPath: '../../' }
        : {},
    },
    {
      loader:  require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader:  require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env'
          ],
          sourceMap: isDev || enableSourceMap,
        },
      },
    },
  ].filter(Boolean);

  if (preProcessor) {
    loaders.push(
      {
        loader:  require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isDev || enableSourceMap,
          root:      dir
        },
      },
      {
        loader:  require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};


module.exports = useStyleLoaders;
