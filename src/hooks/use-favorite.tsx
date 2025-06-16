import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "./use-localstorage"

type FavoriteProps = {
    id: string
    name: string
    lat: number
    lon: number
    country: string
    state?: string
    addedAt: number
}

export function useFavorite() {
    const [favorite, setFavorite] = useLocalStorage<FavoriteProps[]>("favorites", [])

    const queryClient = useQueryClient()

    const favoriteQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorite,
        initialData: favorite,
        staleTime: Infinity,
    })

    const addToFavorite = useMutation({
        mutationFn: async (city: Omit<FavoriteProps, "id" | "addedAt">) => {
            const newFavorite: FavoriteProps = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now()
            }

            const exists = favorite.some((fav) => fav.id === newFavorite.id)
            if (exists) 
                return favorite

            const newFavorites = [...favorite, newFavorite].slice(0, 10)

            setFavorite(newFavorites)
            return newFavorites
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            })
        }
    })

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavorite = favorite.filter((fav) => fav.id !== cityId)
            setFavorite(newFavorite)
            return newFavorite
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            })
        }
    })

    return {
        favorite: favoriteQuery.data,
        addToFavorite,
        removeFavorite,
        isFavorite: (lat: number, lon: number) => favorite.some((fav) => fav.lat === lat && fav.lon === lon)
    }
}