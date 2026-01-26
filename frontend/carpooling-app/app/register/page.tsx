"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function Register() {
  const router = useRouter()
  const { register, isLoading } = useAuth()

  // Basic user info
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Driver info
  const [isDriver, setIsDriver] = useState(false)
  const [licenseNumber, setLicenseNumber] = useState("")
  const [carRegistration, setCarRegistration] = useState("")
  const [insurancePolicy, setInsurancePolicy] = useState("")

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate driver info if user wants to offer rides
    if (isDriver) {
      if (!licenseNumber || !carRegistration || !insurancePolicy) {
        setError("Please complete all driver information fields")
        return
      }
    }

    try {
      const driverInfo = isDriver
        ? {
            isDriver: true,
            licenseNumber,
            carRegistration,
            insurancePolicy,
          }
        : undefined

      const success = await register(name, email, password, driverInfo)
      if (success) {
        router.push("/")
      } else {
        setError("Registration failed")
      }
    } catch (err) {
      setError("An error occurred during registration")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Join EasyCommute to start sharing rides</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic user information */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Driver option */}
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="isDriver"
                  checked={isDriver}
                  onCheckedChange={(checked) => setIsDriver(checked === true)}
                />
                <Label htmlFor="isDriver" className="font-medium cursor-pointer">
                  I want to offer rides (become a driver)
                </Label>
              </div>

              {/* Driver information (conditional) */}
              {isDriver && (
                <div className="space-y-4 pt-2">
                  <Separator />
                  <h3 className="font-semibold text-lg">Driver Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Please provide your driving credentials to offer rides
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Driving License Number</Label>
                    <Input
                      id="licenseNumber"
                      placeholder="DL12345678"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carRegistration">Car Registration Number</Label>
                    <Input
                      id="carRegistration"
                      placeholder="ABC123"
                      value={carRegistration}
                      onChange={(e) => setCarRegistration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insurancePolicy">Insurance Policy Number</Label>
                    <Input
                      id="insurancePolicy"
                      placeholder="INS-12345-XYZ"
                      value={insurancePolicy}
                      onChange={(e) => setInsurancePolicy(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

