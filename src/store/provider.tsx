'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'

export default function StoreProvider({ children, initialState }: { children: React.ReactNode; initialState: any }) {
    const storeRef = useRef<AppStore>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore(initialState)
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
