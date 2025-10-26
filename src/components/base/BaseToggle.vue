<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    default: null,
  },

  id: {
    type: String,
    default: null,
  },

  containerSizeClasses: {
    type: String,
    default: 'w-8 h-4',
  },

  toggleSizeClasses: {
    type: String,
    default: 'size-3',
  },

  transitionClasses: {
    type: String,
    default: 'transition-all duration-300',
  },

  // TODO: Add isDisable state
});

const emit = defineEmits(['update:model-value']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
});

const containerBackgroundColorClasses = computed(() => model.value ? 'bg-primary-600' : 'bg-accent-green');

const containerBorderClasses = computed(() => 'border-dark');

const cursorClasses = computed(() =>
  props.isDisabled ? 'cursor-default' : 'cursor-pointer'
);

const containerClasses = computed(() => [
  'relative rounded-full border',
  containerBackgroundColorClasses.value,
  containerBorderClasses.value,
  props.containerSizeClasses,
  props.transitionClasses,
]);

const toggleClasses = computed(() => [
  'absolute top-1/2 -translate-y-1/2 rounded-full bg-dark',
  model.value ? 'translate-x-4' : 'translate-x-0',
  props.toggleSizeClasses,
  props.transitionClasses,
]);
</script>

<template>
  <label
    :class="cursorClasses"
    :for="props.id"
  >
    <input
      :id="props.id"
      v-model="model"
      class="hidden"
      :name="props.name"
      type="checkbox"
    />

    <div :class="containerClasses">
      <div :class="toggleClasses" />
    </div>
  </label>
</template>
