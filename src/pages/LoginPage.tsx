import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { PageTransition } from '../components/PageTransition';
import { therapistInfo } from '../data/mockData';
import { Button } from '../components/Button';
import { ShieldAlert, ArrowLeft, ArrowRight, EyeOff, Eye, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSimulated, setIsSimulated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulated(true);
  };

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    console.log('[LoginPage] credentialResponse:', credentialResponse);

    if (!credentialResponse.credential) {
      setLoginError('Google login failed. Please try again.');
      return;
    }

    setLoginError('');
    setIsGoogleLoading(true);

    try {
      await login(credentialResponse.credential);
      navigate('/');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Google login failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setLoginError('Google login was cancelled or failed.');
  };

  return (
    <PageTransition>
      <div className="min-h-[92svh] pt-32 pb-16 flex items-center justify-center bg-gradient-to-br from-brand-linen/40 via-brand-cream to-brand-sage-light/20 relative overflow-hidden">
        {/* Soft decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-stone/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-sage-light/40 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-md w-full px-6">
          
          {/* Main Card */}
          <div className="bg-brand-cream border border-brand-charcoal/5 rounded-[32px] p-8 md:p-10 shadow-glass space-y-8 text-center relative overflow-hidden">
            
            {/* Header branding */}
            <div className="space-y-3">
              <Link to="/" className="inline-flex items-center text-xs font-sans font-bold tracking-wider uppercase text-brand-sage hover:text-brand-sage-dark transition-colors duration-300">
                <ArrowLeft size={12} className="mr-1" /> Back to Home
              </Link>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-brand-charcoal">
                Client Portal
              </h2>
              <span className="text-[10px] font-sans tracking-widest uppercase text-brand-charcoal-muted/70 block">
                Secure Therapy Sanctuary
              </span>
              <p className="font-sans text-xs text-brand-charcoal-muted leading-relaxed text-balance pt-1">
                Access your secure virtual telehealth rooms, intake packets, and payment ledger statement histories.
              </p>
            </div>

            {/* Google federated login */}
            <div className="space-y-4">
              <div className="relative w-full">
                <button
                  type="button"
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border border-brand-charcoal/10 hover:border-brand-stone bg-brand-cream hover:bg-brand-linen/10 transition-all duration-300 cursor-pointer font-sans text-sm font-semibold text-brand-charcoal pointer-events-none"
                >
                  {/* SVG Google Logo */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.13h4.01c2.34-2.16 3.69-5.32 3.69-8.75Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.01-3.13c-1.12.75-2.55 1.2-3.95 1.2-3.04 0-5.61-2.05-6.53-4.82H1.31v3.23A12 12 0 0 0 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.47 14.34a7.16 7.16 0 0 1 0-4.68V6.43H1.31a12 12 0 0 0 0 11.14l4.16-3.23Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.31 6.43l4.16 3.23c.92-2.77 3.49-4.82 6.53-4.82Z"
                    />
                  </svg>
                  <span>{isGoogleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                </button>
                <div className="absolute inset-0 opacity-0 overflow-hidden cursor-pointer">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    width="400"
                    text="continue_with"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs font-sans text-red-600 text-left">{loginError}</p>
              )}

              {/* Decorative Divider */}
              <div className="flex items-center justify-between text-xs text-brand-charcoal-muted/40 font-sans font-medium">
                <hr className="border-brand-charcoal/5 w-[42%]" />
                <span>or</span>
                <hr className="border-brand-charcoal/5 w-[42%]" />
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSimulateLogin} className="space-y-4">
              <div className="flex flex-col space-y-1.5 text-left">
                <label htmlFor="login-email" className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@therapistdemo.com"
                  className="px-4 py-2.5 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm"
                />
              </div>

              <div className="flex flex-col space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="text-[10px] font-sans font-bold tracking-widest uppercase text-brand-charcoal-muted">
                    Secret Password
                  </label>
                  <a href="#" className="text-[10px] font-sans text-brand-sage hover:text-brand-sage-dark underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-brand-charcoal/10 bg-brand-cream focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal-muted hover:text-brand-charcoal cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" type="submit" className="w-full justify-center py-2.5">
                  <span>Sign In</span>
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </form>

            {/* Quick operational alerts disclaimer */}
            <div className="p-4 bg-brand-linen/40 border border-brand-stone/30 rounded-2xl flex items-start space-x-3 text-left">
              <ShieldAlert size={14} className="text-brand-sage shrink-0 mt-0.5" />
              <div className="text-[10px] font-sans text-brand-charcoal-muted leading-relaxed">
                <strong>Simulated Client Sandbox:</strong> Email/password login demonstrates visual UX flow only. Google sign-in is fully connected for authentication.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Simulated email login dialog */}
      <AnimatePresence>
        {isSimulated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-charcoal/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-brand-cream border border-brand-stone/40 max-w-sm w-full rounded-[32px] p-8 shadow-glass text-center space-y-5 text-brand-charcoal relative"
            >
              <div className="inline-flex p-3 rounded-full bg-brand-sage-light text-brand-sage-dark shadow-xs mx-auto">
                <CheckCircle2 size={32} strokeWidth={1.8} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-medium text-brand-charcoal">
                  Simulation Successful!
                </h3>
                <p className="font-sans text-xs text-brand-charcoal-muted leading-relaxed">
                  You requested to log into the private portal for <strong>{therapistInfo.name}</strong>. In production, this would securely forward to HIPAA-compliant dashboard portals.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsSimulated(false);
                  setEmail('');
                  setPassword('');
                }}
                className="w-full py-2.5"
              >
                Close Sandbox
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
