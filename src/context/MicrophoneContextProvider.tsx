"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

interface MicrophoneContextType {
  microphone: MediaRecorder | null;
  startMicrophone: () => void;
  stopMicrophone: () => void;
  setupMicrophone: () => void;
  microphoneState: MicrophoneState | null;
  error: string | null;
}

export enum MicrophoneEvents {
  DataAvailable = "dataavailable",
  Error = "error",
  Pause = "pause",
  Resume = "resume",
  Start = "start",
  Stop = "stop",
}

export enum MicrophoneState {
  NotSetup = -1,
  SettingUp = 0,
  Ready = 1,
  Opening = 2,
  Open = 3,
  Error = 4,
  Pausing = 5,
  Paused = 6,
}

const MicrophoneContext = createContext<MicrophoneContextType | undefined>(
  undefined
);

interface MicrophoneContextProviderProps {
  children: ReactNode;
}

const MicrophoneContextProvider: React.FC<MicrophoneContextProviderProps> = ({
  children,
}) => {
  const [microphoneState, setMicrophoneState] = useState<MicrophoneState>(
    MicrophoneState.NotSetup
  );
  const [microphone, setMicrophone] = useState<MediaRecorder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setupMicrophone = async () => {
    setMicrophoneState(MicrophoneState.SettingUp);
    setError(null);

    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
        },
      });

      const microphone = new MediaRecorder(userMedia);
      setMicrophoneState(MicrophoneState.Ready);
      setMicrophone(microphone);
      stopMicrophone();
    } catch (err: any) {
      console.warn("Microphone setup error:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Microphone access is blocked. Please enable it in your browser settings."
          : err.name === "NotFoundError"
          ? "No microphone found. Please connect a microphone and try again."
          : "An unexpected error occurred while setting up the microphone."
      );
      setMicrophoneState(MicrophoneState.Error);
    }
  };

  const stopMicrophone = useCallback(() => {
    setError(null);
    if (!microphone) {
      setError("Microphone is not initialized.");
      return;
    }

    if (microphone.state === "recording") {
      microphone.pause();
      setMicrophoneState(MicrophoneState.Paused);
    } else {
      setError("Microphone is not recording.");
    }
  }, [microphone]);

  const startMicrophone = useCallback(() => {
    setError(null);
    if (!microphone) {
      setError("Microphone is not initialized.");
      return;
    }

    try {
      if (microphone.state === "paused") {
        microphone.resume();
      } else if (microphone.state !== "recording") {
        microphone.start(250);
      }
      setMicrophoneState(MicrophoneState.Open);
    } catch (err: any) {
      console.error("Microphone start error:", err);
      setError("Failed to start the microphone. Please try again.");
      setMicrophoneState(MicrophoneState.Error);
    }
  }, [microphone]);

  console.log("Microphone error:", error);

  return (
    <MicrophoneContext.Provider
      value={{
        microphone,
        startMicrophone,
        stopMicrophone,
        setupMicrophone,
        microphoneState,
        error,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};

function useMicrophone(): MicrophoneContextType {
  const context = useContext(MicrophoneContext);

  if (context === undefined) {
    throw new Error(
      "useMicrophone must be used within a MicrophoneContextProvider"
    );
  }

  return context;
}

export { MicrophoneContextProvider, useMicrophone };
