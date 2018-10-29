# Headset Locales

[![Build
Status](https://travis-ci.org/headsetapp/headset-locales.svg?branch=master)](https://travis-ci.org/headsetapp/headset-locales)

Headset-locales is the official repository for [Headset](http://headsetapp.co) locale files. These files are used to
localize the `core` and `wrapper` parts of Headset.
English and Spanish are the two officially supported languages for Headset, all other languages are maintain by the
community.

Have a question? Join our Slack workspace: https://tinyurl.com/y7m8y5x4

The following is the status of the current locale files:

| Locale code | Locale | Progress |
|-------------|--------|----------|
| en | English | complete |
| es | Spanish | complete |

## Contributing

### Creating a new language
The following is an example on how to create a new locale. For this example we'll be adding _Sanskrit (sa)_.
We use a two-letter code to represent the locale, following [ISO
639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) rules.

If you want to add a locale specific to a country, as in US English (en-US) or Mexican Spanish (es-MX), use the two-letter language code follow by a hyphen, follow by the country's two-letter code capitalized.
The two-letter country code follows [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) rules.

0. Fork the repo
1. Run `npm run fix locale=sa`.
   All required files will be created under `locales/core` and `locales/wrapper`, with all keys filled with a "\_\_NOT_TRANSLATED\_\_" value.
   Notice the `LOCALE` variable which contains the locale code.
   This can contain multiple locales separated by a space, i.e. `LOCALE="sa es-MX"`
2. Translate as many keys as possible.*
3. Run `npm run prepare`
4. Submit a PR!

* Don't worry if you can't do them all, the ones not translated will use the English as backup. The `prepare` script will remove all the "\_\_NOT_TRANSLATED\_\_" values that you couldn't do.

### Translating terms
This is relatively straightforward, if you find an error or a better translation for a key, feel free to submit a PR.

If you're adding terms that didn't have a translation previously, follow the exact same procedure as for __Creating a new language__, specifying the locale you want to work on.
The `addMissingKeys.js` script will check if the locale files exist and if so, just add the missing translations.
