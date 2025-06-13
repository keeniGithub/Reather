import type { Geocode, Weather } from "@/api/types"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react"

type CurrentWeatherProps = {
    data: Weather
    location?: Geocode
}

export default function CurrentWeather({ data, location }: CurrentWeatherProps) {
    const { weather: [currentWether], main: {temp, feels_like, temp_min, temp_max, humidity}, wind: {speed} } = data

    return (
        <Card className="overflow-hidden">
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end">
                                <h2 className="text-2xl font-bold tracking-tighter">{location?.name}</h2>
                                {location?.state && (
                                    <span className="text-muted-foreground">, {location.state}</span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {location?.country || 'Unknown Country'}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-7xl font-bold tracking-tighter">
                                {temp.toFixed(1)}°C
                            </p>

                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Feels like {feels_like.toFixed(1)}°C
                                </p>
                                <div className="flex gap-2 text-start font-medium">
                                    <span className="flex items-center gap-1 text-blue-400">
                                        <ArrowDown className="h-4 w-4" />
                                        {temp_min.toFixed(1)}°C
                                    </span>
                                    <span className="flex items-center gap-1 text-red-400">
                                        <ArrowUp className="h-4 w-4" />
                                        {temp_max.toFixed(1)}°C
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                               <Droplets className="h-4 w-4 text-blue-400" />
                               <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Humidty</p>
                                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-2">
                               <Wind className="h-4 w-4 text-blue-400" />
                               <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Wind Speed</p>
                                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                               </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center flex-col">
                        <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${currentWether.icon}@4x.png`} alt="" />
                            <div className="absolute bottom-0 text-center">
                                <p className="text-sm font-medium capitalize">
                                    {currentWether.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
