import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Services } from '../sections/Services';
import { WhyUs } from '../sections/WhyUs';
import { CTA } from '../sections/CTA';
import { PrivacyCommitment } from '../sections/PrivacyCommitment';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { ModalityOverview } from '../sections/ModalityOverview';
import { InteractiveTools } from '../sections/InteractiveTools';

export const Home: React.FC = () => {
  return (
    <PageTransition>
      <Hero />
      <About />
      <PrivacyCommitment />
      <ProcessTimeline />
      <Services />
      <ModalityOverview />
      <WhyUs />
      <InteractiveTools />
      <CTA />
    </PageTransition>
  );
};
