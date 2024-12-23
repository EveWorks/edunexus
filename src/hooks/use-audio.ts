"use client";
import axios from "@/axios";
import { updateAudio, updateMsgLoader } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";
import { setMLoading } from "@/utils/storage";

export const useAudio = () => {
  const dispatch = useAppDispatch();

  const getAudio = async (text: string | boolean) => {
    console.time("getAudioResponseTime"); // Start the timer

    if (typeof text === "boolean") {
      dispatch(updateMsgLoader(false));
      return false;
    }

    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-audio`,
      { text },
      { responseType: "blob" }
    );

    console.timeEnd("getAudioResponseTime"); // End the timer and log the time taken

    if (response) {
      const audioBlob = await response;
      const audioUrl = URL.createObjectURL(audioBlob);
      dispatch(updateAudio(audioUrl));
      dispatch(updateMsgLoader(false));
      return true;
    } else {
      return false;
    }
  };

  return { getAudio };
};
