<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-2 text-md text-neutral-950 font-medium p-2">
    <p v-text="props.id " />

    <p
      class="text-right"
      v-text="props.value"
    />
  </div>
</template>
