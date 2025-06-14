import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const LOCATION_KEY = {
    search: (query: string) => ["location-search", query] as const,
}

export function useLocation(query: string) {
    return useQuery({
        queryKey: LOCATION_KEY.search(query),
        queryFn: () => weatherAPI.searchLocation(query),
        enabled: query.length >= 3
    });
}