import { ref } from 'vue';

const bpm = ref(0);

export function useBPM() {
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

    bpm.value = 60 / avgInterval;
  }

  return { bpm, calculateBPM };
}
