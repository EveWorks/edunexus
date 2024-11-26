import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { BsFillSendFill } from "react-icons/bs"
import { FiSend } from "react-icons/fi"
import { MdMicNone } from "react-icons/md"
import { Button, Textarea } from "rizzui"
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { FaStop } from "react-icons/fa6"
import AudioLoader from "./audio-loader"
import AudioPreview from "./audio-preview"

const ChatFooter = ({ setChats, preview }: { setChats: any, preview: boolean }) => {
    const textareaRef = useRef(null);
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            message: ""
        }
    })

    const deleteAudio = () => {
        resetRecording()
    }

    const {
        isRecording,
        audioUrl,
        startRecording,
        stopRecording,
        resetRecording,
    } = useAudioRecorder();

    const sendMessage = (data: any) => {
        if (data?.message) {
            const payload = {
                id: 4,
                data: data.message.trim(),
                alinda: false
            }
            setChats((prev: any) => [...prev, payload])
            setValue('message', '')
        }
    };

    const handleInput = () => {
        const textarea: any = textareaRef.current;

        if (textarea) {
            textarea.style.height = 'auto';

            textarea.style.height = Math.min(textarea.scrollHeight, 250) + 'px';
        }
    }

    return (
        <div className="flex items-end p-[1.25rem]">
            {isRecording ? (
                <Button onClick={() => stopRecording()} variant="text" className="p-0 bg-[#FFC42526] hover:bg-[#FFC425] hover:text-[#0C0C0C] rounded-[3.125rem] md:h-[5.125rem] md:w-[5.9375rem]">
                    <FaStop className="w-[1.875rem] h-[1.875rem]" />
                </Button>
            ) : (
                <Button onClick={() => startRecording()} variant="text" className="p-0 bg-[#FFC42526] hover:bg-[#FFC425] hover:text-[#0C0C0C] rounded-[3.125rem] md:h-[5.125rem] md:w-[5.9375rem]">
                    <MdMicNone className="w-[1.875rem] h-[1.875rem]" />
                </Button>
            )}
            <form onSubmit={handleSubmit(sendMessage)} className={`${preview ? 'w-[calc(100%-10rem)]' : 'w-full'} transition-all duration-400`}>
                {/* {audioUrl && <div className="bg-[#0C0C0C] rounded-[1.5625rem] py-[2.125rem] px-[1.25rem] ml-3 flex items-center">
                    <AudioPreview audioUrl={audioUrl} deleteAudio={deleteAudio} />
                    <Button type="submit" disabled={!audioUrl} variant="text" className="p-0 rounded-[3.125rem] h-[1.875rem] w-[1.875rem] ms-5">
                        <BsFillSendFill className="text-primary  w-[2rem] h-[2rem]" />
                    </Button>
                </div>} */}
                {!audioUrl && <div className="w-full relative transition-all duration-400">
                    {errors?.message && <p className="text-red text-[13px] my-1 rizzui-textarea-error-text pl-3">{errors?.message?.message}</p>}
                    <Textarea
                        {...register('message', {
                            maxLength: { value: 5000, message: "Message has maximum limit of 5000 characters" }
                        })}
                        placeholder="Type anything here"
                        className="w-full transition-all duration-400 "
                        onInput={handleInput}
                        style={{
                            overflow: 'hidden',
                            // maxHeight: '250px',
                            resize: 'none',
                        }}
                        textareaClassName="ml-[0.625rem] border-0 bg-[#0C0C0C] text-[1.25rem] leading-[0.9375rem] rounded-[1.5625rem] h-[5.125rem] !py-[2.125rem] pl-[1.25rem] pr-[2.5rem]"
                    ></Textarea>
                    <Button type="submit" disabled={watch('message')?.length < 1} variant="text" className="p-0 rounded-[3.125rem] h-[1.875rem] w-[1.875rem] absolute bottom-[1.3125rem] right-[0.625rem]">
                        {watch('message')?.length < 1
                            ? <FiSend className="w-[1.25rem] h-[1.25rem]" />
                            : <BsFillSendFill className="text-primary  w-[1.25rem] h-[1.25rem]" />
                        }
                    </Button>
                    {watch('message')?.length > 0 && (
                        <span className="text-[1.25rem] leading-[0.9375rem] absolute bottom-[1.625rem] right-[3REM] text-[#525252]">{watch('message')?.length}/5000</span>
                    )}
                </div>}
            </form>
            <AudioLoader show={preview} size="5.9375rem" />
        </div>
    )
}

export default ChatFooter