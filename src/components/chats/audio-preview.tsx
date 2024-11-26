import WavesurferPlayer from "@wavesurfer/react"
import { useState } from "react"
import { FaPause, FaPlay, FaTrash } from "react-icons/fa6"
import { Button } from "rizzui"

const AudioPreview = ({ audioUrl, deleteAudio }: { audioUrl: string, deleteAudio: () => void }) => {
    const [wavesurfer, setWavesurfer] = useState(null) as any
    const [isPlaying, setIsPlaying] = useState(false)

    const onReady = (ws: any) => {
        setWavesurfer(ws)
        setIsPlaying(false)
    }

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause()
    }

    const clearAudi = () => {
        deleteAudio()
        setIsPlaying(false)
    }

    return (
        <>
            <Button onClick={onPlayPause} variant="text" className="me-3 p-0 rounded-[3.125rem] h-[3.125rem] w-[3.125rem]">
                {isPlaying ? <FaPause className="w-[1.5rem] h-[1.5rem]" /> : <FaPlay className="w-[1.5rem] h-[1.5rem]" />}
            </Button>
            <div className="w-full">
                <WavesurferPlayer
                    height={50}
                    waveColor="#FFC425"
                    barWidth={3}
                    barGap={2}
                    barRadius={3}
                    url={audioUrl}
                    onReady={onReady}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            </div>
            <Button onClick={deleteAudio} variant="text" className="ms-3 p-0 rounded-[3.125rem] h-[3.125rem] w-[3.125rem]">
                <FaTrash className="w-[1.5rem] h-[1.5rem]" />
            </Button>
        </>
    )
}

export default AudioPreview