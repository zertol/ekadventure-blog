import React from 'react';
import App from '../components/App';
import About from '../pages/About';

export default function AboutPage() {
  return (
    <App currentPage="about">
      <About />
    </App>
  );
} 