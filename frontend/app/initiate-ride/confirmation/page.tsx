import Link from "next/link"
import { Header } from "../../../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function RideConfirmation({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { departure, destination, date, time, seats } = searchParams

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ride Offer Confirmation</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Your Ride Offer</CardTitle>
            <CardDescription>Review the details of your offered ride</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>From:</strong> {departure}
            </div>
            <div>
              <strong>To:</strong> {destination}
            </div>
            <div>
              <strong>Date:</strong> {date}
            </div>
            <div>
              <strong>Time:</strong> {time}
            </div>
            <div>
              <strong>Available Seats:</strong> {seats}
            </div>
            <div className="pt-4">
              <p className="text-green-600 font-semibold">Your ride has been successfully offered!</p>
            </div>
            <div className="flex justify-between pt-4">
              <Link href="/initiate-ride">
                <Button variant="outline">Edit Ride</Button>
              </Link>
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

