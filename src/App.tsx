import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BookSessionPage } from './pages/BookSessionPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { AdminConsultationsPage } from './pages/AdminConsultationsPage';

// Inner component to access router location hooks for Framer Motion key triggers
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream relative">
      {/* Sticky, Glassmorphic Header */}
      <Navbar />

      {/* Page Body Wrapper */}
      <main className="flex-grow flex flex-col pt-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/book-session" element={<BookSessionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/consultations"
              element={
                <AdminRoute>
                  <AdminConsultationsPage />
                </AdminRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Elegant minimalist Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
