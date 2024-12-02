import Image from "next/image";
import { Button } from "rizzui";
import BgVector from "@/public/bg.png";
import BgVectorShadow from "@/public/vector.svg";
import axios from "@/axios";
import { createTopic } from "@/store/features/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const CreateChat = () => {
  const { listLoader } = useAppSelector((state) => state.Chat);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const createNewChat = async (topic: string) => {
    const callback = (id: string) => {
      router.push(`/chat/${id}`);
    };
    dispatch(createTopic({ topic, callback }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className={`relative transition-all duration-400 scale-[1] h-[6rem] w-[6rem] mb-[1.5rem]`}
      >
        <Image
          src={BgVector}
          alt="vector"
          className="w-full h-auto absolute bottom-0 right-0 z-[2] opacity-[0.2] rotate-audio"
          priority
        />
        <Image
          src={BgVectorShadow}
          alt="vector"
          className="w-full h-auto absolute bottom-0 right-0 z-[1] rotate-audio-reverse scale-custom"
          priority
        />
      </div>
      <div className="text-[1.875rem] leading-[0.9375rem] font-medium mb-[0.625rem]">
        Choose one of the following
      </div>
      <div className="text-[1.25rem] leading-[0.9375rem] w-[30.125rem] mb-[1.875rem] text-center text-[#525252]">
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => createNewChat("Mathematics")}
          variant="text"
          disabled={listLoader}
          className="h-fit text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem] mr-[1.25rem]"
        >
          Mathematics
        </Button>
        <Button
          onClick={() => createNewChat("Computer Science")}
          variant="text"
          disabled={listLoader}
          className="h-fit text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem]"
        >
          Computer Science
        </Button>
      </div>
    </div>
  );
};

export default CreateChat;
