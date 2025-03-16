import React from 'react';
import App from '../components/App';
import Contact from '../pages/Contact';

export default function ContactPage() {
  return (
    <App currentPage="contact">
      <Contact />
    </App>
  );
} 