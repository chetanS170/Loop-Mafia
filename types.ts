import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  stat: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface DemoResponse {
  text: string;
  error?: string;
}