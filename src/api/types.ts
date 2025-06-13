export type Coordinates = {
    lat: number
    lon: number
}

export type Condition = {
    id: number
    main: string
    description: string
    icon: string
}

export type Weather = {
    id: number
    name: string
    coord: Coordinates
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        country: string
        sunrise: number
        sunset: number
    }
    weather: Condition[]
}

export type Forecast = {
    list: Array<{
        dt: number
        main: Weather["main"]
        weather: Weather["weather"]
        wind: Weather["wind"]
        dt_txt: string
    }>
    city: {
        name: string
        country: string
        sunrise: number
        sunset: number
    }
}

export type Geocode = {
    name: string
    local_names?: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
}