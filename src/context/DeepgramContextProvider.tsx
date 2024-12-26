"use client";

import {
  createClient,
  LiveClient,
  LiveConnectionState,
  LiveTranscriptionEvents,
  LiveTTSEvents,
  SpeakLiveClient,
  type SpeakSchema,
  type LiveSchema,
  type LiveTranscriptionEvent,
} from "@deepgram/sdk";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

interface DeepgramContextType {
  connection: LiveClient | null;
  connectToDeepgram: (options: LiveSchema, endpoint?: string) => Promise<void>;
  disconnectFromDeepgram: () => void;
  connectionState: LiveConnectionState;
}

const DeepgramContext = createContext<DeepgramContextType | undefined>(
  undefined
);

interface DeepgramContextProviderProps {
  children: ReactNode;
}

const getApiKey = async (): Promise<string> => {
  const response = await fetch("/api/authenticate", { cache: "no-store" });
  const result = await response.json();
  return result.key;
};

const DeepgramContextProvider: FunctionComponent<
  DeepgramContextProviderProps
> = ({ children }) => {
  const [connection, setConnection] = useState<LiveClient | null>(null);
  // const [speakingConnection, setSpeakingConnection] =
  //   useState<SpeakLiveClient | null>(null);
  // const [speakingConnectionState, setSpeakingConnectionState] =
  //   useState<LiveConnectionState>(LiveConnectionState.CLOSED);
  const [connectionState, setConnectionState] = useState<LiveConnectionState>(
    LiveConnectionState.CLOSED
  );

  /**
   * Connects to the Deepgram speech recognition service and sets up a live transcription session.
   *
   * @param options - The configuration options for the live transcription session.
   * @param endpoint - The optional endpoint URL for the Deepgram service.
   * @returns A Promise that resolves when the connection is established.
   */
  const connectToDeepgram = async (options: LiveSchema, endpoint?: string) => {
    console.log("Connecting to Deepgram...");
    const key = await getApiKey();
    const deepgram = createClient(key);
    // let audioBuffer : any;

    const conn = deepgram.listen.live(options, endpoint);

    conn.addListener(LiveTranscriptionEvents.Open, () => {
      setConnectionState(LiveConnectionState.OPEN);
    });

    conn.addListener(LiveTranscriptionEvents.Close, () => {
      setConnectionState(LiveConnectionState.CLOSED);
    });

    // const dgConnection = deepgram.speak.live({ model: "aura-asteria-en" });

    // dgConnection.addListener(LiveTTSEvents.Open, () => {
    //   setSpeakingConnectionState(LiveConnectionState.OPEN);
    //   dgConnection.on(LiveTTSEvents.Metadata, (data) => {
    //     console.dir(data, { depth: null });
    //   });

    //   dgConnection.on(LiveTTSEvents.Audio, (data) => {
    //     console.log("Deepgram audio data received");
    //     const buffer = Buffer.from(data);
    //     audioBuffer = Buffer.concat([audioBuffer, buffer]);
    //   });

    //   dgConnection.on(LiveTTSEvents.Flushed, () => {
    //     console.log("Deepgram Flushed");
    //     const response =
    //     // Write the buffered audio data to a file when the flush event is received
    //   });

    //   dgConnection.on(LiveTTSEvents.Error, (err) => {
    //     console.error(err);
    //   });
    // });

    // dgConnection.addListener(LiveTTSEvents.Close, () => {
    //   setSpeakingConnectionState(LiveConnectionState.CLOSED);
    // });

    setConnection(conn);
    // setSpeakingConnection(dgConnection);
  };

  const disconnectFromDeepgram = async () => {
    if (connection) {
      connection.requestClose();
      setConnection(null);
    }
    // if (speakingConnection) {
    //   speakingConnection.requestClose();
    //   setSpeakingConnection(null);
    // }
  };

  return (
    <DeepgramContext.Provider
      value={{
        connection,
        connectToDeepgram,
        disconnectFromDeepgram,
        connectionState,
      }}
    >
      {children}
    </DeepgramContext.Provider>
  );
};

function useDeepgram(): DeepgramContextType {
  const context = useContext(DeepgramContext);
  if (context === undefined) {
    throw new Error(
      "useDeepgram must be used within a DeepgramContextProvider"
    );
  }
  return context;
}

export {
  DeepgramContextProvider,
  useDeepgram,
  LiveConnectionState,
  LiveTranscriptionEvents,
  type LiveTranscriptionEvent,
};
