const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const locales = require('../locales-versions.json');

// Check if RELEASE variable was passed and it's correct
if (!process.env.RELEASE || ['major', 'minor', 'patch'].indexOf(process.env.RELEASE) === -1) {
  console.error('RELEASE variable not found or wrong type. Can only be one of (major, minor, patch)');
  process.exit(1);
}

const corePath = path.join(__dirname, '../locales', 'core');

// The last commit where locales-versions.json was changed
const lastCommit = execSync('git log -n 1 --pretty=format:%H -- locales-versions.json').toString('utf8');

Object.keys(locales)
  .forEach((locale) => {
    const coreLocale = path.join(corePath, `${locale}.json`);

    // Check if any changes have happened since the last release of that locale
    const coreChanges = execSync(`git diff ${lastCommit} HEAD --name-only ${coreLocale}`).toString('utf8');

    // If changes, increase the version specified by RELEASE variable
    if (coreChanges !== '') locales[locale] = semver.inc(locales[locale], process.env.RELEASE);
  });

// Writes the new versions to the file
fs.writeFileSync(
  path.join(__dirname, '../locales-versions.json'),
  `${JSON.stringify(locales, null, 2)}\n`,
);
