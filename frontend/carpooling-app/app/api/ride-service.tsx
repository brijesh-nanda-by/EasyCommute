export interface Ride {
  rideId?: string;
  name: string;
  source: string;
  destination: string;
  date: string;
  time: string;
  cost: number;
  seats: number;
//   sourceLat?: string;
//   sourceLon?: string;
//   destinationLat?: string;
//   destinationLon?: string;
  startLocation?: [];
  destinationLocation?: [];
}

export interface RideCreate {
    rideId?: string;
    name: string;
    source: string;
    destination: string;
    date: string;
    time: string;
    cost: number;
    seats: number;
    startLocation?: [];
    destinationLocation?: [];
  }

const BASE_URL = "http://localhost:8080/ride"; // Replace with your actual backend URL

/**
 * Sends a POST request to create a new ride.
 * @param ride - Ride object containing ride details.
 * @returns A promise that resolves to the created Ride.
 */
export const createRide = async (ride: Ride): Promise<Ride> => {
    // rideCreate = {

    // }
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ride),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create ride: ${error}`);
  }

  return await response.json();
};

/**
 * Sends a GET request to fetch rides that match the provided source, destination, and date.
 * @param source - The source location.
 * @param destination - The destination location.
 * @param date - The ride date in YYYY-MM-DD format.
 * @returns A promise that resolves to an array of Ride objects.
 */
export const listRides = async (
  source: object,
  destination: object,
  date: string
): Promise<Ride[]> => {
  // Create URL with query parameters.
  const url = new URL(`${BASE_URL}/match`);
//   url.searchParams.append("source", source);
//   url.searchParams.append("destination", destination);
//   url.searchParams.append("date", date);

    
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({startLocation : source, destinationLocation : destination, date: date}),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch rides: ${error}`);
  }

  return await response.json();
};
