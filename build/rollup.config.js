module.exports = {
  external: (id) => /^(vue-i18n|lodash\/.*)$/.test(id),
  globals: {
    'lodash/set': '_.set',
    'vue-i18n': 'VueI18n'
  }
}
