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

// Retrieves JSON template with all keys with '__NOT_TRANSLATED__' values
function getJsonTemplate(namespacePath) {
  return JSON.parse(
    fs.readFileSync(path.join(namespacePath, 'en.json'), 'utf8'),
    notTranslated,
  );
}

// Read a JSON locale and if it doesn't exist, creates a new one based on `jsonTemplate`
function readWriteLocale(localePath, jsonTemplate) {
  try {
    // Read the json file and add missing keys
    const json = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const wrapperOut = Object.assign({}, jsonTemplate, json);

    // Writes json file to disk which includes missing keys
    fs.writeFileSync(localePath, `${JSON.stringify(wrapperOut, null, 2)}\n`);
    console.log(`Added missing translations to ${path.relative('./', localePath)}`);
  } catch (err) {
    // Exists on any error beside "File doesn't exist"
    if (err.code !== 'ENOENT') {
      console.error(err);
      process.exit(2);
    }

    // Create file if it doesn't exist
    fs.writeFileSync(localePath, `${JSON.stringify(jsonTemplate, null, 2)}\n`);
    console.log(`New locale created under ${path.relative('./', localePath)}`);
  }
}

// Get the list of locales from user
if (process.argv.length <= 2) {
  console.error('No locales found. Specify the locale as an argument');
  process.exit(1);
}
const locales = process.argv.slice(2);

// Retrieves the English core and wrapper locales with '__NOT_TRANSLATED__' values for all
const enWrapperJSON = getJsonTemplate(wrapperPath);
const enCoreJSON = getJsonTemplate(corePath);

// Creates new core and wrapper files for each locale
locales.forEach((locale) => {
  // Get paths for locale
  const localeWrapperPath = path.join(wrapperPath, `${locale}.json`);
  const localeCorePath = path.join(corePath, `${locale}.json`);

  // Read or create the JSON objects
  readWriteLocale(localeWrapperPath, enWrapperJSON);
  readWriteLocale(localeCorePath, enCoreJSON);
});
