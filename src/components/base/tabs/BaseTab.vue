<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },

  theme: {
    type: String,
    default: 'primary',
    validator: (theme: string) => ['primary'].includes(theme),
  },

  size: {
    type: String,
    default: 'md',
    validator: (size: string) => ['sm'].includes(size),
  },

  tag: {
    type: [Object, String],
    default: () => 'button',
  },
});

const emit = defineEmits(['set-tab']);
</script>

<template>
  <component
    :is="props.tag"
    class="flex items-center justify-center gap-1 rounded-8 px-3
      font-medium text-neutral-100 transition-colors duration-300 can-hover:cursor-pointer"
    @click="emit('set-tab')"
  >
    <span class="truncate translate-z-0">
      <slot />
    </span>
  </component>
</template>
