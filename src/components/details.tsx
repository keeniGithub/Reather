import type { Weather } from "@/api/types"
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type DetailsProps = {
    data: Weather
}
export default function Details({ data }: DetailsProps) {
    const { wind, main, sys } = data

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), 'HH:mm')
    }

    const getWindDirection = (deg: number) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8
        return directions[index]
    }

    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-400"
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-400"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: "text-green-400"
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-400"
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details.map((detail) => {
                        return (
                            <div key={detail.title} className="flex items-center gap-4 rounded-lg border p-4">
                                <detail.icon className={`h-6 w-6 ${detail.color}`}/>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                                    <p className="text-sm text-muted-foreground">{detail.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
