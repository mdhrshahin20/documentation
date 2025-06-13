# Setup Guide

Get your development environment ready for working with the Radius Booking plugin.

## Prerequisites

Before you begin, ensure you have the following installed:

- PHP 8.0 or higher
- WordPress 6.0 or higher
- Node.js 16+ for frontend development
- Composer for PHP dependencies
- MySQL 5.7 or MariaDB 10.3

## Installation Steps

### 1. Install Dependencies

**PHP Dependencies:**
```bash
composer install
```

**Frontend Dependencies:**
```bash
npm install
```

### 2. Frontend Build

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

### 3. WordPress Environment

Configure your local WordPress environment:

1. Set up `.wp-env.json` for local WP development
2. Activate the plugin through WordPress admin
3. Configure database settings

### 4. Testing & Linting

**Run PHP Tests:**
```bash
vendor/bin/phpunit
```

**Run JavaScript Tests:**
```bash
npm test
```

**Code Linting:**
```bash
# PHP Code Standards
vendor/bin/phpcs

# JavaScript/React Linting
npm run lint
```

## Development Workflow

1. Start the development server
2. Make your changes
3. Run tests
4. Submit pull request

## Next Steps

- [File Organization](/development/file-organization)
- [Naming Conventions](/development/naming-conventions)
- [Best Practices](/development/best-practices)