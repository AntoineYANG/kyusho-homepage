/*
 * @Author: Kanata You 
 * @Date: 2022-03-20 16:03:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-20 16:07:51
 */

/**
 * @returns {import('webpack-dev-server').Configuration['proxy']}
 */
const useProxyConfig = () => {
  try {
    return require('../../configs/dev-proxy');
  } catch (error) {
    return undefined;
  }
};


module.exports = useProxyConfig;
