# Folder Structure

Understanding the project structure is crucial for efficient development. This page details the organization and purpose of each directory and file.

## Root Directory Structure

```
radius-booking/
├── bin/                    # CLI scripts and build tools
├── includes/              # PHP backend codebase  
├── src/                   # React frontend source code
├── tests/                 # Unit and integration tests
├── assets/                # Static assets (images, fonts)
├── languages/             # Translation files
├── vendor/                # Composer dependencies
├── node_modules/          # npm dependencies
├── dist/                  # Built frontend assets
├── radius-booking.php     # Main plugin file
├── composer.json          # PHP dependencies
├── package.json           # Node.js dependencies
├── webpack.config.js      # Webpack configuration
└── README.md              # Project documentation
```

## Detailed Directory Breakdown

| **Folder/File**         | **Purpose**                                                                 |
|------------------------ |----------------------------------------------------------------------------|
| `bin/`                  | CLI scripts/tools (e.g., build plugin zip).                                |
| `includes/`             | PHP codebase: abstracts, core, controllers, models, repositories, etc.     |
| `src/`                  | React frontend source: components, modules, pages, store, SCSS, etc.       |
| `radius-booking.php`    | Plugin bootstrap (WordPress entrypoint).                                   |

### `/includes/` - PHP Backend

```
includes/
├── Abstracts/             # Base classes and interfaces
├── Api/                   # REST API controllers
├── Core/                  # Core plugin functionality
├── Controllers/           # MVC controllers
├── Database/              # Database layer
├── Events/                # Event system
├── Middleware/            # Request middleware
├── Models/                # Data models
├── Repositories/          # Data access layer
├── Resources/             # API resource transformers
├── Routes/                # API route definitions
├── Services/              # Business logic layer
├── Setup/                 # Plugin installation/setup
└── Utils/                 # Utility functions
```

### `/src/` - React Frontend

```
src/
├── components/            # Reusable UI components
├── modules/               # Feature-specific modules
├── pages/                 # Page components
├── store/                 # Redux state management
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── styles/                # SCSS and CSS files
├── assets/                # Frontend assets
├── types/                 # TypeScript definitions
└── main.tsx              # Application entry point
```

## File Naming Conventions

### PHP Files
- **Classes**: PascalCase (`AppointmentController.php`)
- **Interfaces**: PascalCase with 'Interface' suffix (`RepositoryInterface.php`)
- **Functions**: snake_case (`get_appointment_data.php`)

### JavaScript/React Files  
- **Components**: PascalCase (`AppointmentForm.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useAppointments.js`)
- **Utilities**: camelCase (`dateUtils.js`)

::: tip Navigation Tip
Use your IDE's file explorer and search functionality to quickly navigate this structure. Most modern IDEs support fuzzy file searching (Ctrl+P in VS Code).
:::

::: warning Important Files
Always be careful when modifying these critical files:
- `radius-booking.php` - Main plugin file
- `composer.json` - PHP dependencies
- `package.json` - Node.js dependencies
:::