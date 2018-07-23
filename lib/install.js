'use strict'

const _ = require('lodash')
module.exports = function (loader, options) {
  const locale = options.locale || options.langs[0]
  const fallbackLocale = options.fallbackLocale || options.langs[0]
  const silentTranslationWarn = options.silentTranslationWarn || false
  let langs = '{ '
  _.each(options.langs, function (lang) {
    langs += `'${lang}': require('@/i18n/langs/${lang}').default, `
  })
  langs = langs.replace(/, $/, '')
  langs += ' }'
  return {
    install: `Vue.use(
      ${options.$plugin},
      {
        langs: ${langs},
        locale: '${locale}',
        fallbackLocale: '${fallbackLocale}',
        silentTranslationWarn: ${silentTranslationWarn}
      })`
  }
}
