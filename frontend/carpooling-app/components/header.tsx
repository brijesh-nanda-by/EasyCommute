"use client"

import Link from "next/link"
import { Car, User, LogOut, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function Header() {
  // Add state to track if auth is ready
  const [authReady, setAuthReady] = useState(false)
  const [authState, setAuthState] = useState<{ user: any | null; logout: () => void }>({
    user: null,
    logout: () => {},
  })

  // Safely try to use the auth context
  const auth = useAuth()

  useEffect(() => {
    if (auth) {
      setAuthState({ user: auth.user, logout: auth.logout })
      setAuthReady(true)
    } else {
      console.log("Auth context not available yet")
      setAuthReady(true) // Set to true even if auth is not available to avoid infinite loading
    }
  }, [auth])

  // Destructure from state
  const { user, logout } = authState

  // Don't render user-specific elements until auth is ready
  if (!authReady) {
    return (
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold">EasyCommute</span>
          </Link>
          <div className="flex space-x-2">
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">EasyCommute</span>
        </Link>

        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                  {user.driverInfo?.isDriver && (
                    <Badge variant="secondary" className="ml-1">
                      Driver
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {user.driverInfo?.isDriver ? (
                  <Link href="/driver-profile">
                    <DropdownMenuItem>
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Driver Profile</span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <Link href="/user-profile">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                  </Link>
                )}
                {user.driverInfo?.isDriver ? (
                  <Link href="/driver/ride-requests">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      <span>Ride Requests</span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <Link href="/my-requests">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      <span>My Ride Requests</span>
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

