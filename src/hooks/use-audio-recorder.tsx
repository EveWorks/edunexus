import { useState, useRef, useEffect, useCallback } from 'react';

interface UseAudioRecorder {
  isRecording: boolean;
  audioUrl: string | null;
  liveAudioBlob: Blob | null; // Blob of live audio data
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
  error: string | null;
  audioData: Uint8Array | null; 
}

export const useAudioRecorder = (): UseAudioRecorder => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [liveAudioBlob, setLiveAudioBlob] = useState<Blob | null>(null); // Store live audio data as Blob

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const captureAudioWave = useCallback(() => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteTimeDomainData(dataArray);
      setAudioData(dataArray);
      animationFrameRef.current = requestAnimationFrame(captureAudioWave);
    }
  }, []);

  const startRecording = async (): Promise<void> => {
    try {
      setError(null);

      // Access microphone input
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // AudioContext for live wave visualization
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048; // Determines the resolution of the waveform
      source.connect(analyser);
      analyserRef.current = analyser;

      captureAudioWave();

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          // Update live audio blob as chunks come in
          setLiveAudioBlob(new Blob(audioChunksRef.current, { type: 'audio/webm' }));
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Error accessing microphone. Please check your permissions.');
      console.error(err);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsRecording(false);
    setAudioData(null);
  };

  const resetRecording = (): void => {
    setAudioUrl(null);
    setLiveAudioBlob(null); // Reset live audio blob
    setAudioData(null);
    audioChunksRef.current = [];
  };

  return {
    isRecording,
    audioUrl,
    liveAudioBlob, // Return live audio blob
    startRecording,
    stopRecording,
    resetRecording,
    error,
    audioData,
  };
};
