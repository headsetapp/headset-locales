const localesNames = require('./locales-names.json');

// Add new languages that are passed with the variable LOCALE (can be multiple separated by a space)
let languages = [];
if (process.env.LOCALE) languages = process.env.LOCALE.split(' ');
const lngs = Object.keys(localesNames).concat(languages);

module.exports = {
  options: {
    debug: true,
    removeUnusedKeys: true,
    sort: true,
    func: {
      list: ['t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      extensions: ['.jsx'],
    },
    lngs,
    ns: ['core', 'wrapper'],
    defaultLng: 'en',
    defaultNs: 'core',
    defaultValue: '__NOT_TRANSLATED__',
    resource: {
      loadPath: 'locales/{{ns}}/{{lng}}.json',
      savePath: 'locales/{{ns}}/{{lng}}.json',
    },
  },
};
