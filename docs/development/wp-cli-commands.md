# WP-CLI Commands

<p>This document provides clear instructions for developers using the <strong>Artisan-style WP-CLI commands</strong> in the Radius Booking plugin to quickly scaffold and manage your plugin's modules, database, and API architecture.</p>

---

## 📦 Artisan Command Namespace

All commands are registered under:

```bash
wp radius artisan
```

---

## ⚙️ Module Development Structure

Each module follows a **standard Laravel-style architecture**:

```
Model → Repository → Resource → Service → Controller
```

You can generate each component manually or in one go using the `make:module` command.

---

## 💪 Available Commands

### 🔧 Table Commands

| Command | Description |
|---------|-------------|
| `wp radius artisan make:table TableName` | Generate a migration table class (e.g. CategoriesTable). |
| `wp radius artisan delete:table TableName` | Delete the migration table class (e.g. CategoriesTable). |

### 🏗️ Scaffolding Commands

| Command | Description |
|---------|-------------|
| `wp radius artisan make:model ModelName` | Generate a new model class with proper structure and relationships. |
| `wp radius artisan make:repository RepositoryName` | Create a repository class for data access abstraction. |
| `wp radius artisan make:resource ResourceName` | Generate API resource transformers for consistent data formatting. |
| `wp radius artisan make:service ServiceName` | Create service classes for business logic layer. |
| `wp radius artisan make:controller ControllerName` | Generate REST API controllers with standard CRUD operations. |
| `wp radius artisan make:module ModuleName` | Generate complete module with all components. |

### 🗄️ Database Commands

| Command | Description |
|---------|-------------|
| `wp radius artisan migrate` | Execute all pending database migrations. |
| `wp radius artisan migrate --refresh` | Refresh all migrations (drop and recreate). |
| `wp radius artisan migrate --status` | Show migration status. |
| `wp radius artisan migrate --rollback --steps=1` | Rollback migrations. |

---

## 🔀 Lifecycle Example

Let's say you want to create a `Location` module with migration:

```bash
wp radius artisan make:table LocationsTable
wp radius artisan make:module Location
wp radius artisan migrate
```

Done! Now you have a fully functional module with:

- A `Location` model
- API-ready controller
- Business logic layer
- REST transformation logic
- Registered route via your plugin router

---

## 📋 Generated Code Examples

### Model Structure
```php
class Location extends BaseModel {
    protected string $table = 'locations';
    protected array $fillable = [ 'title', 'address', 'email', 'phone', 'image', 'status' ];

    public function services() {
        return $this->hasMany( Service::class, 'location_id' );
    }

    public function employees() {
        return $this->hasMany( Employee::class, 'location_id' );
    }
}
```

### Repository Structure
```php
class LocationRepository extends BaseRepository {
    protected string $model = Location::class;
    
    public function getActiveLocations(): Collection {
        return $this->query()
                    ->where('status', 'active')
                    ->orderBy('title')
                    ->get();
    }
}
```

### Resource Structure
```php
class LocationResource extends BaseResource {
    public function transform( $location ): array {
        return [
            'id'         => $location->id,
            'title'      => $location->title,
            'address'    => $location->address,
            'email'      => $location->email,
            'phone'      => $location->phone,
            'image'      => $location->image,
            'status'     => $location->status,
            'created_at' => $location->created_at,
            'updated_at' => $location->updated_at,
            'services'   => $this->whenLoaded( 'services', $location ),
            'employees'  => $this->whenLoaded( 'employees', $location ),
        ];
    }
}
```

### Service Structure
```php
class LocationService {
    public function __construct(
        private LocationRepository $locationRepo
    ) {}

    public function createLocation( $data ) {
        $this->validateLocationData( $data );
        return $this->locationRepo->create( $data );
    }

    public function updateLocation( $id, $data ) {
        $this->validateLocationData( $data );
        return $this->locationRepo->update( $id, $data );
    }
    
    private function validateLocationData( array $data ): void {
        if ( empty( $data['title'] ) ) {
            throw new ValidationException( 'Location title is required' );
        }
    }
}
```

### Controller Structure
```php
class LocationController extends BaseRestController {
    protected string $rest_base = 'locations';
    
    public function __construct(
        private LocationService $locationService
    ) {}
    
    public function index( WP_REST_Request $request ) {
        $locations = $this->locationService->getAll();
        return $this->collection( $locations, LocationResource::class );
    }

    public function store( WP_REST_Request $request ) {
        $data = $request->get_params();
        $location = $this->locationService->createLocation( $data );
        return $this->resource( $location, LocationResource::class );
    }
}
```

### Table Migration Structure
```php
class LocationsTable extends Migration {
    public function up( Builder $table ) {
        $table->id();
        $table->string( 'title' );
        $table->text( 'address' );
        $table->string( 'email' )->nullable();
        $table->string( 'phone' )->nullable();
        $table->string( 'image' )->nullable();
        $table->enum( 'status', [ 'active', 'inactive' ] )->default( 'active' );
        $table->timestamps();
    }
    
    public function down() {
        // Drop table logic
    }
}
```

---

## 🚀 API Routes Generated

When you create a controller, the following REST API routes are automatically available:

| Method | Route                    | Description        | Controller Method |
|--------|--------------------------|--------------------|-------------------|
| GET    | `/radius/v1/locations`   | List all           | `index()`         |
| POST   | `/radius/v1/locations`   | Create             | `store()`         |
| GET    | `/radius/v1/locations/1` | Show               | `show()`          |
| PUT    | `/radius/v1/locations/1` | Update             | `update()`        |
| DELETE | `/radius/v1/locations/1` | Delete             | `destroy()`       |

---

## 🥪 Tips for Developers

- Follow naming conventions (e.g. `CategoriesTable`, `UserProfileRepository`).
- Use `make:module` when starting fresh to speed up development.
- Use `migrate --refresh` frequently during dev to reset schema quickly.
- Use `controller`, `service`, and `repository` layers to separate responsibilities cleanly.
- Every generated controller supports RESTful structure and is registered in the plugin API.

---

## 🔧 Advanced Usage

### Custom Command Registration

```php
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    $command_registry = new \RadiusTheme\RadiusBooking\Core\CommandRegistry();
    
    // Add custom commands
    $command_registry
        ->addCommand('make:helper', 'MakeHelperCommand')
        ->addCommand('make:seeder', 'MakeSeederCommand')
        ->removeCommand('delete:table') // Remove unwanted command
        ->init();
    
    // Debug: Show registered commands
    if ( WP_DEBUG ) {
        WP_CLI::debug( 'Registered ' . $command_registry->getCommandCount() . ' commands' );
    }
}
```

### Integration with Dependency Injection Container

```php
// In your service provider or bootstrap file
$container->singleton('command.registry', function() {
    return new \RadiusTheme\RadiusBooking\Core\CommandRegistry();
});

// Later in your code
$registry = $container->get('command.registry');
$registry->addCommand('custom:command', 'CustomCommand')->init();
```

---

## 📚 Summary Cheat Sheet

```bash
# Table
wp radius artisan make:table CategoriesTable
wp radius artisan delete:table CategoriesTable

# Migration
wp radius artisan migrate
wp radius artisan migrate --refresh
wp radius artisan migrate --status
wp radius artisan migrate --rollback --steps=1

# Module Parts
wp radius artisan make:model User
wp radius artisan make:repository UserRepository
wp radius artisan make:resource UserResource
wp radius artisan make:service UserService
wp radius artisan make:controller UserController

# All-in-One
wp radius artisan make:module User
```

---

## 🛠️ Command Options and Flags

### Global Options

All commands support these global options:

- `--force`: Overwrite existing files
- `--dry-run`: Show what would be generated without creating files
- `--namespace`: Specify custom namespace
- `--path`: Custom output path

### Examples with Options

```bash
# Force overwrite existing model
wp radius artisan make:model Location --force

# Generate with custom namespace
wp radius artisan make:service LocationService --namespace="Custom\Namespace"

# Dry run to preview generation
wp radius artisan make:controller LocationController --dry-run
```

---

## 🔍 Troubleshooting

### Common Issues

#### Command Not Found
```bash
Error: 'radius' is not a registered wp command.
```

**Solution:** Ensure the command registry is properly initialized in your plugin bootstrap file.

#### Permission Errors
```bash
Error: Could not create file. Permission denied.
```

**Solution:** Check file permissions on the includes directory:
```bash
chmod 755 includes/
chmod 644 includes/**/*.php
```

#### Namespace Conflicts
```bash
Fatal error: Cannot declare class Location
```

**Solution:** Use unique namespaces or check for existing class names before generation.

---

## 🎯 Best Practices

### 1. Follow the Architecture Pattern
Always generate components in this order:
1. Table (Migration)
2. Model
3. Repository
4. Resource
5. Service
6. Controller

### 2. Use Service Layer
Never call repositories directly from controllers:

```php
// ❌ Bad
public function store( WP_REST_Request $request ) {
    $location = $this->locationRepo->create( $request->get_params() );
    return $this->resource( $location, LocationResource::class );
}

// ✅ Good
public function store( WP_REST_Request $request ) {
    $data = $request->get_params();
    $location = $this->locationService->createLocation( $data );
    return $this->resource( $location, LocationResource::class );
}
```

### 3. Resource Transformation
Always use resources for API responses:

```php
// ❌ Bad
return rest_ensure_response( $location->toArray() );

// ✅ Good
return $this->resource( $location, LocationResource::class );
```

### 4. Validation in Services
Keep validation logic in service classes:

```php
class LocationService {
    private function validateLocationData( array $data ): void {
        if ( empty( $data['title'] ) ) {
            throw new ValidationException( 'Location title is required' );
        }
        
        if ( ! filter_var( $data['email'], FILTER_VALIDATE_EMAIL ) ) {
            throw new ValidationException( 'Invalid email format' );
        }
    }
}
```

::: tip Command Efficiency
Use the WP-CLI commands to maintain consistency across your codebase. The generated files follow established patterns and include proper type hints, documentation, and error handling.
:::

::: warning File Overwrites
Always use the `--dry-run` flag first to preview what will be generated, especially when working with existing files. Use `--force` only when you're certain you want to overwrite existing code.
:::