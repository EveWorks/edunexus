"use client";
import { updateAudio, updateMsgLoader } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";

export const useAudio = () => {
  const dispatch = useAppDispatch();

  const getAudio = (audio: any) => {
    if (typeof audio === "boolean") {
      dispatch(updateMsgLoader(false));
      return false;
    }
    if (audio) {
      dispatch(updateAudio(audio));
      return true;
    } else {
      return false;
    }
  };

  return { getAudio };
};
