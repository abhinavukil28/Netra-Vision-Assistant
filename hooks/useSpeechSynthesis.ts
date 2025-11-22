import { useState, useCallback, useEffect } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis || !text) {
        setIsSpeaking(false);
        resolve();
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to find a suitable voice
      const voices = window.speechSynthesis.getVoices();
      // Prefer a native, English voice if possible
      let preferredVoice = voices.find(v => v.lang.startsWith('en') && v.localService);
      if (!preferredVoice) {
        preferredVoice = voices.find(v => v.lang.startsWith('en'));
      }
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      
      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        console.error('SpeechSynthesis Error:', event.error);
        setIsSpeaking(false);
        resolve(); // Resolve even on error to not block the flow
      };

      window.speechSynthesis.cancel(); // Cancel any current speech
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    // This effect ensures that voices are loaded, which can be asynchronous on some browsers.
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const handleVoicesChanged = () => {
            // This is to ensure the voice list is populated for the speak function.
            window.speechSynthesis.getVoices();
        };
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
        handleVoicesChanged(); // Initial call in case voices are already loaded.
    }
    // Cleanup function to cancel speech if the component unmounts.
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
      cancel();
    };
  }, [cancel]);

  return { isSpeaking, speak, cancel };
};
