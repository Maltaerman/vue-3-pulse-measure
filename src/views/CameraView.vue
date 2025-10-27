<template>
  <div class="p-4 text-center">
    <video
      ref="videoRef"
      autoplay
      playsinline
      class="rounded-xl shadow-md mx-auto"
    />

    <canvas ref="canvasRef" width="320" height="240" class="hidden"></canvas>

    <div class="mt-4 text-2xl font-bold">
      <span class="text-red-600">{{ bpm ? +bpm.toFixed(0) : '--' }}</span> BPM <br>
      {{ bpm }}
    </div>

    <div class="text-sm text-gray-500 mt-1">
      R: {{ avgR.toFixed(2) }}
    </div>

    <button
      v-if="!isTorchAvailable && !manualTorchOn"
      @click="enableManualTorch"
      class="bg-yellow-500 text-white px-4 py-2 rounded-xl mt-4"
    >
      💡Ligthning
    </button>

    <p v-if="manualTorchOn" class="mt-3 text-sm text-gray-600">
      Enable Ligthning
    </p>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from "vue";

import { useCamera } from '@/composables/useCamera';
import { useBPM } from '@/composables/useBPM';

const videoRef = useTemplateRef('videoRef');
const canvasRef = useTemplateRef('canvasRef');

const ctx = ref(null);

function getContext() {
  ctx.value = canvasRef.value.getContext('2d');
}

onMounted(getContext)

const { isTorchAvailable, avgR, manualTorchOn, enableManualTorch } = useCamera(videoRef, canvasRef, ctx);
const { bpm } = useBPM();
</script>