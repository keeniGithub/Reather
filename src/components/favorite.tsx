import type { Weather } from "@/api/types"
import { useFavorite } from "@/hooks/use-favorite"
import { Button } from "./ui/button"
import { Loader2, MinusCircle, Star, X } from "lucide-react"
import toast from "react-hot-toast"
import { ScrollArea } from "./ui/scroll-area"
import { useNavigate } from "react-router-dom"
import { useWether } from "@/hooks/use-weather"

type FavoriteButtonProps = {
    data: Weather
}

type FavoriteTableProps = {
    id: string
    name: string
    lat: number
    lon: number
    onRemove: (id: string) => void
}

export function FavoriteButton({data}: FavoriteButtonProps) {
    const {addToFavorite, isFavorite, removeFavorite} = useFavorite()
    const isCurrenltFavorite = isFavorite(data.coord.lat, data.coord.lon)

    const handleToggleFavorite = () => {
        if(isCurrenltFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.success(`Removed ${data.name} from favorites`, {
                icon: <MinusCircle/>
            })
        } else {
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            })
            toast.success(`Added ${data.name} to favorites`)
        }
    }

    return (
        <Button variant={isCurrenltFavorite ? "default" : "outline"} size="icon" className={isCurrenltFavorite ? "bg-yellow-400 hover:bg-yellow-600" : ""} onClick={handleToggleFavorite}>
            <Star className={`h-4 w-4 ${isCurrenltFavorite ? "fill-current" : ""}`}/>
        </Button>
    )
}

export function FavoriteList() {
    const {favorite, removeFavorite} = useFavorite()

    if (!favorite?.length) 
        return null

    return (
        <>
            <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
            <ScrollArea className="w-full pb-4">
                <div className="flex gap-4">
                    {favorite.map((city) => {
                        return <FavoriteTable key={city.id} {...city} onRemove={() => removeFavorite.mutate(city.id)}/>
                    })}
                </div>
            </ScrollArea>
        </>
    )
}

function FavoriteTable({id, name, lat, lon, onRemove}: FavoriteTableProps) {
    const navigate = useNavigate()
    const {data, isLoading} = useWether({lat, lon})

    return (
        <div onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)} role="button" tabIndex={0} className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md">
            <Button className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100" variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation()
                onRemove(id)
                toast.success(`Removed ${name} from favorites`, {
                    icon: <MinusCircle/>
                })
            }}>
                <X className="h-4 w-4"/>
            </Button>

            {isLoading ? (
                <div className="flex h-8 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </div>
            ) : data ? (
                <>
                    <div className="flex items-center gap-2">
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} className="h-8 w-8" />
                        <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">
                                {data.sys.country}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-xl font-bold">
                            {data.main.temp.toFixed(1)}℃
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {data.weather[0].description}
                        </p>
                    </div>
                </>
            ) : null}
        </div>
    )   
}