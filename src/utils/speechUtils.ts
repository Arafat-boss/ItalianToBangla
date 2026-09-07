import { Platform } from "react-native";
import * as Speech from "expo-speech";

export interface SpeakOptions {
  language?: string; // 'it-IT' for Italian, 'bn-BD' or 'bn-IN' for Bengali
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onDone?: () => void;
  onStopped?: () => void;
  onError?: (error: any) => void;
  onProgress?: (progressPercent: number) => void;
}

let progressTimer: any = null;
let activeUtterance: any = null;
let activeAudio: HTMLAudioElement | null = null;

// Ensure voices are loaded in background on Web
if (Platform.OS === "web" && typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.getVoices();
  } catch (e) {}
}

export const speak = (text: string, options: SpeakOptions = {}) => {
  stop();

  if (!text || text.trim().length === 0) {
    options.onDone?.();
    return;
  }

  const cleanText = text.replace(/[_#*`]/g, "").trim();
  const rawLang = options.language || "it-IT";
  const isBengali = rawLang.toLowerCase().startsWith("bn");
  const rate = options.rate || (isBengali ? 0.9 : 0.9);

  if (Platform.OS === "web") {
    speakWeb(cleanText, rawLang, isBengali, rate, options);
  } else {
    speakNative(cleanText, rawLang, rate, options);
  }
};

const speakWeb = (
  text: string,
  rawLang: string,
  isBengali: boolean,
  rate: number,
  options: SpeakOptions
) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options.onDone?.();
    return;
  }

  const synth = window.speechSynthesis;

  try {
    synth.cancel();

    setTimeout(() => {
      try {
        const voices = synth.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1.0;

        let selectedVoice: SpeechSynthesisVoice | null = null;

        if (isBengali) {
          // Priority 1: Exact Bengali Voice (Google বাংলা, Microsoft Nabaneeta, bn-BD, bn-IN)
          selectedVoice =
            voices.find(
              (v) =>
                v.lang.toLowerCase().startsWith("bn") ||
                v.name.toLowerCase().includes("bangla") ||
                v.name.toLowerCase().includes("bengali") ||
                v.name.includes("বাংলা")
            ) || null;

          // Priority 2: Indian regional voice available in Chrome (Hindi, India)
          if (!selectedVoice) {
            selectedVoice =
              voices.find(
                (v) =>
                  v.lang.toLowerCase() === "hi-in" ||
                  v.lang.toLowerCase() === "en-in" ||
                  v.name.toLowerCase().includes("india") ||
                  v.name.toLowerCase().includes("hindi")
              ) || null;
          }

          // Priority 3: Any available default voice
          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
          }

          utterance.lang = selectedVoice ? selectedVoice.lang : "bn-IN";
        } else {
          // Italian Voice (Google italiano, Microsoft Elsa/Cosimo, it-IT)
          selectedVoice =
            voices.find(
              (v) =>
                v.lang.toLowerCase().startsWith("it") ||
                v.name.toLowerCase().includes("italian") ||
                v.name.toLowerCase().includes("italiano")
            ) || null;

          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
          }

          utterance.lang = selectedVoice ? selectedVoice.lang : "it-IT";
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        const estDuration = Math.max(1600, (text.length / 12) * 1000 / rate);
        const startTime = Date.now();

        utterance.onstart = () => {
          options.onStart?.();
          if (progressTimer) clearInterval(progressTimer);
          progressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min(98, (elapsed / estDuration) * 100);
            options.onProgress?.(pct);
          }, 100);
        };

        utterance.onend = () => {
          stop();
          options.onProgress?.(100);
          options.onDone?.();
        };

        utterance.onerror = (err) => {
          console.log("Utterance status:", err);
          stop();
          options.onDone?.();
        };

        utterance.onboundary = (e) => {
          if (text.length > 0 && e.charIndex !== undefined) {
            const pct = Math.min(98, (e.charIndex / text.length) * 100);
            options.onProgress?.(pct);
          }
        };

        activeUtterance = utterance;
        (window as any).__activeUtterance = utterance;

        if (synth.paused) {
          synth.resume();
        }

        synth.speak(utterance);
      } catch (err) {
        console.warn("SpeechSynthesis error:", err);
        options.onDone?.();
      }
    }, 50);
  } catch (e) {
    console.warn("Speech error:", e);
    options.onDone?.();
  }
};

const speakNative = (
  text: string,
  rawLang: string,
  rate: number,
  options: SpeakOptions
) => {
  try {
    const estDuration = Math.max(2000, (text.length / 12) * 1000 / rate);
    options.onStart?.();
    const startTime = Date.now();

    if (progressTimer) clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(98, (elapsed / estDuration) * 100);
      options.onProgress?.(pct);
    }, 150);

    Speech.speak(text, {
      language: rawLang,
      rate: rate,
      pitch: 1.0,
      onStart: () => options.onStart?.(),
      onDone: () => {
        stop();
        options.onProgress?.(100);
        options.onDone?.();
      },
      onStopped: () => {
        stop();
        options.onDone?.();
      },
      onError: (err) => {
        console.warn("Native Speech error:", err);
        stop();
        options.onDone?.();
      },
    });
  } catch (e) {
    console.warn("Native Speech error:", e);
    stop();
    options.onDone?.();
  }
};

export const stop = () => {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }

  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio = null;
    } catch (e) {}
  }

  if (Platform.OS === "web" && typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch (e) {}
  } else {
    try {
      Speech.stop();
    } catch (e) {}
  }
};
