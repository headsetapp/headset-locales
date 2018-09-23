const fs = require('fs');
const path = require('path');

let isError = false;

const wrapperPath = path.join(__dirname, '../locales', 'wrapper');
const corePath = path.join(__dirname, '../locales', 'core');

let wrapperFilenames = [];
let coreFilenames = [];
if (process.env.LOCALE) {
  // Uses the locale array to test
  const locales = process.env.LOCALE.split(' ');
  locales.forEach((locale) => {
    wrapperFilenames.push(path.join(wrapperPath, `${locale}.json`));
    coreFilenames.push(path.join(corePath, `${locale}.json`));
  });
} else {
  // Reads all files to test
  wrapperFilenames = fs.readdirSync(wrapperPath)
    .map(value => path.join(wrapperPath, value));
  coreFilenames = fs.readdirSync(corePath)
    .map(value => path.join(corePath, value));
}

// Test keys for NOT_TRANSLATED values
function isTranslated(value) {
  if (value === '__NOT_TRANSLATED__') {
    return false;
  }
  return true;
}

// Retrieves the values and returns an array for testing
function retrieveValues(filePath) {
  let file;
  try {
    file = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`The locale ${filePath} doesn't exist`);
    process.exit(1);
  }

  return Object.values(JSON.parse(file));
}

wrapperFilenames.forEach((file) => {
  if (!retrieveValues(file).every(isTranslated)) {
    console.error(`There's untranslated strings on ${file} for wrapper`);
    isError = true;
  }
});

coreFilenames.forEach((file) => {
  if (!retrieveValues(file).every(isTranslated)) {
    console.error(`There's untranslated strings on ${file} for core`);
    isError = true;
  }
});

if (isError) {
  process.exit(1);
}
console.log('All keys are translated');
