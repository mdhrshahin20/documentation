# React Frontend Architecture

The React frontend provides a modern, responsive user interface built with React 18, Redux Toolkit, and TailwindCSS.

## Frontend Structure Overview

```
src/
├── components/           # Reusable UI components
│   ├── Common/          # Generic components (Button, Input, Modal)
│   ├── Layout/          # Layout components (Header, Sidebar, Footer)
│   └── Forms/           # Form-specific components
├── modules/             # Feature-specific modules
│   ├── Appointment/     # Appointment management
│   ├── Service/         # Service management
│   ├── User/           # User management
│   └── Calendar/       # Calendar functionality
├── pages/              # Route-level page components
├── store/              # Redux state management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # SCSS and CSS files
├── assets/             # Static assets
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## Component Architecture

### Component Hierarchy

The application follows a hierarchical component structure:
- App Component → Router → Layout → Pages → Modules → UI Components

### Base Component Structure

#### Common Components
Reusable UI elements with consistent styling:
- Button with variant support
- Input fields with validation
- Modal dialogs
- Table components

#### Layout Components
Application structure components:
- Header with navigation
- Sidebar for admin navigation
- Footer information
- Main content area

## Module Architecture

### Feature Module Structure
Each feature follows a consistent pattern:

```
modules/Appointment/
├── components/         # Module-specific components
├── hooks/             # Module-specific hooks
├── services/          # API services
├── store/             # Redux slice
├── types/             # TypeScript types
└── utils/             # Module utilities
```

### Example Module Implementation

#### Types Definition
```typescript
interface Appointment {
  id: number;
  userId: number;
  serviceId: number;
  staffId: number;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
}
```

#### API Service
```typescript
export class AppointmentService {
  static async getAppointments(filters = {}) {
    const response = await apiClient.get('/appointments', { params: filters });
    return response.data;
  }
  
  static async createAppointment(data) {
    const response = await apiClient.post('/appointments', data);
    return response.data;
  }
}
```

#### Redux Slice
```typescript
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      });
  }
});
```

#### Custom Hooks
```typescript
export const useAppointments = (initialFilters = {}) => {
  const dispatch = useAppDispatch();
  const { appointments, loading, error } = useAppSelector(state => state.appointments);
  
  useEffect(() => {
    dispatch(fetchAppointments(initialFilters));
  }, [dispatch, initialFilters]);
  
  return { appointments, loading, error };
};
```

## State Management

### Redux Store Configuration
Centralized state management with:
- Feature-based slices
- RTK Query for API calls
- Middleware for logging and persistence
- DevTools integration

### Store Structure
```typescript
export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    services: serviceReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
```

## Routing & Navigation

### React Router Setup
Client-side routing with:
- Nested route structure
- Protected routes
- Lazy loading
- Route-based code splitting

### Example Routes
```tsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/appointments" element={<Appointments />} />
  <Route path="/services" element={<Services />} />
  <Route path="/calendar" element={<Calendar />} />
</Routes>
```

## Performance Optimization

### Code Splitting
```tsx
const Appointments = lazy(() => import('./pages/Appointments'));

<Suspense fallback={<Loading />}>
  <Appointments />
</Suspense>
```

### Memoization
```tsx
const AppointmentCard = memo(({ appointment, onClick }) => {
  return (
    <div onClick={onClick}>
      {/* Component content */}
    </div>
  );
});
```

## Styling Approach

### TailwindCSS Integration
Utility-first CSS framework providing:
- Consistent design system
- Responsive design utilities
- Component composition
- Build-time optimization

### Component Styling
```tsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Appointment Details
  </h2>
</div>
```

::: tip Frontend Architecture Benefits
The modular React architecture provides:
- **Reusable Components**: Consistent UI across the application
- **Type Safety**: TypeScript ensures code reliability  
- **Predictable State**: Redux provides predictable state management
- **Performance**: Code splitting and memoization optimize performance
:::

::: warning Bundle Size Considerations
Monitor bundle size as you add features. Use webpack-bundle-analyzer to identify large dependencies and consider lazy loading for less frequently used components.
:::