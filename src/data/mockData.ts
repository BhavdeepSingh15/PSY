// Site content — fill in practitioner and page copy below.

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: 'Individual' | 'Specialized' | 'Support';
  iconName: 'Heart' | 'Activity' | 'Users' | 'Sparkles' | 'Compass' | 'Layers';
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Sessions';
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  iconName: 'Shield' | 'HeartHandshake' | 'GraduationCap' | 'Search';
}

export interface Credential {
  year: string;
  title: string;
  institution: string;
}

export interface Approach {
  id: string;
  title: string;
  description: string;
  iconName: 'Heart' | 'Brain' | 'Sparkles';
}

export interface ClinicalInfoItem {
  label: string;
  value: string;
}

export const therapistInfo = {
  name: '',
  credentials: '',
  bioShort: '',
  bioDetailed: '',
  philosophy: '',
  aboutTagline: '',
  email: '',
  phone: '',
  socials: {
    linkedin: '#',
    instagram: '#',
  },
};

export const clinicalInfoData: ClinicalInfoItem[] = [];

export const approachesData: Approach[] = [];

export const servicesData: Service[] = [
  {
    id: 'anxiety-counselling',
    title: 'Anxiety & Panic Counselling',
    shortDescription: 'Unpack persistent worries, quieten the nervous system, and reclaim a sense of calm control in your everyday life.',
    longDescription: 'Chronic worry, panic attacks, and racing thoughts can shrink your world. In our sessions, we will combine cognitive behavioral techniques (CBT) and somatic awareness to understand the root triggers of your anxiety, soothe your overactive nervous system, and develop active tools for lasting tranquility.',
    category: 'Individual',
    iconName: 'Activity',
    benefits: [
      'Understand the nervous system\'s fight-or-flight response',
      'Identify and restructure anxiety-inducing cognitive patterns',
      'Acquire grounding somatic tools for immediate panic relief',
      'Establish personal boundaries to manage sensory and social overwhelm',
    ],
  },
  {
    id: 'stress-management',
    title: 'Stress & Burnout Therapy',
    shortDescription: 'Restore balance to your nervous system, navigate high-pressure careers, and establish sustainable boundaries.',
    longDescription: 'In our achievement-driven society, chronic stress and exhaustion are often wore as badges of honor—until the body says "no." Together, we will examine the systemic stressors in your life, build boundary-setting practices, and implement deep rest strategies to heal from burnout and restore vitality.',
    category: 'Individual',
    iconName: 'Heart',
    benefits: [
      'Recognize and intercept early biological indicators of burnout',
      'Develop robust boundary-setting techniques for work and relationships',
      'Cultivate stress-mitigating self-compassion models',
      'Create personalized wellness rest routines',
    ],
  },
  {
    id: 'relationship-therapy',
    title: 'Relationship Guidance',
    shortDescription: 'Cultivate emotional safety, resolve long-standing communication blockages, and deepen vulnerability.',
    longDescription: 'Whether navigating active conflict or experiencing a quiet drift in connection, relationship therapy offers an objective, compassionate container. Guided by Emotionally Focused Therapy (EFT) principles, we address structural dynamics, break defensive patterns, and reconstruct a secure emotional bond.',
    category: 'Specialized',
    iconName: 'Users',
    benefits: [
      'Deconstruct defensive cycles (pursuer-distancer dynamics)',
      'Establish techniques for clear, vulnerable communication',
      'Rebuild trust and emotional intimacy after conflict',
      'Navigate lifespans transitions together harmoniously',
    ],
  },
  {
    id: 'teen-counselling',
    title: 'Teen & Adolescent Support',
    shortDescription: 'A safe, gentle space for teenagers navigating identity, academic stress, peer pressures, and emotional growth.',
    longDescription: 'Adolescence is a profound bridge of transition filled with unique social, academic, and physiological changes. I provide a supportive, independent space where teens can express themselves without judgment, learn emotional regulation tools, and build strong self-worth as they transition to adulthood.',
    category: 'Specialized',
    iconName: 'Sparkles',
    benefits: [
      'Foster emotional literacy and healthy self-expression',
      'Acquire healthy coping mechanisms for academic stress',
      'Navigate identity formation and self-esteem issues',
      'Establish collaborative communication between teens and parents',
    ],
  },
  {
    id: 'career-guidance',
    title: 'Mindful Career Alignment',
    shortDescription: 'Align your vocational journey with your core values, navigate career transitions, and discover purpose.',
    longDescription: 'Vocational transitions often trigger profound identity crises. By combining therapeutic reflection and values-based assessment, we look beyond simple job descriptions to explore what meaningful, values-aligned contribution looks like for you, drafting a mindful strategy for change.',
    category: 'Support',
    iconName: 'Compass',
    benefits: [
      'Clarify your core personal and professional values',
      'Process performance anxiety and impostor syndrome',
      'Formulate mindful transitional plans with confidence',
      'Deconstruct fear of failure or change',
    ],
  },
  {
    id: 'emotional-wellbeing',
    title: 'Holistic Emotional Wellbeing',
    shortDescription: 'For those seeking proactive personal growth, self-discovery, and deeper integration of mind and body.',
    longDescription: 'You do not need to be in crisis to seek therapy. Proactive growth sessions offer an expansive platform to examine your patterns, explore life themes, cultivate somatic mindfulness, and design a life that feels authentic, peaceful, and fully aligned.',
    category: 'Support',
    iconName: 'Layers',
    benefits: [
      'Expand self-awareness and emotional range',
      'Strengthen the integration of somatic and mental processes',
      'Cultivate mindfulness models for daily presence',
      'Nurture authentic creative and emotional expression',
    ],
  },
];

export const pillarsData: Pillar[] = [
  {
    id: 'confidentiality',
    title: 'Radical Safety & Confidentiality',
    description: 'Every session takes place within an absolute legal and ethical sanctuary, ensuring your privacy is meticulously guarded.',
    iconName: 'Shield',
  },
  {
    id: 'empathy',
    title: 'Deep Empathetic Connection',
    description: 'No checklists or standardized templates. I offer an authentic human relationship grounded in deep listening and compassion.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'evidence-based',
    title: 'Evidence-Based Integration',
    description: 'Combining CBT, ACT, EFT, and somatic mindfulness for treatments grounded in neuroscience and clinical efficacy.',
    iconName: 'Search',
  },
  {
    id: 'credentials',
    title: '12+ Years of Dedicated Service',
    description: 'Rigorous doctoral-level training and continuous clinical study to ensure you receive premium, up-to-date guidance.',
    iconName: 'GraduationCap',
  },
];

export const credentialsData: Credential[] = [];

export const testimonialsData: Testimonial[] = [];

export const FAQsData: FAQ[] = [
  {
    id: 'q1',
    question: 'How often do we meet?',
    answer: 'Typically, we meet once per week initially to build momentum and rapport. As you establish grounding techniques and find consistency, we can scale back to bi-weekly sessions.',
    category: 'Sessions',
  },
  {
    id: 'q2',
    question: 'Are online therapy sessions completely confidential?',
    answer: 'Yes, absolutely. All virtual consultations are conducted via an encrypted, HIPAA-compliant telehealth platform. Sessions take place in a secure, private setting where no one can overhear our conversations, ensuring the same safety as a clinical environment.',
    category: 'General',
  },
  {
    id: 'q3',
    question: 'How do I schedule a session and what happens after I book?',
    answer: 'You can easily request a consultation on our Booking page. You will pick a service, select a date and time, and confirm your details. You will receive a follow-up with next steps for your care.',
    category: 'Sessions',
  },
  {
    id: 'q4',
    question: 'What should I expect in our very first consultation?',
    answer: 'Our first session is a gentle, pressure-free evaluation. We will explore what brings you to therapy, what you hope to achieve, and take a brief look at your personal history. It is also an opportunity for you to see if my conversational style feels like a safe, natural fit.',
    category: 'General',
  },
];
