"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for ride requests
const mockRideRequests = [
  {
    id: 1,
    driver: "Alice",
    driverRating: 4.8,
    departure: "New York",
    destination: "Boston",
    date: "2025-01-20",
    time: "08:00",
    price: "$45.00",
    status: "pending",
    requestedAt: "2025-01-15T14:30:00Z",
  },
  {
    id: 2,
    driver: "Bob",
    driverRating: 4.5,
    departure: "New York",
    destination: "Philadelphia",
    date: "2025-01-22",
    time: "09:30",
    price: "$32.50",
    status: "accepted",
    requestedAt: "2025-01-16T10:15:00Z",
    acceptedAt: "2025-01-16T11:45:00Z",
  },
  {
    id: 3,
    driver: "Charlie",
    driverRating: 4.9,
    departure: "Boston",
    destination: "New York",
    date: "2025-01-25",
    time: "14:00",
    price: "$44.00",
    status: "rejected",
    requestedAt: "2025-01-17T09:20:00Z",
    rejectedAt: "2025-01-17T12:10:00Z",
    rejectionReason: "No more seats available",
  },
  {
    id: 4,
    driver: "David",
    driverRating: 4.7,
    departure: "New York",
    destination: "Washington DC",
    date: "2025-01-28",
    time: "07:45",
    price: "$52.00",
    status: "accepted",
    requestedAt: "2025-01-18T16:40:00Z",
    acceptedAt: "2025-01-18T18:15:00Z",
  },
  {
    id: 5,
    driver: "Eve",
    driverRating: 4.6,
    departure: "Philadelphia",
    destination: "New York",
    date: "2025-01-30",
    time: "10:15",
    price: "$35.00",
    status: "pending",
    requestedAt: "2025-01-19T11:30:00Z",
  },
]

export default function MyRequests() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // If not logged in, don't render the page
  if (!user) {
    return null
  }

  // Filter requests by status
  const pendingRequests = mockRideRequests.filter((request) => request.status === "pending")
  const acceptedRequests = mockRideRequests.filter((request) => request.status === "accepted")
  const rejectedRequests = mockRideRequests.filter((request) => request.status === "rejected")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Ride Requests</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {pendingRequests.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {mockRideRequests.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-6">
                {mockRideRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <EmptyState message="You don't have any pending ride requests." />
            ) : (
              <div className="space-y-6">
                {pendingRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted">
            {acceptedRequests.length === 0 ? (
              <EmptyState message="You don't have any accepted ride requests." />
            ) : (
              <div className="space-y-6">
                {acceptedRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedRequests.length === 0 ? (
              <EmptyState message="You don't have any rejected ride requests." />
            ) : (
              <div className="space-y-6">
                {rejectedRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Request Card Component
function RequestCard({ request }: { request: any }) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-4 flex-1">
            {/* Status Badge */}
            <div className="flex justify-between items-center">
              <Badge
                variant={
                  request.status === "accepted"
                    ? "success"
                    : request.status === "rejected"
                      ? "destructive"
                      : "secondary"
                }
                className={
                  request.status === "accepted" ? "bg-green-500" : request.status === "rejected" ? "bg-red-500" : ""
                }
              >
                {request.status === "pending" && "Pending"}
                {request.status === "accepted" && "Accepted"}
                {request.status === "rejected" && "Rejected"}
              </Badge>
              <span className="text-sm text-muted-foreground">Requested on {formatDate(request.requestedAt)}</span>
            </div>

            {/* Route Info */}
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <div className="font-medium">
                  {request.departure} → {request.destination}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {request.date}
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {request.time}
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <div className="font-medium">Driver: {request.driver}</div>
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.floor(request.driverRating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm">{request.driverRating}</span>
                </div>
              </div>
            </div>

            {/* Rejection Reason (if applicable) */}
            {request.status === "rejected" && request.rejectionReason && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Reason: {request.rejectionReason}</AlertDescription>
              </Alert>
            )}

            {/* Acceptance Info (if applicable) */}
            {request.status === "accepted" && request.acceptedAt && (
              <div className="text-sm text-green-600">Accepted on {formatDate(request.acceptedAt)}</div>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col items-end gap-4">
            <div className="text-2xl font-bold">{request.price}</div>

            {request.status === "pending" && (
              <Button variant="outline" className="w-full md:w-auto">
                Cancel Request
              </Button>
            )}

            {request.status === "accepted" && (
              <div className="space-y-2 w-full md:w-auto">
                <Button className="w-full">Contact Driver</Button>
                <Button variant="outline" className="w-full">
                  Cancel Ride
                </Button>
              </div>
            )}

            {request.status === "rejected" && (
              <Button variant="outline" className="w-full md:w-auto">
                Find Similar Rides
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Empty State Component
function EmptyState({ message = "You haven't requested any rides yet." }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3 mb-4">
          <MapPin className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Ride Requests</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">{message}</p>
        <Link href="/join-ride">
          <Button>Find a Ride</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

