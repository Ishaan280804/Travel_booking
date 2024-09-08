import React from 'react';
import { BrowserRouter as RouterProvider } from 'react-router-dom'; // Renamed import
import Navbar from './components/Navbar';  // Import the Navbar component
import Router from './routes/Router'; // Import the Router component

const App = () => {
  return (
    <RouterProvider> {/* Use the renamed RouterProvider */}
      <Navbar />  {/* Include the Navbar component */}
      <div className="main-content">
        <Router /> {/* Render the Router component */}
      </div>
    </RouterProvider>
  );
};

export default App;
