import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const LOCATION_KEY = {
    location: (coordinates: Coordinates | null) => ["location", coordinates] as const,
}

export function useReverseGeocode(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: LOCATION_KEY.location(coordinates ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates
    });
}