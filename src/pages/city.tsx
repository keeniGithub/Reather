import Details from "@/components/details"
import Forecast from "@/components/forecast"
import LoadingSkeleton from "@/components/skeleton"
import Temperature from "@/components/temperature"
import Weather from "@/components/weather"
import { useForecast } from "@/hooks/use-forecast"
import { useWether } from "@/hooks/use-weather"
import { toast } from "react-hot-toast"
import {  useSearchParams } from "react-router-dom"

export default function City() {
  const [searchParams] = useSearchParams()
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")

  const coordinates = {lat, lon}

  const weather = useWether(coordinates)
  const forecast = useForecast(coordinates)

  if (weather.error || forecast.error)
    toast.error('Error fetching weather data. Please try again')

  if (!weather.data || !forecast.data)
      return <LoadingSkeleton />
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">{forecast.data.city.name}, {weather.data.sys.country}</h1>
        <div>
          favorite
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <Weather data={weather.data} cityName={forecast.data.city.name} country={weather.data.sys.country}/>
          <Temperature data={forecast.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <Details data={weather.data}/>
          <Forecast data={forecast.data} />
        </div>
      </div>
    </div>
  )
}
