const fs = require('fs');
const path = require('path');

const wrapperPath = path.join(__dirname, '../locales', 'wrapper');
const corePath = path.join(__dirname, '../locales', 'core');

const wrapperFilenames = fs.readdirSync(wrapperPath);
const coreFilenames = fs.readdirSync(corePath);

// Removes all keys that have NOT_TRANSLATED values
function notTranslated(key, value) {
  if (value === '__NOT_TRANSLATED__') {
    return undefined;
  }
  return value;
}

// Rewrites JSON language files for wrapper
wrapperFilenames.forEach((file) => {
  // Don't change the English translation.
  // This should be left so errors can happen on Travis and core deploy script
  if (file === 'en.json') { return; }

  const filePath = path.join(wrapperPath, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fs.writeFileSync(filePath, `${JSON.stringify(json, notTranslated, 2)}\n`);
});

// Rewrites JSON language files for core
coreFilenames.forEach((file) => {
  // Don't change the English translation.
  // This should be left so errors can happen on Travis and core deploy script
  if (file === 'en.json') { return; }

  const filePath = path.join(corePath, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fs.writeFileSync(filePath, `${JSON.stringify(json, notTranslated, 2)}\n`);
});
