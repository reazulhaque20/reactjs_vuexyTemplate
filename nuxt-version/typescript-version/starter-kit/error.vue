<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import misc404 from '@images/pages/404.png'
import miscMaskDark from '@images/pages/misc-mask-dark.png'
import miscMaskLight from '@images/pages/misc-mask-light.png'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  error: NuxtError
}>()

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)

const isDev = process.dev

const errToShow = computed(() => {
  const is404 = props.error?.statusCode === 404 || props.error.message?.includes('404')

  if (is404) {
    return {
      title: 'Page Not Found',
      description: 'We couldn\'t find the page you are looking for.',
    }
  }

  else if (isDev) {
    return {
      title: props.error?.statusMessage,
      description: props.error.message,
    }
  }

  return {
    title: 'Oops! Something went wrong.',
    description: 'We are working on it and we\'ll get it fixed as soon as we can',
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="blank">
    <div class="misc-wrapper">
      <ErrorHeader
        :status-code="props.error.statusCode"
        :title="errToShow.title"
        :description="errToShow.description"
      />

      <div
        v-if="isDev"
        style="max-inline-size: 80dvw; overflow-x: scroll;"
        v-html="error.stack"
      />

      <VBtn
        class="mb-12"
        @click="handleError"
      >
        Back to Home
      </VBtn>

      <!-- 👉 Image -->
      <div class="misc-avatar w-100 text-center">
        <VImg
          :src="misc404"
          alt="Coming Soon"
          :max-width="200"
          class="mx-auto"
        />
      </div>

      <VImg
        :src="authThemeMask"
        class="misc-footer-img d-none d-md-block"
      />
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
