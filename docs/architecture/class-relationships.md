# Class Relationships

Detailed overview of class relationships and dependencies in the Radius Booking plugin.

## PHP Class Hierarchy

Document your PHP class relationships with diagrams...

```mermaid
classDiagram
    class BaseController
    class RESTController
    class AppointmentController
    class ServiceController
    class UserController
    class BaseModel
    class Appointment
    class Service
    class User
    class BaseRepository
    class AppointmentRepository
    class ServiceRepository
    class UserRepository
    class BaseResource
    class AppointmentResource
    class ServiceResource
    class UserResource
    class Migration
    class DBMigrator

    RESTController <|-- BaseController
    AppointmentController <|-- RESTController
    ServiceController <|-- RESTController
    UserController <|-- RESTController

    Appointment <|-- BaseModel
    Service <|-- BaseModel
    User <|-- BaseModel

    AppointmentRepository <|-- BaseRepository
    ServiceRepository <|-- BaseRepository
    UserRepository <|-- BaseRepository

    AppointmentResource <|-- BaseResource
    ServiceResource <|-- BaseResource
    UserResource <|-- BaseResource

    DBMigrator --|> Migration
```

## Component Relationships

Document component relationships...

## Dependency Injection

Document dependency injection patterns...