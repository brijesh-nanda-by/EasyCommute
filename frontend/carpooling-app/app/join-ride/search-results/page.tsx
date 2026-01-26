"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  MapPin,
  User,
  Calendar,
  Clock,
  Info,
  ZoomIn,
  ZoomOut,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listRides, Ride } from "../../api/ride-service";

// Mock data for available rides with coordinates
const mockRides = [
  {
    id: 1,
    driver: "Alice",
    departure: "New York",
    destination: "Boston",
    date: "2025-01-20",
    time: "08:00",
    seats: 3,
    departureCoords: { lat: 40.7128, lng: -74.006 }, // NYC coordinates
    destinationCoords: { lat: 42.3601, lng: -71.0589 }, // Boston coordinates
    driverRating: 4.8,
    price: "$45.00",
  },
  {
    id: 2,
    driver: "Bob",
    departure: "New York",
    destination: "Boston",
    date: "2025-01-20",
    time: "10:00",
    seats: 2,
    departureCoords: { lat: 40.7128, lng: -74.006 },
    destinationCoords: { lat: 42.3601, lng: -71.0589 },
    driverRating: 4.5,
    price: "$42.50",
  },
  {
    id: 3,
    driver: "Charlie",
    departure: "New York",
    destination: "Boston",
    date: "2025-01-21",
    time: "09:00",
    seats: 4,
    departureCoords: { lat: 40.7128, lng: -74.006 },
    destinationCoords: { lat: 42.3601, lng: -71.0589 },
    driverRating: 4.9,
    price: "$48.00",
  },
  {
    id: 4,
    driver: "David",
    departure: "Boston",
    destination: "New York",
    date: "2025-01-20",
    time: "14:00",
    seats: 1,
    departureCoords: { lat: 42.3601, lng: -71.0589 },
    destinationCoords: { lat: 40.7128, lng: -74.006 },
    driverRating: 4.2,
    price: "$40.00",
  },
  {
    id: 5,
    driver: "Eve",
    departure: "Boston",
    destination: "New York",
    date: "2025-01-21",
    time: "07:00",
    seats: 3,
    departureCoords: { lat: 42.3601, lng: -71.0589 },
    destinationCoords: { lat: 40.7128, lng: -74.006 },
    driverRating: 4.7,
    price: "$44.00",
  },
  {
    id: 6,
    driver: "Frank",
    departure: "Philadelphia",
    destination: "New York",
    date: "2025-01-20",
    time: "09:30",
    seats: 2,
    departureCoords: { lat: 39.9526, lng: -75.1652 }, // Philadelphia coordinates
    destinationCoords: { lat: 40.7128, lng: -74.006 },
    driverRating: 4.6,
    price: "$35.00",
  },
  {
    id: 8,
    driver: "Hannah",
    departure: "Washington DC",
    destination: "New York",
    date: "2025-01-22",
    time: "08:30",
    seats: 4,
    departureCoords: { lat: 38.9072, lng: -77.0369 }, // DC coordinates
    destinationCoords: { lat: 40.7128, lng: -74.006 },
    driverRating: 4.9,
    price: "$55.00",
  },
  {
    id: 10,
    driver: "Julia",
    departure: "Baltimore",
    destination: "New York",
    date: "2025-01-24",
    time: "10:15",
    seats: 3,
    departureCoords: { lat: 39.2904, lng: -76.6122 }, // Baltimore coordinates
    destinationCoords: { lat: 40.7128, lng: -74.006 },
    driverRating: 4.7,
    price: "$48.50",
  },
];

// Calculate distance between two coordinates (in miles)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 3958.8; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Default location (New York City)
const DEFAULT_LOCATION = { lat: 40.7128, lng: -74.006 };

// Request Confirmation Dialog Component
function RequestConfirmationDialog({
  isOpen,
  onClose,
  ride,
}: {
  isOpen: boolean;
  onClose: () => void;
  ride: any;
}) {
  const [requestStatus, setRequestStatus] = useState<
    "confirming" | "processing" | "success"
  >("confirming");

  useEffect(() => {
    // Only reset status when dialog closes
    if (!isOpen) {
      setRequestStatus("confirming");
    }
  }, [isOpen]);

  // Add a separate function to handle confirmation
  const handleConfirmRequest = () => {
    setRequestStatus("processing");

    // Simulate success after processing
    setTimeout(() => {
      setRequestStatus("success");
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {requestStatus === "confirming" && "Confirm Ride Request"}
            {requestStatus === "processing" && "Processing Request"}
            {requestStatus === "success" && "Request Successful!"}
          </DialogTitle>
          <DialogDescription>
            {requestStatus === "confirming" &&
              "You are about to request a ride with the following details:"}
            {requestStatus === "processing" &&
              "Please wait while we process your request..."}
            {requestStatus === "success" &&
              "Your ride request has been sent to the driver."}
          </DialogDescription>
        </DialogHeader>

        {requestStatus === "confirming" && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Driver
                </p>
                <p>{ride.driver}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Price
                </p>
                <p className="font-semibold">{ride.price}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Route</p>
              <p>
                {ride.departure} → {ride.destination}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <p>{ride.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Time
                </p>
                <p>{ride.time}</p>
              </div>
            </div>
          </div>
        )}

        {requestStatus === "processing" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-center text-muted-foreground">
              Contacting driver...
            </p>
          </div>
        )}

        {requestStatus === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-center font-medium mb-2">
              Request sent successfully!
            </p>
            <p className="text-center text-muted-foreground">
              {ride.driver} will review your request and respond shortly.
            </p>
          </div>
        )}

        <DialogFooter className="flex sm:justify-between">
          {requestStatus === "confirming" && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirmRequest}>Confirm Request</Button>
            </>
          )}

          {requestStatus === "processing" && (
            <Button variant="outline" onClick={onClose} disabled>
              Please wait...
            </Button>
          )}

          {requestStatus === "success" && (
            <Button onClick={onClose} className="w-full">
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function getListOfRides(
  paramsdata: {
    sourceLocationLat: number;
    sourceLocationLon: number;
    destinationLocationLat: number;
    destinationLocationLon: number;
    date: string;
  } | null
) {
  if (!paramsdata) return [];
  const availableRides = await listRides(
    {
      latitude: paramsdata.sourceLocationLat,
      longitude: paramsdata.sourceLocationLon,
    },
    {
      latitude: paramsdata.destinationLocationLat,
      longitude: paramsdata.destinationLocationLon,
    },
    paramsdata.date
  );
  return availableRides;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const [radius, setRadius] = useState(50); // Default radius: 50 miles
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredRides, setFilteredRides] = useState([]);

  // Use default location immediately to avoid loading state
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [isUsingDefaultLocation, setIsUsingDefaultLocation] = useState(true);

  // Try to get user's location, but don't wait for it
  // useEffect(() => {
  //   // Skip geolocation in preview/sandbox environments where it's likely to be blocked
  //   if (typeof window !== "undefined" && navigator.geolocation) {
  //     try {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setUserLocation({
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           });
  //           setIsUsingDefaultLocation(false);
  //         },
  //         (error) => {
  //           console.log("Using default location due to:", error.message);
  //           // Keep using the default location, already set
  //         }
  //       );
  //     } catch (error) {
  //       console.log("Geolocation error:", error);
  //       // Keep using the default location, already set
  //     }
  //   }
  // }, []);

  // const searchDataParams: string | null =
    // localStorage.getItem("searchDataParams");
  const paramsdata: {
    sourceLocationLat: string;
    sourceLocationLon: String;
    destinationLocationLat: string;
    destinationLocationLon: string;
    date: string;
  } | null = Object.fromEntries(searchParams.entries());
  // const filteredRides = [];
  let availableRides: any[] = [];
  // let filteredRides : any[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        sourceLocationLat : Number(paramsdata?.sourceLocationLat),
        sourceLocationLon : Number(paramsdata?.sourceLocationLon),
        destinationLocationLat : Number(paramsdata?.destinationLocationLat),
        destinationLocationLon : Number(paramsdata?.destinationLocationLon),
        date : paramsdata?.date
      }
      const res = await getListOfRides(data);
      setFilteredRides(res);
    };

    fetchData();
    // filteredRides = useMemo(() => {
    //   // For demo purposes, we'll show all rides regardless of search parameters
    //   // In a real app, you would filter by the search parameters

    //   // Filter by radius
    //   return availableRides.filter(
    //     (ride: { sourceLocation: { lat: number; lng: number } }) => {
    //       const distance = calculateDistance(
    //         userLocation.lat,
    //         userLocation.lng,
    //         ride.sourceLocation.lat,
    //         ride.sourceLocation.lng
    //       );
    //       return distance <= radius;
    //     }
    //   );
    // }, [userLocation, radius]);
  }, []);

  // Filter rides based on search criteria and radius

  // Handle ride request
  const handleRequestRide = (ride: any) => {
    setSelectedRide(ride);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Available Rides</h1>

        {isUsingDefaultLocation && (
          <Alert variant="info" className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Using New York City as your location. In a deployed app, we would
              use your actual location with permission.
            </AlertDescription>
          </Alert>
        )}

        {/* Radius Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Search Radius</h3>
                <span className="text-sm font-medium">{radius} miles</span>
              </div>
              <Slider
                value={[radius]}
                min={5}
                max={100}
                step={5}
                onValueChange={(value) => setRadius(value[0])}
              />
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              List View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
            >
              Map View
            </Button>
          </div>
        </div>

        {filteredRides.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p>
                No rides found within {radius} miles of your location. Try
                increasing your search radius.
              </p>
              <Link href="/join-ride" className="block mt-4">
                <Button variant="outline">Back to Search</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {viewMode === "list" ? (
              <div className="space-y-4">
                {filteredRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    distance={calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      ride.startLocation.coordinates.lat,
                      ride.destinationLocation.coordinates.lon
                    )}
                    onRequestRide={handleRequestRide}
                  />
                ))}
                <div className="mt-6">
                  <Link href="/join-ride">
                    <Button variant="outline">Back to Search</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ZoomableMapView
                  rides={filteredRides}
                  userLocation={userLocation}
                  radius={radius}
                  setRadius={setRadius}
                  onRequestRide={handleRequestRide}
                />
                <div className="mt-6">
                  <Link href="/join-ride">
                    <Button variant="outline">Back to Search</Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Request Confirmation Dialog */}
      {selectedRide && (
        <RequestConfirmationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          ride={selectedRide}
        />
      )}
    </div>
  );
}

// Ride Card Component
function RideCard({
  ride,
  distance,
  onRequestRide,
}: {
  ride: any;
  distance: number;
  onRequestRide: (ride: any) => void;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{ride.date}</span>
            <span className="mx-2">•</span>
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{ride.time}</span>
          </div>
          <div className="flex items-center">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(ride.driverRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm">{ride.driverRating}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
          <span className="font-medium">{ride.departure}</span>
          <span className="mx-2">→</span>
          <span className="font-medium">{ride.destination}</span>
          <span className="ml-2 text-sm text-muted-foreground">
            ({distance.toFixed(1)} miles away)
          </span>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <User className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>Driver: {ride.driver}</span>
            <span className="ml-4">
              {ride.seats} seat{ride.seats !== 1 ? "s" : ""} available
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-bold">{ride.price}</span>
            <Button onClick={() => onRequestRide(ride)}>Request to Join</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Zoomable Map View Component
function ZoomableMapView({
  rides,
  userLocation,
  radius,
  setRadius,
  onRequestRide,
}: {
  rides: any[];
  userLocation: any;
  radius: number;
  setRadius: (radius: number) => void;
  onRequestRide: (ride: any) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1); // Default zoom level

  // Handle wheel events for zooming - only on the map area, not the sidebar
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      // Determine zoom direction
      const delta = e.deltaY < 0 ? 0.1 : -0.1;

      // Calculate new zoom level (constrained between 0.5 and 2)
      const newZoom = Math.max(0.5, Math.min(2, zoom + delta));
      setZoom(newZoom);

      // Update radius based on zoom (inverse relationship)
      // When zoomed in (zoom > 1), radius decreases
      // When zoomed out (zoom < 1), radius increases
      const newRadius = Math.round(50 / newZoom);

      // Constrain radius between 5 and 100 miles
      const constrainedRadius = Math.max(5, Math.min(100, newRadius));
      setRadius(constrainedRadius);
    },
    [zoom, setRadius]
  );

  // Add and remove wheel event listener only to the map area
  useEffect(() => {
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        mapElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel]);

  // Map size and scaling
  const mapSize = 600;
  const baseScale = mapSize / (radius * 2.2); // Base scale factor
  const scale = baseScale * zoom; // Apply zoom to scale

  // Center coordinates
  const centerX = mapSize / 2;
  const centerY = mapSize / 2;

  // Convert geo coordinates to pixel positions with zoom
  const coordToPixel = (lat: number, lng: number) => {
    const x = centerX + (lng - userLocation.lng) * scale * 50;
    const y = centerY - (lat - userLocation.lat) * scale * 70;
    return { x, y };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Map View</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newZoom = Math.max(0.5, zoom - 0.1);
                setZoom(newZoom);
                const newRadius = Math.round(50 / newZoom);
                const constrainedRadius = Math.max(5, Math.min(100, newRadius));
                setRadius(constrainedRadius);
              }}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newZoom = Math.min(2, zoom + 0.1);
                setZoom(newZoom);
                const newRadius = Math.round(50 / newZoom);
                const constrainedRadius = Math.max(5, Math.min(100, newRadius));
                setRadius(constrainedRadius);
              }}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Available rides within {radius} miles of your location
          <span className="block text-xs mt-1">
            Scroll to zoom in/out and adjust radius
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainerRef}
          className="relative w-full h-[600px] overflow-hidden rounded-md"
        >
          {/* Map area - scrollable for zoom */}
          <div ref={mapRef} className="absolute inset-0 cursor-move">
            {/* Map background - NYC styled map */}
            <div className="absolute inset-0 bg-[#f8f9fa]">
              {/* Water bodies - Hudson River, East River */}
              <div
                className="absolute"
                style={{
                  left: centerX - 20 * zoom,
                  top: 0,
                  width: `${40 * zoom}px`,
                  height: "100%",
                  backgroundColor: "#cfe2f3",
                  transform: `rotate(15deg) translateX(${-50 * zoom}px)`,
                }}
              ></div>
              <div
                className="absolute"
                style={{
                  right: centerX - 100 * zoom,
                  top: 0,
                  width: `${60 * zoom}px`,
                  height: "100%",
                  backgroundColor: "#cfe2f3",
                  transform: `rotate(-10deg) translateX(${30 * zoom}px)`,
                }}
              ></div>

              {/* Major roads - horizontal */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`h-road-${i}`}
                  className="absolute bg-white border border-gray-300"
                  style={{
                    left: 0,
                    top: 50 * zoom + i * 50 * zoom,
                    width: "100%",
                    height: `${8 * zoom}px`,
                  }}
                ></div>
              ))}

              {/* Major roads - vertical */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`v-road-${i}`}
                  className="absolute bg-white border border-gray-300"
                  style={{
                    left: 50 * zoom + i * 50 * zoom,
                    top: 0,
                    width: `${8 * zoom}px`,
                    height: "100%",
                  }}
                ></div>
              ))}

              {/* Parks and green spaces */}
              <div
                className="absolute bg-[#d9ead3] rounded-lg"
                style={{
                  left: centerX - 100 * zoom,
                  top: centerY - 80 * zoom,
                  width: `${200 * zoom}px`,
                  height: `${160 * zoom}px`,
                }}
              ></div>

              {/* Minor roads - horizontal */}
              {[...Array(24)].map((_, i) => (
                <div
                  key={`h-minor-${i}`}
                  className="absolute bg-[#f5f5f5] border border-gray-200"
                  style={{
                    left: 0,
                    top: 25 * zoom + i * 25 * zoom,
                    width: "100%",
                    height: `${3 * zoom}px`,
                  }}
                ></div>
              ))}

              {/* Minor roads - vertical */}
              {[...Array(24)].map((_, i) => (
                <div
                  key={`v-minor-${i}`}
                  className="absolute bg-[#f5f5f5] border border-gray-200"
                  style={{
                    left: 25 * zoom + i * 25 * zoom,
                    top: 0,
                    width: `${3 * zoom}px`,
                    height: "100%",
                  }}
                ></div>
              ))}

              {/* City blocks */}
              {[...Array(23)].map((_, i) =>
                [...Array(23)].map((_, j) => (
                  <div
                    key={`block-${i}-${j}`}
                    className="absolute bg-[#e6e6e6]"
                    style={{
                      left: 28 * zoom + i * 25 * zoom,
                      top: 28 * zoom + j * 25 * zoom,
                      width: `${19 * zoom}px`,
                      height: `${19 * zoom}px`,
                    }}
                  ></div>
                ))
              )}

              {/* Major highways */}
              <div
                className="absolute bg-[#ffd966] border border-[#f1c232]"
                style={{
                  left: 0,
                  top: centerY,
                  width: "100%",
                  height: `${15 * zoom}px`,
                }}
              ></div>
              <div
                className="absolute bg-[#ffd966] border border-[#f1c232]"
                style={{
                  left: centerX,
                  top: 0,
                  width: `${15 * zoom}px`,
                  height: "100%",
                }}
              ></div>

              {/* NYC Landmarks - simplified */}
              <div
                className="absolute bg-[#b6d7a8] rounded-full"
                style={{
                  left: centerX - 120 * zoom,
                  top: centerY - 150 * zoom,
                  width: `${80 * zoom}px`,
                  height: `${80 * zoom}px`,
                }}
              ></div>

              {/* Manhattan shape hint */}
              <div
                className="absolute bg-[#e6e6e6] rounded-lg"
                style={{
                  left: centerX - 30 * zoom,
                  top: centerY - 200 * zoom,
                  width: `${60 * zoom}px`,
                  height: `${400 * zoom}px`,
                  transform: "rotate(15deg)",
                }}
              ></div>
            </div>

            {/* User location marker - Simplified to just a blue dot with pulse animation */}
            <div className="absolute z-20">
              <div
                className="absolute bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"
                style={{
                  left: centerX,
                  top: centerY,
                  width: `${Math.max(24, 20 * zoom)}px`,
                  height: `${Math.max(24, 20 * zoom)}px`,
                }}
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* Radius circle */}
            <div
              className="absolute rounded-full border-2 border-blue-300 border-dashed opacity-50"
              style={{
                left: centerX,
                top: centerY,
                width: `${radius * scale * 2}px`,
                height: `${radius * scale * 2}px`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>

            {/* Ride markers */}
            {rides.map((ride) => {
              const departurePos = coordToPixel(
                ride.startLocation.coordinates.lat,
                ride.startLocation.coordinates.lon
              );

              return (
                <div
                  key={ride.id}
                  className="absolute bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform z-20 border-2 border-white shadow-md"
                  style={{
                    left: departurePos.x,
                    top: departurePos.y,
                    width: `${Math.max(28, 24 * zoom)}px`,
                    height: `${Math.max(28, 24 * zoom)}px`,
                    fontSize: `${Math.max(14, 12 * zoom)}px`,
                  }}
                  title={`${ride.driver}: ${ride.departure} to ${ride.destination}`}
                  onClick={() => onRequestRide(ride)}
                >
                  {ride.id}
                </div>
              );
            })}

            {/* Map labels - scale with zoom */}
            <div
              className="absolute font-semibold text-gray-600"
              style={{
                left: centerX - 40 * zoom,
                top: centerY + 20 * zoom,
                fontSize: `${12 * zoom}px`,
              }}
            >
              New York
            </div>
            <div
              className="absolute font-semibold text-gray-600"
              style={{
                left: centerX - 150 * zoom,
                top: centerY - 160 * zoom,
                fontSize: `${12 * zoom}px`,
              }}
            >
              Central Park
            </div>
            <div
              className="absolute font-semibold text-gray-600"
              style={{
                left: centerX + 30 * zoom,
                top: centerY - 10 * zoom,
                fontSize: `${12 * zoom}px`,
              }}
            >
              East River
            </div>
            <div
              className="absolute font-semibold text-gray-600"
              style={{
                left: centerX - 80 * zoom,
                top: centerY - 10 * zoom,
                fontSize: `${12 * zoom}px`,
              }}
            >
              Hudson River
            </div>

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md z-30">
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-2 border-2 border-white"></div>
                <span className="text-xs">Your Location</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary rounded-full mr-2 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <span className="text-xs">
                  Available Rides (click to request)
                </span>
              </div>
            </div>
          </div>

          {/* Ride details sidebar - NOT scrollable for zoom */}
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-md overflow-y-auto z-30">
            <div className="p-4">
              <h3 className="font-medium mb-4">Available Rides</h3>
              {rides.map((ride) => {
                const distance = calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  ride.departureCoords.lat,
                  ride.departureCoords.lng
                );

                return (
                  <div
                    key={ride.id}
                    className="mb-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center mb-1">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        {ride.id}
                      </div>
                      <span className="font-medium">{ride.driver}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {ride.departure} → {ride.destination}
                    </div>
                    <div className="text-sm mb-1">
                      {ride.date} at {ride.time}
                    </div>
                    <div className="text-sm mb-1">
                      {distance.toFixed(1)} miles away
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{ride.price}</span>
                      <span className="text-sm">
                        {ride.seats} seat{ride.seats !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => onRequestRide(ride)}
                    >
                      Request
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zoom level indicator */}
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-md shadow-md z-30 text-sm">
            Zoom: {zoom.toFixed(1)}x
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

