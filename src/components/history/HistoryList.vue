<script setup lang="ts">
import HistoryListItem from './HistoryListItem.vue';
import { useHistoryList } from './useHistoryList';

const { historyList } = useHistoryList();
</script>

<template>
  <HistoryListItem
    v-for="historyListItem in historyList"
    :key="historyListItem.id"
    v-bind="historyListItem"
    class="border-b border-accent-red last:border-b-0"
  />
</template>
