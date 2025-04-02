"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DriverInfo = {
  isDriver: boolean
  licenseNumber?: string
  carRegistration?: string
  insurancePolicy?: string
}

type User = {
  id: string
  name: string
  email: string
  driverInfo?: DriverInfo
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, driverInfo?: DriverInfo) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("easycommute-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to verify credentials
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any email with password "password"
    if (password === "password") {
      // Try to find existing user in localStorage
      const savedUser = localStorage.getItem("easycommute-user")
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        if (parsedUser.email === email) {
          setUser(parsedUser)
          setIsLoading(false)
          return true
        }
      }

      // Create new user if not found
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0], // Use part of email as name
        email,
      }
      setUser(newUser)
      localStorage.setItem("easycommute-user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Mock register function
  const register = async (name: string, email: string, password: string, driverInfo?: DriverInfo) => {
    // In a real app, this would make an API call to create a user
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, always succeed
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      driverInfo,
    }
    setUser(newUser)
    localStorage.setItem("easycommute-user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("easycommute-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

