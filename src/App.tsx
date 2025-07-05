import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TripProvider } from './contexts/TripContext';
import { ProfileProvider } from './contexts/ProfileContext';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTrip from './components/TripPlanner/CreateTrip';
import TripResults from './components/TripPlanner/TripResults';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Footer from './components/Footer'; // ✅ Import the Footer here

function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <TripProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-trip" element={<CreateTrip />} />
                  <Route path="/trip-results" element={<TripResults />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
              <Footer /> {/* ✅ Footer added below the layout */}
            </div>
          </Router>
        </TripProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
