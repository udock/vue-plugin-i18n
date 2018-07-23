import set from 'lodash/set'
import VueI18n from 'vue-i18n'

function getI18nDataProvder (vm) {
  let parent = vm.$parent
  while (parent) {
    if (parent.$options.i18n) {
      return parent
    }
    parent = parent.$parent
  }
}

const install = function (Vue, options) {
  if (install.installed) return
  Vue.use(VueI18n)
  const fallbackLocale = options.fallbackLocale
  const i18n = new VueI18n({
    locale: options.locale,
    fallbackLocale,
    messages: options.langs,
    silentTranslationWarn: options.silentTranslationWarn
  })
  Vue.mixin({
    beforeCreate () {
      const $t = this.$t
      let parentI18nVm
      const vm = this
      Object.defineProperty(this, '$t', {
        value () {
          const key = arguments[0]
          if (!vm.$te(key) && !vm.$te(key, fallbackLocale)) {
            parentI18nVm = parentI18nVm || getI18nDataProvder(vm)
            if (parentI18nVm) {
              if (!i18n.silentTranslationWarn) {
                console.warn(`use parent i18n data: ${key}`)
              }
              return parentI18nVm.$t.apply(parentI18nVm, arguments)
            }
          }
          return $t.apply(vm, arguments)
        }
      })
    }
  })
  set(Vue, 'udock.plugins.i18n.instance', i18n)
}

export default {
  install
}
