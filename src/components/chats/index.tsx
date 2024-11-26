import { useEffect, useState } from "react"
import ChatContent from "@/components/chats/chat-content"
import ChatFooter from "@/components/chats/chat-footer"
import ChatHeader from "@/components/chats/chat-header"

const data = [
    {
        id: 1,
        alinda: true,
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor tellus, laoreet eu sodales vel, fringilla sit amet ante. Aenean aliquam ipsum libero, sit amet tincidunt libero porta ut. Cras ut ligula dui. Morbi eu aliquam quam. Proin pellentesque in lorem eu ornare. Ut ullamcorper massa urna, a maximus lorem pellentesque sit amet. Nulla auctor euismod mattis. Sed mattis eros eget massa efficitur suscipit. Morbi nisl nisi, vehicula non diam vel, rhoncus lacinia diam. Donec non luctus neque, a gravida felis. Fusce nec ante at nisl finibus imperdiet. Sed dignissim, massa eget blandit luctus, nisi massa feugiat mauris, nec euismod ligula ex a mi. Cras ut tristique sem. Integer eu ex molestie, pellentesque magna ac, efficitur lectus. Suspendisse potenti. Nullam nec scelerisque odio, et posuere turpis. Fusce at tempor nulla. Pellentesque facilisis bibendum dolor, in euismod nunc semper eleifend. Maecenas lacinia lobortis tortor sit amet cursus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas a tristique elit. Phasellus lorem eros, fringilla ut condimentum et, maximus vitae tellus. Nam fringilla lacus risus, eu fermentum nulla tempor a. Ut pulvinar viverra orci, non aliquam quam molestie vitae. In eget felis diam. Quisque dolor ligula, ornare vel vestibulum non, posuere ut turpis. Etiam ut felis neque. Quisque sed mollis augue, sit amet vestibulum sem. Ut commodo mi vitae leo viverra tincidunt."
    },
    {
        id: 2,
        alinda: false,
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor tellus, laoreet eu sodales vel, fringilla sit amet ante. Aenean aliquam ipsum libero, sit amet tincidunt libero porta ut. Cras ut ligula dui. Morbi eu aliquam quam."
    },
    {
        id: 3,
        alinda: true,
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dolor tellus, laoreet eu sodales vel, fringilla sit amet ante. Aenean aliquam ipsum libero, sit amet tincidunt libero porta ut. Cras ut ligula dui. Morbi eu aliquam quam. Proin pellentesque in lorem eu ornare. Ut ullamcorper massa urna, a maximus lorem pellentesque sit amet."
    }
]

const Chat = () => {
    const [chats, setChats] = useState<any>([])
    const [preview, setPreview] = useState<any>(false)

    useEffect(() => {
        setChats(data);
    }, [])

    return (
        <div className="flex flex-col h-full" >
            <ChatHeader setPreview={setPreview} />
            <ChatContent chats={chats} preview={preview} />
            <ChatFooter setChats={setChats} preview={preview} />
        </div>
    )
}

export default Chat;