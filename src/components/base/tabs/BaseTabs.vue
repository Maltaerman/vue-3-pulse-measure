<script setup lang="ts">
import {
  ref,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  useTemplateRef,
} from 'vue';

import BaseTab from './BaseTab.vue';

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },

  activeTabId: {
    type: [String, Number],
    default: '',
  },

  theme: {
    type: String,
    default: 'primary',
    validator: (theme: string) => ['primary'].includes(theme),
  },

  size: {
    type: String,
    default: 'md',
    validator: (size: string) => ['md'].includes(size),
  },

  target: {
    type: String,
    default: '',
  },

  isFocusAfterRotation: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['change-active-tab']);

const tabId = ref(props.activeTabId || '');

const tabRefs = useTemplateRef('tabRefs');
const containerRef = useTemplateRef('containerRef');

function scrollToActiveTab() {
  if (!tabRefs.value) return;

  const activeTab = tabRefs.value.find(({ id }) => id === String(tabId.value));

  scrollTo(activeTab, containerRef.value);
}

watchEffect(() => {
  tabId.value = props.activeTabId;

  scrollToActiveTab();
});

function onChangeTab(id, idx) {
  if (id) tabId.value = id;

  scrollToActiveTab();

  emit('change-active-tab', { id, idx });
}

function onOrientationChange() {
  if (!props.isFocusAfterRotation) return;

  window.setTimeout(scrollToActiveTab, 100);
}

onMounted(() =>
  window.addEventListener('orientationchange', onOrientationChange)
);

onBeforeUnmount(() =>
  window.removeEventListener('orientationchange', onOrientationChange)
);
</script>

<template>
  <nav
    ref="containerRef"
    class="relative -mb-3 overflow-scroll pb-3"
  >
    <ul
      class="relative flex w-full flex-row gap-1"
    >
      <li
        v-for="({ id, label }, index) in props.tabs"
        :id="id"
        :key="id"
        ref="tabRefs"
      >
        <BaseTab
          :is-active="tabId === id"
          :size="props.size"
          :theme="props.theme"
          @set-tab="onChangeTab(id, index)"
        >
          {{ label }}
        </BaseTab>
      </li>
    </ul>
  </nav>
</template>
