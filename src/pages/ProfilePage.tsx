import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-[92svh] pt-32 pb-16 flex items-center justify-center bg-gradient-to-br from-brand-linen/40 via-brand-cream to-brand-sage-light/20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-stone/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-sage-light/40 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-md w-full px-6">
          <div className="bg-brand-cream border border-brand-charcoal/5 rounded-[32px] p-8 md:p-10 shadow-glass space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="font-serif text-3xl font-medium tracking-tight text-brand-charcoal">
                Profile
              </h1>
              <span className="text-[10px] font-sans tracking-widest uppercase text-brand-charcoal-muted/70 block">
                Your Account
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col space-y-1.5 text-left">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted">
                  Name
                </span>
                <p className="px-4 py-2.5 rounded-xl border border-brand-charcoal/10 bg-brand-cream text-sm font-sans text-brand-charcoal">
                  {user.name}
                </p>
              </div>

              <div className="flex flex-col space-y-1.5 text-left">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted">
                  Email
                </span>
                <p className="px-4 py-2.5 rounded-xl border border-brand-charcoal/10 bg-brand-cream text-sm font-sans text-brand-charcoal break-all">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-sans text-sm font-semibold transition-colors duration-300 cursor-pointer focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
