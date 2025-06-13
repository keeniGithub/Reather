import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

type GeolocationState = {
    coordinates: Coordinates | null
    error: string | null
    isLoading: boolean
}

export function useGeolocation() {
    const [location, setLocation] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    })

    const getLocation = () => {
        setLocation(prev => ({ ...prev, isLoading: true, error: null }))
        
        if (!navigator.geolocation) {
            setLocation({
                coordinates: null,
                error: "Geolocation is not supported by this browser",
                isLoading: false
            })
            return
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                const coords: Coordinates = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
                setLocation({
                    coordinates: coords,
                    error: null,
                    isLoading: false
                })
            },
            error => {
                setLocation({
                    coordinates: null,
                    error: error.message || "Unable to retrieve location",
                    isLoading: false
                })
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    }

    useEffect(() => {
        getLocation()
    }, [])

    return {
        ...location,
        getLocation
    }
}