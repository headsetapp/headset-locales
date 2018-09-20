const fs = require('fs');
const path = require('path');

const wrapperPath = path.join(__dirname, '../locales', 'wrapper', 'en.json');
const corePath = path.join(__dirname, '../locales', 'core', 'en.json');

// Removes all keys that have NOT_TRANSLATED values
function isTranslated(value) {
  if (value === '__NOT_TRANSLATED__') {
    return false;
  }
  return true;
}

if (!Object.values(JSON.parse(fs.readFileSync(wrapperPath, 'utf8'))).every(isTranslated)) {
  console.error('There\'s untranslated strings on English wrapper json');
  process.exit(1);
}

if (!Object.values(JSON.parse(fs.readFileSync(corePath, 'utf8'))).every(isTranslated)) {
  console.error('There\'s untranslated strings on English core json');
  process.exit(1);
}
