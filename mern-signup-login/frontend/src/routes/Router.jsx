import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignupComponent from '../components/SignupComponent';
import SigninComponent from '../components/SigninComponent';
import FlightsPage from '../components/Flight';
import TrainsPage from '../components/Train';
import AdminDashboardComponent from '../components/AdminDashboardComponent';
import AdminSigninComponent from '../components/AdminSigninComponent';


const Router = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && token.startsWith('admin-'); // Mock check
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignupComponent />} />
      <Route path="/signin" element={<SigninComponent />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/trains" element={<TrainsPage />} />
      <Route path="/admin/dashboard" element={isAuthenticated() ? <AdminDashboardComponent /> : <Navigate to="/signin" />} />
      <Route path="/admin/signin" element={<AdminSigninComponent />} />
    </Routes>
  );
};

export default Router;
