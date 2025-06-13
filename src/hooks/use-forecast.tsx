import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const FORECAST_KEY = {
    forecast: (coordinates: Coordinates | null) => ["forecast", coordinates] as const,
}

export function useForecast(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: FORECAST_KEY.forecast(coordinates ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates
    });
}