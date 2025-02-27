import React from 'react';
import { Link } from 'react-router-dom';

interface Ride {
  id: number;
  time: string;
  seats: number;
  cost: number;
}

const RideResults: React.FC = () => {
  const sampleRides: Ride[] = [
    { id: 1, time: '08:00', seats: 3, cost: 10.0 },
    { id: 2, time: '09:30', seats: 2, cost: 12.5 },
    { id: 3, time: '11:00', seats: 4, cost: 8.75 }
  ];

  return (
    <div className="container">
      <h1>Available Rides</h1>
      <ul>
        {sampleRides.map((ride) => (
          <li key={ride.id}>
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
