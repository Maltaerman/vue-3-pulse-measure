<script setup lang="ts">
import BaseThemeToggle from '@/components/base/BaseThemeToggle.vue'

</script>

<template>
  <div class="flex gap-2">
    <BaseThemeToggle
      class="w-full"
      v-slot="{ theme }"
    >
      Theme: {{ theme }}
    </BaseThemeToggle>
  </div>
</template>