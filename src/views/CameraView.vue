<template>
  <div class="p-4 text-center">
    <video
      ref="video"
      autoplay
      playsinline
      class="rounded-xl shadow-md mx-auto"
    ></video>

    <canvas ref="canvas" width="320" height="240" class="hidden"></canvas>

    <div class="mt-4 text-2xl font-bold">
      <span class="text-red-600">{{ bpm ? bpm.toFixed(0) : '--' }}</span> BPM
    </div>

    <div class="text-sm text-gray-500 mt-1">
      R: {{ avgR.toFixed(2) }}
    </div>

    <button
      v-if="!torchAvailable && !manualTorchOn"
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

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const video = ref(null);
const canvas = ref(null);
const ctx = ref(null);
const avgR = ref(0);
const bpm = ref(0);
const torchAvailable = ref(false);
const manualTorchOn = ref(false);
let stream, intervalId;

let signal = [];
let timestamps = [];

// Ligthning
const enableManualTorch = () => {
  manualTorchOn.value = true;
  document.body.style.backgroundColor = "#fff";
  document.body.style.transition = "background-color 0.3s";
};

onMounted(async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });

    video.value.srcObject = stream;
    await new Promise((r) => (video.value.onloadedmetadata = r));

    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();

    if ("torch" in capabilities) {
      torchAvailable.value = true;
      await track.applyConstraints({ advanced: [{ torch: true }] });
      console.log("Вспышка включена 🔦");
    }

    ctx.value = canvas.value.getContext("2d");

    intervalId = setInterval(processFrame, 50);
  } catch (err) {
    console.error("Ошибка камеры:", err);
  }
});

function processFrame() {
  if (!video.value || !ctx.value) return;

  ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  const frame = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);

  let sum = 0;
  for (let i = 0; i < frame.data.length; i += 4) {
    sum += frame.data[i];
  }

  const avg = sum / (frame.data.length / 4);
  avgR.value = avg;


  const now = performance.now() / 1000;
  signal.push(avg);
  timestamps.push(now);

  const cutoff = now - 10;
  while (timestamps.length && timestamps[0] < cutoff) {
    timestamps.shift();
    signal.shift();
  }

  if (signal.length > 20) {
    bpm.value = calculateBPM(signal, timestamps);
  }
}

function calculateBPM(data, time) {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const norm = data.map((x) => x - mean);

  const threshold = 0.5 * Math.max(...norm);
  let peaks = [];

  for (let i = 1; i < norm.length - 1; i++) {
    if (norm[i] > threshold && norm[i] > norm[i - 1] && norm[i] > norm[i + 1]) {
      peaks.push(time[i]);
    }
  }

  if (peaks.length < 2) return 0;

  const intervals = [];
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }

  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  return 60 / avgInterval;
}

onUnmounted(() => {
  clearInterval(intervalId);
  stream?.getTracks().forEach((t) => t.stop());
});
</script>

<style scoped>
video {
  max-width: 320px;
}
</style>
