import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Services } from '../sections/Services';
import { WhyUs } from '../sections/WhyUs';
import { CTA } from '../sections/CTA';

export const Home: React.FC = () => {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <CTA />
    </PageTransition>
  );
};
