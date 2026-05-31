import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import AppLayout from './components/AppLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import AddPatient from './pages/AddPatient.jsx';
import PatientDetail from './pages/PatientDetail.jsx';
import NewVisit from './pages/NewVisit.jsx';
import Followups from './pages/Followups.jsx';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/new" element={<AddPatient />} />
          <Route path="patients/:id" element={<PatientDetail />} />
          <Route path="patients/:id/visit" element={<NewVisit />} />
          <Route path="followups" element={<Followups />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
