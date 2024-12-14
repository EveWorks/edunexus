"use client";
import axios from "@/axios";
import { updateMsgLoader } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";

export const useAudio = () => {
  const dispatch = useAppDispatch();

  const getAudio = async (text: string) => {
    console.time("getAudioResponseTime"); // Start the timer

    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-audio`,
      { text },
      { responseType: "blob" }
    );

    console.timeEnd("getAudioResponseTime"); // End the timer and log the time taken

    if (response) {
      const audioBlob = await response;
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      dispatch(updateMsgLoader({}));
      return true;
    } else {
      return false;
    }
  };

  return { getAudio };
};
