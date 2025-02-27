// src/components/JoinRide.tsx
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearch from './shared/LocationSearch';
import { Location } from '../services/locationService';
import { listRides } from '../services/rideService';

const JoinRide: React.FC = () => {
  const navigate = useNavigate();
  const [sourceLocation, setSourceLocation] = useState<Location | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);
  const [date, setDate] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call listRides using the selected locations and date.
      const rides = await listRides(
        sourceLocation ? sourceLocation.display_name : '',
        destinationLocation ? destinationLocation.display_name : '',
        date
      );
      console.log('Fetched Rides:', rides);
      // Navigate to the results page, passing the fetched rides as state.
      navigate('/results', { state: { rides } });
    } catch (error) {
      console.error('Failed to fetch rides:', error);
    }
  };

  return (
    <div className="container">
      <h1>Join a Ride</h1>
      <form onSubmit={handleSubmit}>
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
            Date:{' '}
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Search Rides</button>
      </form>
    </div>
  );
};

export default JoinRide;
