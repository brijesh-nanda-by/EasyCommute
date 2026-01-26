"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "../../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Location } from '../api/location-service';
import { LocationSearch } from '@/components/ui/location-search';

export default function JoinRide() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    sourceLocationLat: "",
    sourceLocationLon: "",
    destinationLocationLat: "",
    destinationLocationLon: "",
    date: "",
  })

  const [sourceLocation, setSourceLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // formData.sourceLocation = sourceLocation ? {latitude : sourceLocation.lat, longitude : sourceLocation.lon} : {latitute : 0.00000, longitude : 0.00000};
    // formData.destinationLocation ? {latitude : destinationLocation.lat, longitude : destinationLocation.lon} : {latitute : 0.00000, longitude : 0.00000};
    
    const data = {
        sourceLocationLat : sourceLocation ? sourceLocation.lat : "0.00000",
        sourceLocationLon : sourceLocation ? sourceLocation.lon : "0.00000",
        destinationLocationLat : destinationLocation ? destinationLocation.lat : "0.00000",
        destinationLocationLon : destinationLocation ? destinationLocation.lon : "0.00000",
        date : formData.date
    }
  //   setFormData({
  //     sourceLocationLat : sourceLocation ? sourceLocation.lat : 0.00000,
  //     sourceLocationLon : sourceLocation ? sourceLocation.lon : 0.00000,
  //     destinationLocationLat : destinationLocation ? destinationLocation.lat : 0.00000,
  //     destinationLocationLon : destinationLocation ? destinationLocation.lon : 0.00000,
  //     date : formData.date
  // })
    const queryParams = new URLSearchParams(data).toString();
    // localStorage.setItem('searchDataParams', JSON.stringify(data));

    router.push(`/join-ride/search-results?${queryParams}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Join a Ride with EasyCommute</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Find a Ride</CardTitle>
            <CardDescription>Search for available rides</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure</Label>
                <LocationSearch
                  name="sourceLocation"
                  placeholder="Enter source"
                  onSelect={(loc) => setSourceLocation(loc)}
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationLocation">Destination</Label>
                <LocationSearch
                  name="destination"
                  placeholder="Enter destination "
                  onSelect={(loc) => setDestinationLocation(loc)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" value={formData.date} onChange={handleChange} type="date" required />
              </div>
              <div className="flex justify-between">
                <Link href="/">
                  <Button variant="outline">Back</Button>
                </Link>
                <Button type="submit">Search Rides</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

