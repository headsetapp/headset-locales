#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const wrapperPath = path.join(__dirname, '../locales', 'wrapper');
const corePath = path.join(__dirname, '../locales', 'core');

// Assigns the not-translated string
function notTranslated(key, value) {
  if (typeof value === 'object') return value;
  return '__NOT_TRANSLATED__';
}

// Get the list of locales from user
let locales;
if (process.env.LOCALE) {
  locales = process.env.LOCALE.split(' ');
} else {
  console.error('No locales found. Add one by passing the variable LOCALE');
  process.exit(1);
}

// Retrieves the English core and wrapper locales with '__NOT_TRANSLATED__' values for all
const enWrapperJSON = JSON.parse(
  fs.readFileSync(path.join(wrapperPath, 'en.json'), 'utf8'),
  notTranslated,
);
const enCoreJSON = JSON.parse(
  fs.readFileSync(path.join(corePath, 'en.json'), 'utf8'),
  notTranslated,
);

// Creates new core and wrapper files for each locale
locales.forEach((locale) => {
  // Get paths for locale
  const wrapperLocalePath = path.join(wrapperPath, `${locale}.json`);
  const coreLocalePath = path.join(corePath, `${locale}.json`);

  // Get JSON objects
  let wrapperJSON;
  let coreJSON;

  try {
    wrapperJSON = JSON.parse(fs.readFileSync(wrapperLocalePath, 'utf8'));
    coreJSON = JSON.parse(fs.readFileSync(coreLocalePath, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If files don't exist, create them
      fs.writeFileSync(wrapperLocalePath, `${JSON.stringify(enWrapperJSON, null, 2)}\n`);
      fs.writeFileSync(coreLocalePath, `${JSON.stringify(enCoreJSON, null, 2)}\n`);
      console.log(`New locale ${locale} was created`);
    } else {
      // Any other error, exit
      console.error(err);
      process.exit(2);
    }
  }

  // Assign __NOT_TRANSLATED__ strings to missing keys
  const wrapperOut = Object.assign({}, enWrapperJSON, wrapperJSON);
  const coreOut = Object.assign({}, enCoreJSON, coreJSON);

  // Writes the new object with all keys
  fs.writeFileSync(wrapperLocalePath, `${JSON.stringify(wrapperOut, null, 2)}\n`);
  fs.writeFileSync(coreLocalePath, `${JSON.stringify(coreOut, null, 2)}\n`);

  console.log(`Added missing translations to locale ${locale}`);
});
