import Link from "next/link"
import { Car } from "lucide-react"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">EasyCommute</span>
        </Link>
      </div>
    </header>
  )
}

