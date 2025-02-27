// src/services/locationService.ts

export interface Location {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

/**
 * Searches for locations using OpenStreetMap's Nominatim API.
 * @param query - The search string.
 * @returns A promise that resolves to an array of Location objects.
 */
export const searchLocations = async (query: string): Promise<Location[]> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }
  const data = await response.json();
  return data;
};
