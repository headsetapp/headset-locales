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

// Retrieves the values and returns an array for testing
function retrieveValues(nmPath) {
  const file = fs.readFileSync(nmPath, 'utf8');
  const json = JSON.parse(file);
  return Object.values(json);
}

if (!retrieveValues(wrapperPath).every(isTranslated)) {
  console.error('There\'s untranslated strings on English wrapper json');
  process.exit(1);
}

if (!retrieveValues(corePath).every(isTranslated)) {
  console.error('There\'s untranslated strings on English core json');
  process.exit(1);
}

console.log('All English keys are translated');
