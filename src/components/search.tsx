import { useState } from "react"
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { Clock, Loader2, SearchIcon, XCircle } from "lucide-react"
import { useLocation } from "@/hooks/use-location"
import { useNavigate } from "react-router-dom"
import { useSearch } from "@/hooks/use-search"
import { format } from "date-fns"

export default function Search() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const {data, isLoading} = useLocation(query)
    const {history, clearHistory, addToHistory} = useSearch()

    const handleSelect = (city: string) => {
        const [lat, lon, name, country] = city.split("|")

        addToHistory.mutate({
            query,
            name, 
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country
        })

        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
        setOpen(false)
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="outline" className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                <SearchIcon className="mr-2 h-4 w-4" />
                Search cities...
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." value={query} onValueChange={setQuery}/>
                <CommandList>
                    {query.length > 2 && !isLoading && (
                        <CommandEmpty>No results found</CommandEmpty>
                    )}
                    <CommandGroup heading="Favorite">
                        
                    </CommandGroup>
                    
                    {history.length > 0 && (
                        <>
                            <CommandSeparator/>
                            <CommandGroup>
                                <div className="flex items-center justify-between px-2 my-2">
                                    <p className="text-xs text-muted-foreground">Recent Searches</p>
                                    <Button variant="ghost" size="sm" onClick={() => clearHistory.mutate()}>
                                        <XCircle className="h-4 w-4" />
                                        Clear
                                    </Button>
                                </div>

                                {history.map((loc) => {
                                    return (
                                        <CommandItem key={`${loc.lat}-${loc.lon}`} value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.country}`} onSelect={handleSelect}>
                                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{loc.name}</span>
                                            {loc.state && (
                                                <span className="text-sm text-muted-foreground">
                                                    , {loc.state}
                                                </span>
                                            )}
                                            <span className="text-sm text-muted-foreground">
                                                , {loc.country}
                                            </span>
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {format(loc.searchedAt, "MMM d, HH:mm")}
                                            </span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </>
                    )}
                    
                    <CommandSeparator/>

                    {data && data.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                </div>
                            )}
                            {data.map((loc) => {
                                return (
                                    <CommandItem key={`${loc.lat}-${loc.lon}`} value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.country}`} onSelect={handleSelect}>
                                        <SearchIcon className="mr-2 h-4 w-4" />
                                        <span>{loc.name}</span>
                                        {loc.state && (
                                            <span className="text-sm text-muted-foreground">
                                                , {loc.state}
                                            </span>
                                        )}
                                        <span className="text-sm text-muted-foreground">
                                            , {loc.country}
                                        </span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}
