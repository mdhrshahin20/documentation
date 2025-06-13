# Project Overview

Welcome to the **Radius Booking** plugin documentation! This guide provides a comprehensive overview, file relationships, extension strategies, and **visual diagrams** for key concepts and feature workflows.

## What is Radius Booking?

**Purpose:** WordPress plugin for managing bookings, appointments, services, employees, customers, and more.

**Tech Stack:** PHP (WordPress), React, TailwindCSS, Vite, Webpack, Composer, WP REST API.

## Key Features

### 📅 Appointment Management
- Smart scheduling with conflict detection
- Recurring appointments support
- Availability management
- Calendar integration

### 👥 User & Staff Management  
- Customer profiles and history
- Employee management and scheduling
- Role-based access control
- Multi-location support

### 🛠️ Service Configuration
- Flexible service types and pricing
- Category management
- Resource management
- Package deals and bundles

### 📊 Analytics & Reporting
- Booking analytics and trends
- Performance metrics
- Custom reports
- Export capabilities

## Architecture Overview

The plugin follows a modern, modular architecture:

- **Backend**: PHP with WordPress integration, REST API, and ORM
- **Frontend**: React with Redux state management and TailwindCSS  
- **Database**: MySQL with migration system and relationships
- **Assets**: Vite for development, Webpack for production

## What's Next?

- [📁 Folder Structure](/guide/folder-structure) - Understand the project organization
- [🔧 Tech Stack](/guide/tech-stack) - Deep dive into technologies used
- [🏗️ System Architecture](/architecture/system-overview) - Learn the technical foundation
- [⚡ Setup Guide](/development/setup) - Get your development environment ready

::: tip Getting Started
Ready to start developing? Check out our [Setup Guide](/development/setup) to get your environment configured.
:::

::: warning Requirements
- PHP 8.0 or higher
- WordPress 6.0 or higher  
- Node.js 16+ for development
- MySQL 5.7 or MariaDB 10.3
:::