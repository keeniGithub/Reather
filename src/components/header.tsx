import { Link } from "react-router-dom";
import { ModeToggle } from "./ui/mode-toggle";
import { useTheme } from "./provider/theme-provider";
import Search from "./search";

export default function Header() {
    const { theme } = useTheme()

    return (
        <header className="sticky top-0 z-50 supports-[backdrop-filter]:bg-background/25 backdrop-blur-md border-b py-2">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/">
                    <img src={theme === "dark" ? "/logo.png" : "/logo2.png"} alt="Reather logo" className="h-10"/>
                </Link>

                <div className="flex gap-3">
                    <Search />
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}
