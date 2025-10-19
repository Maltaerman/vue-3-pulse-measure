<script setup lang="ts">
import { useLayout } from '@/layout/useLayout';

const layoutComponent = useLayout();
</script>

<template>
  <component :is="layoutComponent">
    <router-view
      v-slot="{ Component, route }"
      name="default"
    >
      <component
        :is="Component"
        :key="route.name"
      />
    </router-view>
  </component>
</template>
