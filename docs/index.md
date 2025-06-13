---
layout: home

hero:
  name: "Radius Booking"
  text: "WordPress Plugin Documentation"
  tagline: "Complete developer guide for building booking and appointment management systems"
  image:
    src: /hero-image.svg
    alt: Radius Booking
  actions:
    - theme: brand
      text: Get Started
      link: /guide/overview
    - theme: alt
      text: View on GitHub
      link: https://github.com/radius-booking/plugin

features:
  - icon: 🚀
    title: Modern Architecture
    details: Built with PHP (WordPress), React, and modern development practices for scalable booking solutions.
  - icon: 🎨
    title: Beautiful UI
    details: React frontend with TailwindCSS, featuring responsive design and intuitive user experience.
  - icon: 🔧
    title: Developer Friendly
    details: Comprehensive documentation, clear file structure, and extensible architecture for easy customization.
  - icon: 📊
    title: Rich Diagrams
    details: Visual system architecture, database relationships, and workflow diagrams for better understanding.
  - icon: 🔒
    title: Secure & Tested
    details: Built-in authentication, middleware, and comprehensive testing setup for production-ready applications.
  - icon: 📚
    title: Complete Guide
    details: From setup to advanced features - everything you need to build, extend, and maintain your booking system.
---

## Quick Start

Get up and running with Radius Booking plugin in minutes:

```bash
# Install PHP dependencies
composer install

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

## What's Included

<div class="feature-grid">
  <div class="feature-card">
    <h3>📋 Booking Management</h3>
    <p>Complete appointment and booking system with time slots, availability, and conflict management.</p>
  </div>
  
  <div class="feature-card">
    <h3>👥 User Management</h3>
    <p>Customer profiles, employee management, and role-based access control.</p>
  </div>
  
  <div class="feature-card">
    <h3>🛠️ Service Management</h3>
    <p>Flexible service configuration with pricing, duration, and category management.</p>
  </div>
  
  <div class="feature-card">
    <h3>📊 Analytics & Reports</h3>
    <p>Built-in reporting system with booking analytics and performance metrics.</p>
  </div>
</div>

## Architecture Overview

The Radius Booking plugin follows a modern, modular architecture:

- **Backend**: PHP with WordPress integration, REST API, and ORM
- **Frontend**: React with Redux state management and TailwindCSS
- **Database**: MySQL with migration system and relationship management
- **Assets**: Vite for development, Webpack for production builds

## Next Steps

- [📖 Read the Overview](/guide/overview) - Learn about the plugin's purpose and capabilities
- [🏗️ System Architecture](/architecture/system-overview) - Understand the technical foundation
- [⚡ Setup Guide](/development/setup) - Get your development environment ready
- [🔧 Adding Features](/development/adding-features) - Learn how to extend the plugin

---

<style>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  margin-top: 0;
  color: var(--vp-c-brand-1);
}
</style>