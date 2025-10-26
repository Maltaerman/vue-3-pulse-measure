<script setup lang="ts">
import { ref } from 'vue'

const THEME_ENUM = {
  DARK: 'dark',
  LIGHT: 'light',
}

const theme = ref(localStorage.getItem('theme') || THEME_ENUM.LIGHT)

function setTheme(value: string) {
  theme.value = value;

  localStorage.setItem('theme', theme.value)

  document.documentElement.dataset.theme = theme.value;
}

setTheme(theme.value)


function toggleTheme() {
  const isDark = theme.value === THEME_ENUM.DARK;

  theme.value = isDark ? THEME_ENUM.LIGHT : THEME_ENUM.DARK;

  setTheme(theme.value)
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="uppercase px-4 py-2 rounded bg-primary-600 text-neutral-100 transition-colors duration-300 cursor-pointer font-regular"
    v-text="theme"
  />
</template>
