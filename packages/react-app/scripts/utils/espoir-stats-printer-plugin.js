'use strict';

const { execSync } = require('child_process');
const path = require('path');
let chalk = null;
import('chalk').then(mod => chalk = mod.default);

const formatSize = require('./format-size');


/** @type {Record<string, string | Function>} */
const ITEM_NAMES = {
  'compilation.modules[]': 'module',
  'compilation.errors[]': 'error',
  'compilation.warnings[]': 'error',
  'compilation.logging[]': 'loggingGroup'
};

/** @type {Record<string, (items: ({ element: string, content: string })[], context: StatsPrinterContext) => string>} */
const SIMPLE_ELEMENT_JOINERS = {
  compilation: items => {
    const msg = items.filter(item => {
      return item.element === 'summary!' && item.content;
    }).map(item => item.content).join('');

		try {
			console.clear();
			execSync(process.platform === 'win32' ? 'cls' : 'clear');
		} catch (error) {}
		
    console.log(`${
      chalk ? chalk.bgGreen.white.bold('Compilation completed') : '[Compilation completed]'
    }  ${
      msg
    }`);

    return '';
  },
  module: (_items, { module: _m }) => {
    if (_m && _m.type === 'modules by path' && (_m.name || '').endsWith('/')) {
      if (_m.name.match(/^.*\/\.espoir\/\.modules\/.+$/)) {
        return '';
      }

      const dir = path.resolve(process.cwd(), _m.name);
      const name = [dir.replace(/\\/g, '/').replace(
        /^.*\/\.espoir\/\.modules$/, '[node_modules]'
      ).replace(
        /^.*\/packages\/[^/]+\//, './'
      )].map(n => {
        if (chalk) {
          return n === '[node_modules]' ? chalk.blue(n) : chalk.blueBright.bold(n)
        }

        return n;
      })[0];
      const size = formatSize(_m.size);

      console.log(` |- ${
        name
      }  ${
        chalk ? chalk.green(size) : size
      }${
        _m.children && !dir.match(/^.*\/\.espoir\/\.modules$/) ? _m.children.filter(
          child => child.type === 'module' && !(child.name || '!').match(/[!?]/)
        ).sort(
          (a, b) => {
            for (let i = 0; i < a.length && i < b.length; i += 1) {
              const ca = _a.charCodeAt(i);
              const cb = _b.charCodeAt(i);

              if (ca !== cb) {
                return ca - cb;
              }
            }

            return a.length - b.length;
          }
        ).map(
          child => {
            const _name = chalk.blueBright.bold(
              `./${
                path.relative(
                  dir,
                  path.resolve(process.cwd(), child.name)
                ).replace(/\\/g, '/')
              }`.replace(/^(\.\/){2}/, './')
            );
            const _size = formatSize(child.size);

            return `\n     |- ${_name}  ${
              chalk ? chalk.green(_size) : _size
            }`;
          }
        ).join('') : ''
      }`);
    }

    return '';
  }
};


class EspoirStatsPrinterPlugin {
  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    compiler.hooks.compilation.tap('EspoirStatsPrinterPlugin', compilation => {
      compilation.hooks.statsPrinter.tap(
        'EspoirStatsPrinterPlugin',
        (stats, _options, _context) => {
          for (const key of Object.keys(ITEM_NAMES)) {
            const itemName = ITEM_NAMES[key];
            stats.hooks.getItemName
              .for(key)
              .tap(
                'EspoirStatsPrinterPlugin',
                typeof itemName === 'string' ? () => itemName : itemName
              );
          }

          for (const key of Object.keys(SIMPLE_ELEMENT_JOINERS)) {
            const joiner = SIMPLE_ELEMENT_JOINERS[key];
            stats.hooks.printElements
              .for(key)
              .tap('EspoirStatsPrinterPlugin', joiner);
          }
        }
      );
    });
  }
}


module.exports = EspoirStatsPrinterPlugin;
