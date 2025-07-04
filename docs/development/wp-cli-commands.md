# WP-CLI Commands

The Radius Booking plugin provides a comprehensive set of WP-CLI commands for scaffolding, database management, and development tasks. These commands follow Laravel-style architecture patterns and help maintain consistency across the codebase.

## Command Registry System

The plugin uses a centralized command registry system for managing WP-CLI commands:

```php
if ( defined( 'WP_CLI' ) && WP_CLI ) {
    $command_registry = new \RadiusTheme\RadiusBooking\Core\CommandRegistry();
    $command_registry->init();
}
```

## Available Commands

### 🏗️ Scaffolding Commands

#### Make Model
Generate a new model class with proper structure and relationships.

```bash
wp radius artisan make:model Location
```

**Generated Structure:**
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

#### Make Repository
Create a repository class for data access abstraction.

```bash
wp radius artisan make:repository LocationRepository
```

**Generated Structure:**
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

#### Make Resource
Generate API resource transformers for consistent data formatting.

```bash
wp radius artisan make:resource LocationResource
```

**Generated Structure:**
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

#### Make Service
Create service classes for business logic layer.

```bash
wp radius artisan make:service LocationService
```

**Generated Structure:**
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

#### Make Controller
Generate REST API controllers with standard CRUD operations.

```bash
wp radius artisan make:controller LocationController
```

**Generated Structure:**
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

### 🗄️ Database Commands

#### Make Table
Create database migration files with proper schema structure.

```bash
wp radius artisan make:table Locations
```

**Generated Migration:**
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

#### Run Migrations
Execute all pending database migrations.

```bash
wp radius artisan migrate
```

#### Delete Table
Remove a table migration file and optionally drop the table.

```bash
wp radius artisan delete:table LocationsTable
```

**Options:**
- `--force`: Drop the table from database
- `--backup`: Create backup before deletion

## Full Module Generation Workflow

### Complete Location Module Example

Generate a complete module with all components:

```bash
# 1. Create database table
wp radius artisan make:table Locations

# 2. Run migration
wp radius artisan migrate

# 3. Generate model
wp radius artisan make:model Location

# 4. Generate repository
wp radius artisan make:repository LocationRepository

# 5. Generate resource
wp radius artisan make:resource LocationResource

# 6. Generate service
wp radius artisan make:service LocationService

# 7. Generate controller
wp radius artisan make:controller LocationController
```

This creates the following structure:

```
includes/
├── Models/
│   └── Location.php
├── Repositories/
│   └── LocationRepository.php
├── Resources/
│   └── LocationResource.php
├── Services/
│   └── LocationService.php
├── Controllers/
│   └── Api/
│       └── LocationController.php
└── Database/
    └── Tables/
        └── LocationsTable.php
```

## Advanced Usage

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

### Integration with Dependency Injection

```php
// In your service provider or bootstrap file
$container->singleton('command.registry', function() {
    return new \RadiusTheme\RadiusBooking\Core\CommandRegistry();
});

// Later in your code
$registry = $container->get('command.registry');
$registry->addCommand('custom:command', 'CustomCommand')->init();
```

## Command Options and Flags

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

## API Routes Generated

When you create a controller, the following REST API routes are automatically available:

| Method | Route                    | Description        | Controller Method |
|--------|--------------------------|--------------------|-------------------|
| GET    | `/radius/v1/locations`   | List all           | `index()`         |
| POST   | `/radius/v1/locations`   | Create             | `store()`         |
| GET    | `/radius/v1/locations/1` | Show               | `show()`          |
| PUT    | `/radius/v1/locations/1` | Update             | `update()`        |
| DELETE | `/radius/v1/locations/1` | Delete             | `destroy()`       |

## Best Practices

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

## Troubleshooting

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

### Debug Mode

Enable debug mode to see detailed command execution:

```php
if ( WP_DEBUG ) {
    WP_CLI::debug( 'Command executed successfully' );
}
```

## Integration with IDE

### VS Code Snippets

Create custom snippets for faster development:

```json
{
  "Generate Location Module": {
    "prefix": "rb-module",
    "body": [
      "wp radius artisan make:table ${1:TableName}",
      "wp radius artisan migrate",
      "wp radius artisan make:model ${2:ModelName}",
      "wp radius artisan make:repository ${2:ModelName}Repository",
      "wp radius artisan make:resource ${2:ModelName}Resource",
      "wp radius artisan make:service ${2:ModelName}Service",
      "wp radius artisan make:controller ${2:ModelName}Controller"
    ],
    "description": "Generate complete module structure"
  }
}
```

### PHPStorm File Templates

Create file templates for consistent code generation across your team.

::: tip Command Efficiency
Use the WP-CLI commands to maintain consistency across your codebase. The generated files follow established patterns and include proper type hints, documentation, and error handling.
:::

::: warning File Overwrites
Always use the `--dry-run` flag first to preview what will be generated, especially when working with existing files. Use `--force` only when you're certain you want to overwrite existing code.
:::