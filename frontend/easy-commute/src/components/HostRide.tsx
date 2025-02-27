// src/components/HostRide.tsx
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearch from './shared/LocationSearch';
import { Location } from '../services/locationService';
import { createRide, Ride } from '../services/rideService';

const HostRide: React.FC = () => {
  const navigate = useNavigate();
  const [sourceLocation, setSourceLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Append location details if selected.
    if (sourceLocation) {
      data.sourceDisplay = sourceLocation.display_name;
      data.startLocation = {
        latitude : Number(sourceLocation.lat),
        longitude : Number(sourceLocation.lon)
      }
    }
    if (destinationLocation) {
      data.destinationDisplay = destinationLocation.display_name;
      data.destinationLocation = {
        latitude : Number(destinationLocation.lat),
        longitude : Number(destinationLocation.lon)
      }
    }
    
    // Call the createRide service method to send the data to the backend.
    try {
      const ride: Ride = await createRide(data as Ride);
      console.log('Ride created:', ride);
      navigate('/'); // Redirect to home or another page after success.
    } catch (error) {
      console.error('Failed to create ride:', error);
      // Optionally, display an error message to the user.
    }
  };

  return (
    <div className="container">
      <h1>Host a Ride</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name: <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>Source:</label>
          <LocationSearch
            name="source"
            placeholder="Enter source location"
            onSelect={(loc) => setSourceLocation(loc)}
          />
          {sourceLocation && <p>Selected: {sourceLocation.display_name}</p>}
        </div>
        <div>
          <label>Destination:</label>
          <LocationSearch
            name="destination"
            placeholder="Enter destination location"
            onSelect={(loc) => setDestinationLocation(loc)}
          />
          {destinationLocation && <p>Selected: {destinationLocation.display_name}</p>}
        </div>
        <div>
          <label>
            Date: <input type="date" name="date" required />
          </label>
        </div>
        <div>
          <label>
            Time: <input type="time" name="time" required />
          </label>
        </div>
        <div>
          <label>
            Cost per Person: <input type="number" name="cost" step="0.01" required />
          </label>
        </div>
        <div>
          <label>
            Total Available Seats: <input type="number" name="seats" required />
          </label>
        </div>
        <button type="submit">Host Ride</button>
      </form>
    </div>
  );
};

export default HostRide;
