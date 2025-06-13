import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
    weather: (coordinates: Coordinates | null) => ["weather", coordinates] as const
}

export function useWether(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.weather(coordinates ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates
    });
}