#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const wrapperPath = path.join(__dirname, '../locales', 'wrapper');
const corePath = path.join(__dirname, '../locales', 'core');

// Removes all keys that have NOT_TRANSLATED values using JSON.stringify
function notTranslated(key, value) {
  if (value === '__NOT_TRANSLATED__' || Object.keys(value).length === 0) {
    return undefined;
  }
  return value;
}

// Rewrites all JSON language files under the given path directory
function removeKeys(filesPath) {
  const files = fs.readdirSync(filesPath);

  files.forEach((file) => {
    // Don't change the English translation.
    // This should be left so errors can happen on Travis and core-deploy script
    if (file === 'en.json') return;

    const filePath = path.join(filesPath, file);
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'), notTranslated);
    if (typeof json !== 'undefined') {
      fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

removeKeys(wrapperPath);
removeKeys(corePath);
