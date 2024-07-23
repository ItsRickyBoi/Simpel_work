// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/AboutUs/About';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import EditUser from './Components/EditUser/EditUser';
import EditCompany from './Components/EditUser/EditCompany';
import { UserProvider, useUser } from './UserHandler/UserContext';
import DashboardEmployee from './Components/DashboardEmployee/DashboardEmployee';
import DashboardCEO from './Components/DashboardCEO/DashboardCEO';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useUser();
  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

const CeoRoute = ({ element: Component, ...rest }) => {
  const { user } = useUser();
  return user && user.role === 'ceo' ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<PrivateRoute element={EditUser} />} />
          <Route path="/edit-company" element={<CeoRoute element={EditCompany} />} />
          <Route path="/dashboardemployee" element={<PrivateRoute element={DashboardEmployee} />} />
          <Route path="/dashboardceo" element={<CeoRoute element={DashboardCEO} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
