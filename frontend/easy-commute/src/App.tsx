import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HostRide from './components/HostRide';
import JoinRide from './components/JoinRide';
import RideResults from './components/RideResults';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<HostRide />} />
        <Route path="/join" element={<JoinRide />} />
        <Route path="/results" element={<RideResults />} />
      </Routes>
    </Router>
  );
};

export default App;
