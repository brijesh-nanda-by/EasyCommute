import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>EasyCommute</h1>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('/join')}>Join a Ride</button>
        <button onClick={() => navigate('/host')}>Host a Ride</button>
      </div>
    </div>
  );
};

export default Home;
