"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, User, Shield, Clock } from "lucide-react"

// Mock trip history data
const mockTripHistory = [
  {
    id: 1,
    date: "2025-01-15",
    time: "08:30",
    from: "New York",
    to: "Boston",
    passengers: 2,
    earnings: "$45.00",
    status: "completed",
  },
  {
    id: 2,
    date: "2025-01-10",
    time: "14:15",
    from: "Boston",
    to: "New York",
    passengers: 3,
    earnings: "$60.00",
    status: "completed",
  },
  {
    id: 3,
    date: "2025-01-05",
    time: "09:00",
    from: "New York",
    to: "Philadelphia",
    passengers: 1,
    earnings: "$30.00",
    status: "completed",
  },
  {
    id: 4,
    date: "2025-01-25",
    time: "10:30",
    from: "New York",
    to: "Washington DC",
    passengers: 2,
    earnings: "$75.00",
    status: "upcoming",
  },
]

export default function DriverProfile() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect if not logged in or not a driver
  useEffect(() => {
    if (!user || !user.driverInfo?.isDriver) {
      router.push("/")
    }
  }, [user, router])

  // If not logged in or not a driver, don't render the page
  if (!user || !user.driverInfo?.isDriver) {
    return null
  }

  // Calculate stats
  const completedTrips = mockTripHistory.filter((trip) => trip.status === "completed")
  const upcomingTrips = mockTripHistory.filter((trip) => trip.status === "upcoming")
  const totalEarnings = completedTrips.reduce((sum, trip) => sum + Number.parseFloat(trip.earnings.replace("$", "")), 0)
  const totalPassengers = completedTrips.reduce((sum, trip) => sum + trip.passengers, 0)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Driver Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Driver Info Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {user.name}
              </CardTitle>
              <CardDescription>Driver Profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                <p>{user.email}</p>
              </div>

              {/* Ratings Section */}
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Driver Rating</h3>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= 4.8 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-semibold">4.8/5</span>
                  <span className="ml-2 text-xs text-muted-foreground">(124 ratings)</span>
                </div>
              </div>

              <Separator />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">License Number</h3>
                <p>{user.driverInfo.licenseNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Car Registration</h3>
                <p>{user.driverInfo.carRegistration}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Insurance Policy</h3>
                <p>{user.driverInfo.insurancePolicy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Trip History */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">{completedTrips.length}</p>
                    <p className="text-sm text-muted-foreground">Completed Trips</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">{upcomingTrips.length}</p>
                    <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <User className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">{totalPassengers}</p>
                    <p className="text-sm text-muted-foreground">Total Passengers</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trip History */}
            <Card>
              <CardHeader>
                <CardTitle>Trip History</CardTitle>
                <CardDescription>Your past and upcoming trips</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Trips</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {mockTripHistory.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4">
                    {completedTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Trip Card Component
function TripCard({ trip }: { trip: any }) {
  // Add mock rating data to each trip
  const rating = trip.status === "completed" ? (Math.random() * 2 + 3).toFixed(1) : null

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{trip.date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{trip.time}</span>
          </div>
          <Badge variant={trip.status === "completed" ? "default" : "secondary"}>
            {trip.status === "completed" ? "Completed" : "Upcoming"}
          </Badge>
        </div>

        <div className="mt-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
          <span className="font-medium">{trip.from}</span>
          <span className="mx-2">→</span>
          <span className="font-medium">{trip.to}</span>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <User className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>
              {trip.passengers} passenger{trip.passengers !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="font-semibold">{trip.earnings}</div>
        </div>

        {trip.status === "completed" && rating && (
          <div className="mt-3 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-xs">{rating}/5</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

