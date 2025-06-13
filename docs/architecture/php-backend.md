# PHP Backend Architecture

The PHP backend forms the core of the Radius Booking plugin, providing a robust, scalable foundation built on WordPress.

## Backend Structure Overview

```
includes/
├── Abstracts/          # Base classes and interfaces
├── Api/               # REST API layer
├── Controllers/       # MVC controllers
├── Core/             # Core plugin functionality
├── Database/         # Database layer and ORM
├── Events/           # Event system
├── Middleware/       # Request middleware
├── Models/           # Data models
├── Repositories/     # Data access layer
├── Resources/        # API resource transformers
├── Routes/           # API route definitions
├── Services/         # Business logic layer
├── Setup/            # Plugin installation
└── Utils/            # Utility functions
```

## Core Components

### Abstract Base Classes

#### BaseController
Foundation for all controllers with common functionality:
- Container dependency injection
- Middleware registration
- Input validation helpers
- Response formatting

#### BaseModel
ORM-style model base class providing:
- Database table mapping
- Attribute fillable/guarded properties
- Relationship definitions
- CRUD operations

#### BaseRepository
Data access pattern implementation:
- Abstract database operations
- Query optimization
- Pagination support
- Caching integration

## Models & Relationships

### Core Models

#### Appointment Model
Central booking entity with relationships to:
- User (customer)
- Service (what's being booked)
- Staff (who provides the service)
- Location (where it takes place)

#### Service Model
Bookable services with:
- Duration and pricing configuration
- Category relationships
- Staff assignment capabilities
- Availability rules

### Model Relationships
```php
// Example relationships
class Appointment extends BaseModel
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    
    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
```

## Repository Pattern

### Implementation
Abstract data access with clean interfaces:
- Find and create operations
- Complex query methods
- Pagination support
- Caching strategies

### Example Usage
```php
interface AppointmentRepositoryInterface
{
    public function find(int $id): ?Appointment;
    public function create(array $data): Appointment;
    public function getByDateRange(DateTime $start, DateTime $end): Collection;
}
```

## Service Layer (Business Logic)

### Purpose
Centralized business logic handling:
- Complex workflows
- Business rule validation
- Event dispatching
- Integration orchestration

### Example Service
```php
class AppointmentService
{
    public function createAppointment(array $data): Appointment
    {
        // Validate appointment data
        // Check for conflicts
        // Create appointment
        // Dispatch events
        return $appointment;
    }
}
```

## Controllers & REST API

### RESTController Base
Abstract base providing:
- Route registration
- Permission checking
- Input validation
- Response formatting

### Endpoint Implementation
```php
class AppointmentController extends RESTController
{
    public function index(WP_REST_Request $request): WP_REST_Response
    {
        // List appointments with filtering
    }
    
    public function store(WP_REST_Request $request): WP_REST_Response
    {
        // Create new appointment
    }
}
```

## Event System

### Event Manager
Provides event-driven architecture:
- Event listener registration
- Event dispatching
- WordPress action integration
- Extensibility hooks

### Usage Example
```php
$events->listen('appointment.created', function($data) {
    EmailService::sendConfirmation($data['appointment']);
});
```

::: tip Backend Architecture Benefits
The modular PHP backend provides excellent separation of concerns, making it easy to add features, test components, and scale the application.
:::

::: warning Performance Considerations
While the repository and service patterns add abstraction, they provide flexibility and maintainability. Use WordPress object caching for optimal performance.
:::