export interface Lead {
  id: string;
  name: string;
  phone: string;
  requestType: 'consultation' | 'medicines' | 'chronic' | 'other';
  description: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface USPItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  treatment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
