import { ref, onMounted, onUnmounted } from 'vue';

import { useBPM } from './useBPM';

export const LAYOUT_ENUM = {
  DEFAULT: 'Default',
  EMPTY: 'Empty',
};

const VIDEO_PRESET = {
  facingMode: { ideal: "environment" },
  width: { ideal: 640 },
  height: { ideal: 480 },
}

const PRESET = { video: VIDEO_PRESET };

let stream;
let intervalId: number;

const isTorchAvailable = ref(false);

const avgR = ref(0);

const signal = [];
const timestamps = [];

const manualTorchOn = ref(false);

export function useCamera(video, canvas, ctx) {
  const { calculateBPM } = useBPM();

  function enableManualTorch() {
    manualTorchOn.value = true;
    document.body.style.backgroundColor = "#fff";
    document.body.style.transition = "background-color 0.3s";
  };

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
    calculateBPM(signal, timestamps);
  }
}

async function init() {
 try {
    stream = await navigator.mediaDevices.getUserMedia(PRESET);

    video.value.srcObject = stream;
    await new Promise((r) => (video.value.onloadedmetadata = r));

    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();

    if ('torch' in capabilities) {
      isTorchAvailable.value = true;
  
      await track.applyConstraints({ advanced: [{ torch: true }] });
    }

    intervalId = setInterval(processFrame, 50);
  } catch (err) {
    console.error(err);
  }
}

function deinit() {
  clearInterval(intervalId);

  stream?.getTracks().forEach((t) => t.stop());
}

onMounted(init);
onUnmounted(deinit);

return {
  avgR,
  manualTorchOn,
  enableManualTorch,
  isTorchAvailable,
};
}
