"use client";
import axios from "@/axios";
import { updateAudio, updateMsgLoader } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";
import { setMLoading } from "@/utils/storage";

export const useAudio = () => {
  const dispatch = useAppDispatch();

  const getAudio = (audio: any) => {
    if (typeof audio === "boolean") {
      dispatch(updateMsgLoader(false));
      return false;
    }
    if (audio) {
      dispatch(updateAudio(audio));
      dispatch(updateMsgLoader(false));
      return true;
    } else {
      return false;
    }
  };

  return { getAudio };
};
