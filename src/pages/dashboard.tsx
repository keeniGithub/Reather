import type { Geocode } from "@/api/types";
import LoadingSkeleton from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { useForecast } from "@/hooks/use-forecast";
import { useReverseGeocode } from "@/hooks/use-geocode";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useWether } from "@/hooks/use-weather";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import Weather from "@/components/weather";
import Temperature from "@/components/temperature";
import Details from "@/components/details";
import Forecast from "@/components/forecast";

export default function Dashboard() {
  const { coordinates, error: locError, getLocation, isLoading: locLoading } = useGeolocation()

  const location = useReverseGeocode(coordinates)
  const weather = useWether(coordinates)
  const forecast = useForecast(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      Promise.all([weather.refetch(), location.refetch(), forecast.refetch()]).then(() => {
        toast.success('Location refreshed successfully!')
      })
    }
    
    if (locError)
      toast.error(`Error to get your location: ${locError}`)
  }

  if (locLoading || !weather.data || !forecast.data)
    return <LoadingSkeleton />

  if (!coordinates)
    toast.error('Location not found. Please enable location services in your browser')

  const locationData: Geocode | undefined = location.data?.[0]

  if (weather.error || forecast.error)
    toast.error('Error fetching weather data. Please try again')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={weather.isFetching || forecast.isFetching}>
          <RefreshCw className={`h-4 w-4 ${weather.isFetching || forecast.isFetching && 'animate-spin'}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <Weather data={weather.data} location={locationData} />
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
