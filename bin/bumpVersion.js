#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const locales = require('../locales-versions.json');

// Check if version type parameter was passed and if it's correct
if (process.argv.length > 3
  || ['major', 'minor', 'patch'].indexOf(process.argv[2]) === -1) {
  console.error('Needs type of version parameter. Can only be one of (major, minor, patch)');
  process.exit(1);
}

const corePath = path.join(__dirname, '../locales', 'core');

// The last commit where locales-versions.json was changed
const lastCommit = execSync('git log -n 1 --pretty=format:%H -- locales-versions.json').toString('utf8');

Object.keys(locales)
  .forEach((locale) => {
    const coreLocale = path.join(corePath, `${locale}.json`);

    // Check if any changes have happened since the last release of that locale
    const coreChanges = execSync(`git diff ${lastCommit} --name-only ${coreLocale}`).toString('utf8');

    // If changes, increase the version specified by RELEASE variable
    if (coreChanges !== '') {
      const newVersion = semver.inc(locales[locale], process.argv[2]);
      console.log(`Updating ${locale} to version ${newVersion}`);
      locales[locale] = newVersion;
    }
  });

// Writes the new versions to the file
fs.writeFileSync(
  path.join(__dirname, '../locales-versions.json'),
  `${JSON.stringify(locales, null, 2)}\n`,
);
