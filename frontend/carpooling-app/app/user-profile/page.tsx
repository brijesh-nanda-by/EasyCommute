"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, User, Clock, Star } from "lucide-react"

// Mock trip history data for a passenger
const mockPassengerTrips = [
  {
    id: 1,
    date: "2025-01-18",
    time: "09:30",
    from: "New York",
    to: "Boston",
    driver: "Alice Smith",
    cost: "$42.00",
    status: "completed",
    ratingGiven: 5,
  },
  {
    id: 2,
    date: "2025-01-12",
    time: "15:45",
    from: "Boston",
    to: "New York",
    driver: "Bob Johnson",
    cost: "$38.50",
    status: "completed",
    ratingGiven: 4,
  },
  {
    id: 3,
    date: "2025-01-05",
    time: "10:15",
    from: "New York",
    to: "Philadelphia",
    driver: "Charlie Davis",
    cost: "$28.00",
    status: "completed",
    ratingGiven: 5,
  },
  {
    id: 4,
    date: "2025-01-28",
    time: "08:00",
    from: "New York",
    to: "Washington DC",
    driver: "David Wilson",
    cost: "$65.00",
    status: "upcoming",
  },
]

export default function UserProfile() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  // If not logged in, don't render the page
  if (!user) {
    return null
  }

  // Calculate stats
  const completedTrips = mockPassengerTrips.filter((trip) => trip.status === "completed")
  const upcomingTrips = mockPassengerTrips.filter((trip) => trip.status === "upcoming")
  const totalSpent = completedTrips.reduce((sum, trip) => sum + Number.parseFloat(trip.cost.replace("$", "")), 0)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {user.name}
              </CardTitle>
              <CardDescription>Passenger Profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                <p>{user.email}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Member Since</h3>
                <p>January 2025</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Preferred Payment Method</h3>
                <p>Visa •••• 4242</p>
              </div>

              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Favorite Routes</h3>
                <div className="mt-1 space-y-1">
                  <p className="text-sm">New York → Boston</p>
                  <p className="text-sm">Boston → New York</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Trip History */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">{completedTrips.length}</p>
                    <p className="text-sm text-muted-foreground">Trips Taken</p>
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
                    <Star className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trip History */}
            <Card>
              <CardHeader>
                <CardTitle>My Trips</CardTitle>
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
                    {mockPassengerTrips.map((trip) => (
                      <PassengerTripCard key={trip.id} trip={trip} />
                    ))}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4">
                    {completedTrips.map((trip) => (
                      <PassengerTripCard key={trip.id} trip={trip} />
                    ))}
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingTrips.map((trip) => (
                      <PassengerTripCard key={trip.id} trip={trip} />
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

// Passenger Trip Card Component
function PassengerTripCard({ trip }: { trip: any }) {
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
            <span>Driver: {trip.driver}</span>
          </div>
          <div className="font-semibold">{trip.cost}</div>
        </div>

        {trip.status === "completed" && trip.ratingGiven && (
          <div className="mt-3 flex items-center">
            <span className="text-xs text-muted-foreground mr-2">Your rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= trip.ratingGiven ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

