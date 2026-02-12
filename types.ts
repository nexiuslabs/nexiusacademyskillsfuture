import React from 'react';

export interface Instructor {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Review {
  name: string;
  role: string;
  date: string;
  rating: number;
  content: string;
  image: string;
}

export interface ScheduleItem {
  type: 'Weekend' | 'Weekday';
  dates: string;
  time: string;
  format: 'Online (Zoom)' | 'In-Person';
  slotsLeft: number;
  month: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CurriculumModule {
  title: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  author: string;
  authorImage: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  icon: React.ReactNode;
  color?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  views: number;
  excerpt: string;
  featured?: boolean;
}