import { createMongoAbility } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'

export default defineNuxtPlugin(nuxtApp => {
  const userAbilityRules = useCookie('userAbilityRules')
  const initialAbility = createMongoAbility(userAbilityRules.value ?? [])

  nuxtApp.vueApp.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  })
})
