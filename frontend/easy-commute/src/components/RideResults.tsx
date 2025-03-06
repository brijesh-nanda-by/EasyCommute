import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Ride {
  id: number;
  name: string;
  source: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  cost: number;
  startLocation: number[];
  destinationLocation: number[];
}

interface RideState {
  rides: Ride[];
}

const RideResults: React.FC = () => {
  const location = useLocation();
  const state = location.state as RideState | undefined;
  const sampleRides: Ride[] = (state && state.rides) ? state.rides : [];;

  return (
    <div className="container">
      <h1>Available Rides</h1>
      <ul>
        {sampleRides.map((ride) => (
          <li key={ride.id}>
            <p>
              <strong>Name:</strong> {ride.name}
            </p>
            <p>
              <strong>Time:</strong> {ride.time}
            </p>
            <p>
              <strong>Seats Available:</strong> {ride.seats}
            </p>
            <p>
              <strong>Cost per Person:</strong> ${ride.cost.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center' }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default RideResults;
