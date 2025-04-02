"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, CheckCircle, X, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock data for ride requests received by the driver
const mockReceivedRequests = [
  {
    id: 1,
    ride: {
      id: 101,
      departure: "New York",
      destination: "Boston",
      date: "2025-01-20",
      time: "08:00",
      price: "$45.00",
      availableSeats: 3,
    },
    passenger: {
      id: 201,
      name: "John Smith",
      rating: 4.7,
      trips: 12,
      joinedDate: "2024-10",
      avatar: null,
    },
    status: "pending",
    requestedAt: "2025-01-15T14:30:00Z",
  },
  {
    id: 2,
    ride: {
      id: 102,
      departure: "New York",
      destination: "Philadelphia",
      date: "2025-01-22",
      time: "09:30",
      price: "$32.50",
      availableSeats: 2,
    },
    passenger: {
      id: 202,
      name: "Emily Johnson",
      rating: 4.9,
      trips: 8,
      joinedDate: "2024-11",
      avatar: null,
    },
    status: "accepted",
    requestedAt: "2025-01-16T10:15:00Z",
    acceptedAt: "2025-01-16T11:45:00Z",
  },
  {
    id: 3,
    ride: {
      id: 103,
      departure: "Boston",
      destination: "New York",
      date: "2025-01-25",
      time: "14:00",
      price: "$44.00",
      availableSeats: 1,
    },
    passenger: {
      id: 203,
      name: "Michael Brown",
      rating: 4.2,
      trips: 3,
      joinedDate: "2025-01",
      avatar: null,
    },
    status: "rejected",
    requestedAt: "2025-01-17T09:20:00Z",
    rejectedAt: "2025-01-17T12:10:00Z",
    rejectionReason: "No more seats available",
  },
  {
    id: 4,
    ride: {
      id: 104,
      departure: "New York",
      destination: "Washington DC",
      date: "2025-01-28",
      time: "07:45",
      price: "$52.00",
      availableSeats: 2,
    },
    passenger: {
      id: 204,
      name: "Sarah Davis",
      rating: 4.8,
      trips: 15,
      joinedDate: "2024-09",
      avatar: null,
    },
    status: "pending",
    requestedAt: "2025-01-18T16:40:00Z",
  },
  {
    id: 5,
    ride: {
      id: 105,
      departure: "Philadelphia",
      destination: "New York",
      date: "2025-01-30",
      time: "10:15",
      price: "$35.00",
      availableSeats: 3,
    },
    passenger: {
      id: 205,
      name: "David Wilson",
      rating: 4.5,
      trips: 6,
      joinedDate: "2024-12",
      avatar: null,
    },
    status: "accepted",
    requestedAt: "2025-01-19T11:30:00Z",
    acceptedAt: "2025-01-19T13:20:00Z",
  },
]

export default function DriverRideRequests() {
  const router = useRouter()
  const { user } = useAuth()
  const [requests, setRequests] = useState(mockReceivedRequests)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  // Redirect if not logged in or not a driver
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (!user.driverInfo?.isDriver) {
      router.push("/")
    }
  }, [user, router])

  // If not logged in or not a driver, don't render the page
  if (!user || !user.driverInfo?.isDriver) {
    return null
  }

  // Filter requests by status
  const pendingRequests = requests.filter((request) => request.status === "pending")
  const acceptedRequests = requests.filter((request) => request.status === "accepted")
  const rejectedRequests = requests.filter((request) => request.status === "rejected")

  // Handle accept request
  const handleAcceptRequest = (requestId: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "accepted",
              acceptedAt: new Date().toISOString(),
            }
          : request,
      ),
    )
  }

  // Handle reject request
  const handleRejectRequest = (requestId: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: "rejected",
              rejectedAt: new Date().toISOString(),
              rejectionReason: rejectionReason || "Request declined by driver",
            }
          : request,
      ),
    )
    setIsRejectDialogOpen(false)
    setRejectionReason("")
  }

  // Open reject dialog
  const openRejectDialog = (request: any) => {
    setSelectedRequest(request)
    setIsRejectDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Ride Requests</h1>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
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
            <TabsTrigger value="all">All Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <EmptyState message="You don't have any pending ride requests." />
            ) : (
              <div className="space-y-6">
                {pendingRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onAccept={() => handleAcceptRequest(request.id)}
                    onReject={() => openRejectDialog(request)}
                  />
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
                  <RequestCard key={request.id} request={request} onAccept={() => {}} onReject={() => {}} />
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
                  <RequestCard key={request.id} request={request} onAccept={() => {}} onReject={() => {}} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all">
            {requests.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-6">
                {requests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onAccept={request.status === "pending" ? () => handleAcceptRequest(request.id) : undefined}
                    onReject={request.status === "pending" ? () => openRejectDialog(request) : undefined}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Rejection Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Ride Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request. This will be shared with the passenger.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Label htmlFor="rejection-reason">Reason (optional)</Label>
            <Textarea
              id="rejection-reason"
              placeholder="No more seats available, schedule conflict, etc."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => selectedRequest && handleRejectRequest(selectedRequest.id)}>
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Request Card Component
function RequestCard({
  request,
  onAccept,
  onReject,
}: {
  request: any
  onAccept?: () => void
  onReject?: () => void
}) {
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

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Passenger Info */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={request.passenger.avatar || undefined} alt={request.passenger.name} />
                <AvatarFallback>{getInitials(request.passenger.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{request.passenger.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.floor(request.passenger.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm">{request.passenger.rating}</span>
                </div>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{request.passenger.trips} trips taken</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Member since {request.passenger.joinedDate}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="text-sm text-muted-foreground">Request received on {formatDate(request.requestedAt)}</div>

            {request.status !== "pending" && (
              <Badge
                variant={request.status === "accepted" ? "success" : "destructive"}
                className={request.status === "accepted" ? "bg-green-500 mt-2" : "bg-red-500 mt-2"}
              >
                {request.status === "accepted" ? "Accepted" : "Rejected"}
              </Badge>
            )}
          </div>

          {/* Ride Details */}
          <div className="md:w-2/3 flex flex-col">
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-medium text-lg">Ride Details</h3>
                <div className="flex items-center mt-2">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {request.ride.departure} → {request.ride.destination}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {request.ride.date}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 inline mr-1" />
                      {request.ride.time}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-xl font-bold">{request.ride.price}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Available Seats</div>
                  <div className="text-xl font-bold">{request.ride.availableSeats}</div>
                </div>
              </div>

              {request.status === "rejected" && request.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
                  <div className="text-sm font-medium text-red-800">Rejection Reason:</div>
                  <div className="text-sm text-red-700">{request.rejectionReason}</div>
                </div>
              )}
            </div>

            {/* Actions */}
            {request.status === "pending" && onAccept && onReject && (
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={onReject}>
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button className="flex-1" onClick={onAccept}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
              </div>
            )}

            {request.status === "accepted" && (
              <Button className="mt-6">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Passenger
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Empty State Component
function EmptyState({ message = "You don't have any ride requests yet." }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3 mb-4">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Ride Requests</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">{message}</p>
      </CardContent>
    </Card>
  )
}

