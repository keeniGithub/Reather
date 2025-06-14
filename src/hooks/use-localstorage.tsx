import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initValue: T) {
    const [storageValue, setStorageValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initValue
        } catch (error) {
            console.error(error)
            return initValue
        }
    })

    useEffect(() => {
       try {
            window.localStorage.setItem(key, JSON.stringify(storageValue))
        } catch (error) {
            console.error(error)
        } 
    }, [key, storageValue])
 
    return [storageValue, setStorageValue] as const
}