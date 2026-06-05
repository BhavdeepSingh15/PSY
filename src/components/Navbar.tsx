import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { therapistInfo } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const getEmailInitial = (email: string) => email.trim().charAt(0).toUpperCase();

export const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleScrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isAdmin = user?.role === 'admin';

  const navLinks = [
    { label: 'About', path: '/about', type: 'route' as const },
    { label: 'Services', path: '/services', type: 'route' as const },
    ...(user?.role === 'admin'
      ? [{ label: 'Consultations', path: '/admin/consultations', type: 'route' as const }]
      : []),
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 glassmorphism shadow-glass'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-brand-charcoal transition-colors duration-300 group-hover:text-brand-sage">
              {therapistInfo.name || 'Psychotherapy & Healing'}
            </span>
            <span className="text-[10px] md:text-xs font-sans tracking-widest uppercase text-brand-charcoal-muted/70">
              Psychotherapy & Healing
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <React.Fragment key={link.label}>
                {link.type === 'route' ? (
                  <Link
                    to={link.path}
                    className={`font-sans text-sm tracking-wide transition-colors duration-300 hover:text-brand-sage relative py-1 focus:outline-none ${
                      location.pathname === link.path
                        ? 'text-brand-charcoal font-medium'
                        : 'text-brand-charcoal-muted'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-sage"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleScrollToSection(link.path)}
                    className="font-sans text-sm tracking-wide text-brand-charcoal-muted transition-colors duration-300 hover:text-brand-sage cursor-pointer focus:outline-none"
                  >
                    {link.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <Link
                to="/profile"
                className="w-9 h-9 rounded-full bg-brand-sage text-brand-cream flex items-center justify-center font-sans text-sm font-semibold select-none hover:bg-brand-sage-dark transition-colors duration-300 focus:outline-none"
                title={user.email}
                aria-label={`View profile for ${user.email}`}
              >
                {getEmailInitial(user.email)}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-sans tracking-wide text-brand-charcoal-muted hover:text-brand-charcoal transition-colors duration-300 py-2 px-3 focus:outline-none"
              >
                Client Login
              </Link>
            )}
            {!isAdmin && (
              <Button variant="primary" size="md" to="/book-session">
                Book Session
              </Button>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-3">
            {isAuthenticated && user && (
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-brand-sage text-brand-cream flex items-center justify-center font-sans text-xs font-semibold select-none focus:outline-none"
                aria-label={`View profile for ${user.email}`}
              >
                {getEmailInitial(user.email)}
              </Link>
            )}
            {!isAdmin && (
              <Link
                to="/book-session"
                className="text-xs font-sans tracking-wider uppercase font-semibold text-brand-sage border border-brand-sage/20 px-3 py-1.5 rounded-full"
              >
                Book
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-brand-charcoal focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[72px] z-40 bg-brand-cream/98 backdrop-blur-md flex flex-col md:hidden"
          >
            <div className="flex-grow flex flex-col px-8 py-12 space-y-8 justify-start">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                >
                  {link.type === 'route' ? (
                    <Link
                      to={link.path}
                      className={`font-serif text-3xl font-light tracking-wide ${
                        location.pathname === link.path
                          ? 'text-brand-sage'
                          : 'text-brand-charcoal'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleScrollToSection(link.path)}
                      className="font-serif text-3xl font-light tracking-wide text-brand-charcoal text-left focus:outline-none cursor-pointer"
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}

              <hr className="border-brand-charcoal/5 my-4" />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.4 }}
                className="flex flex-col space-y-6 pt-4"
              >
                {isAuthenticated && user ? (
                  <Link
                    to="/profile"
                    className="font-sans text-base text-brand-charcoal-muted tracking-wide flex items-center space-x-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-10 h-10 rounded-full bg-brand-sage text-brand-cream flex items-center justify-center font-sans text-base font-semibold">
                      {getEmailInitial(user.email)}
                    </span>
                    <span>My Profile</span>
                    <ArrowRight size={16} className="text-brand-sage" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="font-sans text-base text-brand-charcoal-muted tracking-wide flex items-center space-x-2"
                  >
                    <span>Client Portal Login</span>
                    <ArrowRight size={16} className="text-brand-sage" />
                  </Link>
                )}

                {!isAdmin && (
                  <Button variant="primary" size="lg" to="/book-session" className="w-full text-center">
                    Schedule Free Intake
                  </Button>
                )}
              </motion.div>
            </div>

            <div className="p-8 border-t border-brand-charcoal/5 bg-brand-linen/40 flex flex-col space-y-2">
              <span className="text-xs font-sans tracking-widest uppercase text-brand-charcoal-muted">Contact Practitioner</span>
              <span className="text-sm font-sans text-brand-charcoal">{therapistInfo.email}</span>
              <span className="text-sm font-sans text-brand-charcoal">{therapistInfo.phone}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
