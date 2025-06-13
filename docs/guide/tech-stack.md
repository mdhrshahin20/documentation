# Tech Stack

The Radius Booking plugin leverages modern web technologies to deliver a robust, scalable booking management system.

## Backend Technologies

### PHP 8.0+
- Modern PHP features with type declarations
- Improved performance with JIT compilation
- WordPress compatibility and coding standards

### WordPress 6.0+
- Core integration with hooks and filters
- Plugin architecture best practices
- Multisite support
- Built-in security features

### Composer
- Modern PHP dependency management
- PSR-4 autoloading
- Third-party library integration

### WP REST API
- RESTful endpoint design
- WordPress authentication
- Permission system
- Extensible architecture

### MySQL/MariaDB
- Relational database with ACID compliance
- Query optimization
- Migration system
- Foreign key relationships

## Frontend Technologies

### React 18
- Modern hooks and functional components
- Component-based architecture
- Concurrent features
- Excellent debugging tools

### Redux Toolkit
- Predictable state management
- Reduced boilerplate
- RTK Query for data fetching
- DevTools integration

### TailwindCSS
- Utility-first CSS framework
- Customizable design system
- Responsive design
- Optimized build sizes

### Vite
- Fast development server
- Hot module replacement
- ESM-based bundling
- Rich plugin ecosystem

## Development Tools

### PHPUnit
- PHP unit testing framework
- Code coverage reporting
- Mocking capabilities
- CI/CD integration

### Jest
- JavaScript testing framework
- Snapshot testing for React
- Built-in code coverage
- Powerful mocking

### ESLint
- JavaScript code linting
- React-specific rules
- IDE integration
- Consistent code standards

### PHP CodeSniffer
- WordPress coding standards
- Code quality detection
- Custom rule configuration
- CI integration

## Architecture Patterns

### MVC (Model-View-Controller)
- Clear separation of concerns
- Maintainable codebase
- Independent testing

### Repository Pattern
- Data access abstraction
- Easy mocking for tests
- Flexible data sources

### Service Layer
- Centralized business logic
- Reusable across controllers
- Unit testable

### Dependency Injection
- Loose coupling
- Easy testing
- Flexible implementations

::: tip Performance
For optimal performance, enable WordPress object caching and use a CDN for static assets.
:::

::: warning Requirements
- PHP 8.0 or higher
- WordPress 6.0 or higher
- MySQL 5.7 or MariaDB 10.3
- Node.js 16+ for development
- 128MB PHP memory limit (256MB recommended)
:::