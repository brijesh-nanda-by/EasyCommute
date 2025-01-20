import Link from "next/link"
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to EasyCommute</h1>
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Initiate a Ride</CardTitle>
              <CardDescription>Offer a ride to others and share your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/initiate-ride">
                <Button className="w-full">Offer a Ride</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Join a Ride</CardTitle>
              <CardDescription>Find and join available rides</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/join-ride">
                <Button className="w-full">Find a Ride</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground mt-8 py-4">
        <div className="container mx-auto px-4 text-center">&copy; 2025 EasyCommute. All rights reserved.</div>
      </footer>
    </div>
  )
}

