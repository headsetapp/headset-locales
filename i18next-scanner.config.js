const localesNames = require('./locales-names.json');

// Add new languages that are passed with the variable NEW_LANG (can be multiple separated by space)
let languages = [];
if (process.env.NEW_LANG) { languages = process.env.NEW_LANG.split(' '); }
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
