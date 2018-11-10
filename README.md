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
| de | German  | complete |

## Contributing

1. Fork the repo
2. Run `npm run fix *LOCALE_CODE*` <sup>1</sup>

    Notice that you need to add a locale code by replacing `*LOCALE_CODE*` with your own.
    You can pass multiple locales separated by a space, i.e. `fr es-MX po`.

    All required files will be created under `locales/core` and `locales/wrapper`, with all keys filled with a `__NOT_TRANSLATED__` default value.

3. Translate as many keys as possible. <sup>2</sup>
4. Run `npm run ready`
5. Submit a PR!

[1]: We use a two-letter code to represent the locale, following [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) rules. If you want to add a locale specific to a country, as in US English (en-US) or Mexican Spanish (es-MX), use the two-letter language code follow by a hyphen, follow by the country's two-letter code capitalized.
The two-letter country code follows [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) rules.

[2] Don't worry if you can't do them all, the ones not translated will use English as backup. The `ready` script will remove all the `__NOT_TRANSLATED__` values that you couldn't do.
