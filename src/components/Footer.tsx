import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Heart } from 'lucide-react';
import { therapistInfo } from '../data/mockData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-linen text-brand-charcoal pt-16 pb-12 border-t border-brand-stone/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* Column 1: Brand Info */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          <Link to="/" onClick={handleScrollToTop} className="flex flex-col items-start">
            {therapistInfo.name && (
              <span className="font-serif text-2xl font-semibold tracking-wide text-brand-charcoal">
                {therapistInfo.name}
              </span>
            )}
            {therapistInfo.credentials && (
              <span className="text-xs font-sans tracking-widest uppercase text-brand-charcoal-muted">
                {therapistInfo.credentials}
              </span>
            )}
          </Link>
          {therapistInfo.bioShort && (
            <p className="font-sans text-sm leading-relaxed text-brand-charcoal-muted max-w-sm text-balance">
              {therapistInfo.bioShort}
            </p>
          )}
          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-2">
            <a
              href={therapistInfo.socials.instagram}
              className="p-2.5 rounded-full bg-brand-cream hover:bg-brand-sage hover:text-brand-cream text-brand-charcoal transition-all duration-300 shadow-xs focus:outline-none flex items-center justify-center"
              aria-label="Instagram Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href={therapistInfo.socials.linkedin}
              className="p-2.5 rounded-full bg-brand-cream hover:bg-brand-sage hover:text-brand-cream text-brand-charcoal transition-all duration-300 shadow-xs focus:outline-none flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-5">
          <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-brand-charcoal-muted">
            Explore
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            <li>
              <Link to="/about" className="text-brand-charcoal-muted hover:text-brand-sage transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-brand-charcoal-muted hover:text-brand-sage transition-colors duration-300">
                Therapy Services
              </Link>
            </li>
            <li>
              <Link to="/book-session" className="text-brand-charcoal-muted hover:text-brand-sage transition-colors duration-300">
                Book a Session
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-brand-charcoal-muted hover:text-brand-sage transition-colors duration-300">
                Client Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col space-y-5">
          <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-brand-charcoal-muted">
            Contact
          </h4>
          <ul className="space-y-4 font-sans text-sm">
            {therapistInfo.email && (
              <li className="flex items-center space-x-3 text-brand-charcoal-muted">
                <Mail size={16} className="text-brand-sage shrink-0" />
                <a href={`mailto:${therapistInfo.email}`} className="hover:text-brand-sage transition-colors duration-300">
                  {therapistInfo.email}
                </a>
              </li>
            )}
            {therapistInfo.phone && (
              <li className="flex items-center space-x-3 text-brand-charcoal-muted">
                <Phone size={16} className="text-brand-sage shrink-0" />
                <a href={`tel:${therapistInfo.phone}`} className="hover:text-brand-sage transition-colors duration-300">
                  {therapistInfo.phone}
                </a>
              </li>
            )}
          </ul>
        </div>

      </div>

      <hr className="border-brand-stone/40 max-w-7xl mx-auto px-6 md:px-12 my-8" />

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs font-sans text-brand-charcoal-muted space-y-4 md:space-y-0">
        <div className="flex items-center space-x-1">
          <span>&copy; {currentYear}{therapistInfo.name ? ` ${therapistInfo.name}` : ''}. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart size={10} className="text-brand-sage fill-brand-sage" />
          <span>for professional healing & mental integration.</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-brand-charcoal transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand-charcoal transition-colors duration-300">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};
