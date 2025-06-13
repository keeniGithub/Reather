import { API_CONFIG } from "./config"
import type { Coordinates, Forecast, Geocode, Weather } from "./types";

class WeatherAPI {
    private createUrl(endpoint: string, params: Record<string, string | number> = {}): string {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        })

        return `${endpoint}?${searchParams.toString()}`
    }

    private fetchData<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                if (!response.ok)
                    throw new Error(`HTTP error, status: ${response.status}`)
                return response.json()
            })
            .catch(error => {
                console.error('Fetch error:', error)
                throw error
            })
    }

    async getCurrentWeather({lat, lon}: Coordinates): Promise<Weather> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        })

        return this.fetchData<Weather>(url);
    }

    async getForecast({lat, lon}: Coordinates): Promise<Forecast> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        })

        return this.fetchData<Forecast>(url);
    }

    async reverseGeocode({lat, lon}: Coordinates): Promise<Geocode[]> {
        const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1
        })

        return this.fetchData<Geocode[]>(url);
    }
}

export const weatherAPI = new WeatherAPI()