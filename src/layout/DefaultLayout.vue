<script lang="ts" setup>
import { ref } from 'vue';

import ToolBar from '@/components/layout/ToolBar.vue';
import CookieBanner from '@/components/layout/CookieBanner.vue';
// import PopupManagerWrapper from '@/components/popups/PopupManagerWrapper.vue';

const isCookieBannerShown = ref(false);
</script>

<template>
  <div>
    <main class="relative flex size-full flex-1 flex-col --screenMinHeight">
      <slot />
    </main>


    <ToolBar class="fixed bottom-0 bg-amber-700" />

    <CookieBanner v-if="isCookieBannerShown" />
  </div>
</template>
