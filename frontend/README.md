# Interactive Map Project Documentation

## Overview

This project is a React-based interactive map application that allows users to manage markers with comments. Built with React, Leaflet, and TanStack Query, it provides a robust solution for marker CRUD operations with local storage persistence.

## 🏗 Architecture

### Tech Stack

- Framework: React with TypeScript
- Build Tool: Vite
- Map Library: Leaflet via react-leaflet
- State Management: TanStack Query
- Modal Component: react-modal
- Data Persistence: Local Storage API

### Key Components

#### 1. Map Component

- Main map interface using Leaflet
- Handles marker interactions
- Manages map events and marker state

#### 2. MarkerModal Component

- Modal interface for marker operations
- Handles create/edit/delete marker forms
- Form validation and user input

#### 3. Markers API

- Local storage-based API implementation
- CRUD operations for markers
- Simulated network delays

## 🔧 Setup & Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Features

### Map Display

- Interactive map with drag and zoom capabilities
- Default center: [51.505, -0.09] (London)
- Default zoom level: 13

### Marker Management

- **Create**: Click anywhere on map to add marker
- **Read**: Click markers to view comments
- **Update**: Edit marker comments via modal
- **Delete**: Remove markers with confirmation

### Data Persistence

- Markers stored in local storage
- Initial mock data provided
- Simulated API latency for realistic behavior

## 🏛 Project Structure

```
frontend/
├── src/
│   ├── api/          # API layer
│   ├── components/   # React components
│   ├── types/        # TypeScript types
│   └── App.tsx       # Root component
├── package.json
└── tsconfig.json
```

## 💡 Implementation Details

### State Management

TanStack Query was chosen for:

- Built-in cache management
- Automatic background updates
- Loading/error states
- Optimistic updates

### Map Library Choice

Leaflet was selected because:

- Open-source with no API key required
- Excellent React integration
- Lightweight and performant
- Rich feature set

### Type Safety

- Full TypeScript implementation
- Strict type checking enabled
- Custom types for markers and DTOs

## 🔄 API Integration

### Marker Types

```typescript
interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  comment: string;
}
```

### Available Operations

- `GET /markers` - Fetch all markers
- `POST /marker` - Create new marker
- `PUT /marker/:id` - Update marker
- `DELETE /marker/:id` - Delete marker

## 🚀 Performance Considerations

### Query Optimization

- Efficient cache management via TanStack Query
- Optimistic updates for better UX

### Map Performance

- Lazy loading of map tiles
- Efficient marker rendering

### State Updates

- Minimal re-renders
- Optimized marker updates

## 📝 Development Guidelines

### Code Style

- Follow ESLint configuration
- Use TypeScript strict mode
- Maintain component isolation

### Git Workflow

- Feature branches
- Meaningful commit messages
- Regular rebasing

### Testing

- Component testing
- Integration testing
- E2E testing when needed

## 🔍 Error Handling

- User-friendly error messages
- API error handling
- Form validation
- Fallback UI states
