#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let isError = false;

const wrapperPath = path.join(__dirname, '../locales', 'wrapper');
const corePath = path.join(__dirname, '../locales', 'core');

let wrapperFilenames = [];
let coreFilenames = [];

// Test keys for NOT_TRANSLATED values
function isTranslated(value) {
  if (value === '__NOT_TRANSLATED__') return false;
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

// Test each json locale in array for untranslated strings
function testUntranslated(fileNamesArray) {
  fileNamesArray.forEach((file) => {
    if (!retrieveValues(file).every(isTranslated)) {
      console.error(`There's untranslated strings on ${path.relative('./', file)}`);
      isError = true;
    }
  });
}

// Get a list of languages to test, either pass by user or all of them
if (process.argv.length <= 2) {
  // Reads all files to test
  wrapperFilenames = fs.readdirSync(wrapperPath)
    .map(value => path.join(wrapperPath, value));
  coreFilenames = fs.readdirSync(corePath)
    .map(value => path.join(corePath, value));
} else {
  // Uses the user specified locales to test
  process.argv.slice(2)
    .forEach((locale) => {
      wrapperFilenames.push(path.join(wrapperPath, `${locale}.json`));
      coreFilenames.push(path.join(corePath, `${locale}.json`));
    });
}

// Test locales
testUntranslated(wrapperFilenames);
testUntranslated(coreFilenames);

// Throw an error for Travis testing
if (isError) {
  process.exit(1);
}

console.log('All keys are translated');
