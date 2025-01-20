"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "../../../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Mock data for available rides
const mockRides = [
  { id: 1, driver: "Alice", departure: "New York", destination: "Boston", date: "2025-01-20", time: "08:00", seats: 3 },
  { id: 2, driver: "Bob", departure: "New York", destination: "Boston", date: "2025-01-20", time: "10:00", seats: 2 },
  {
    id: 3,
    driver: "Charlie",
    departure: "New York",
    destination: "Boston",
    date: "2025-01-21",
    time: "09:00",
    seats: 4,
  },
  { id: 4, driver: "David", departure: "Boston", destination: "New York", date: "2025-01-20", time: "14:00", seats: 1 },
  { id: 5, driver: "Eve", departure: "Boston", destination: "New York", date: "2025-01-21", time: "07:00", seats: 3 },
]

export default function SearchResults() {
  const searchParams = useSearchParams()

  const filteredRides = useMemo(() => {
    const departure = searchParams.get("departure")
    const destination = searchParams.get("destination")
    const date = searchParams.get("date")

    return mockRides.filter(
      (ride) =>
        ride.departure.toLowerCase() === departure?.toLowerCase() &&
        ride.destination.toLowerCase() === destination?.toLowerCase() &&
        ride.date === date,
    )
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Rides</h1>
        {filteredRides.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p>No rides found matching your criteria. Please try a different search.</p>
              <Link href="/join-ride" className="block mt-4">
                <Button variant="outline">Back to Search</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRides.map((ride) => (
              <Card key={ride.id}>
                <CardHeader>
                  <CardTitle>
                    {ride.departure} to {ride.destination}
                  </CardTitle>
                  <CardDescription>Driver: {ride.driver}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Date:</strong> {ride.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {ride.time}
                  </p>
                  <p>
                    <strong>Available Seats:</strong> {ride.seats}
                  </p>
                  <div className="mt-4">
                    <Button>Request to Join</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="mt-6">
              <Link href="/join-ride">
                <Button variant="outline">Back to Search</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

