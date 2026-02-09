"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "../../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InitiateRide() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    time: "",
    seats: "1",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would typically send this data to a server
    // For now, we'll just pass it as query parameters
    const queryParams = new URLSearchParams(formData).toString()
    router.push(`/initiate-ride/confirmation?${queryParams}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Initiate a Ride</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Offer a Ride</CardTitle>
            <CardDescription>Provide details about your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure</Label>
                <Input
                  id="departure"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  placeholder="Enter departure location"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Enter destination"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" value={formData.date} onChange={handleChange} type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" value={formData.time} onChange={handleChange} type="time" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seats">Available Seats</Label>
                <Input
                  id="seats"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max="8"
                  required
                />
              </div>
              <div className="flex justify-between">
                <Link href="/">
                  <Button variant="outline">Back</Button>
                </Link>
                <Button type="submit">Offer Ride</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

