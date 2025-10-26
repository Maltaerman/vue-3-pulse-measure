<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import { useHistoryList } from '@/components/history/useHistoryList';

const HistoryList = defineAsyncComponent(
  () => import('@/components/history/HistoryList.vue')
);

const { historyList, getHistoryList } = useHistoryList();

getHistoryList();
</script>

<template>
  <div>
    <h4
      class="text-xl text-neutral-950 font-bold"
      v-text="'History'"
    />

    <Transition
      mode="out-in"
      name="transition-fade"
    >
      <HistoryList
        v-if="historyList.length"
      />

      <div
        v-else
        class="flex min-h-40 p-2"
      >
        <p
          class="m-auto text-center text-md text-neutral-950 font-medium"
          v-text="'No measure history'"
        />
      </div>      
    </Transition>
  </div>
</template>