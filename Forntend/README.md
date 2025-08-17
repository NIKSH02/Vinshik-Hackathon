# VinShik Dashboard

A modern, responsive dashboard application built with React and Vite, featuring a clean interface for managing jobs, clients, quotes, and services.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd vinshik/Frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Maps**: Mapbox GL JS
- **Animations**: Framer Motion
- **TypeScript**: Supported (JS implementation provided)

## 📱 Features

### Dashboard Overview
- **Home Page**: Real-time statistics with mini charts
- **Sidebar Navigation**: Clean, intuitive navigation with active states
- **Top Bar**: Notifications, settings, and profile management

### Core Modules
- **Calendar**: Google Calendar-like interface with event management
- **Map**: Interactive Mapbox integration with branch locations
- **Clients**: Client relationship management with search and filtering
- **Jobs**: Project tracking with progress indicators and status management
- **Quotes**: Proposal management with pricing and expiry tracking
- **Services**: Service catalog with pricing and category management

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Live data updates and notifications
- **Interactive Components**: Modals, dropdowns, and popovers
- **Search & Filter**: Advanced filtering across all modules
- **Toast Notifications**: User feedback for actions

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, TopBar, Layout)
│   └── ui/              # Reusable UI components
├── data/                # Mock data for all modules
├── pages/               # Page components for each route
├── hooks/               # Custom React hooks
└── assets/              # Static assets
```

## 🎨 Design System

The application follows a consistent design system with:
- **Color Palette**: Teal primary, gray neutrals
- **Typography**: Inter font family
- **Spacing**: 4px grid system
- **Shadows**: Subtle shadows for depth
- **Border Radius**: Consistent 8px and 12px radius

## 🗺️ Map Integration

The Map page uses Mapbox GL JS for interactive mapping:
- Branch location markers
- Custom popups with branch information
- Smooth animations and transitions
- Fallback UI when token is missing

## 📊 Data Management

All data is managed through mock data files in the `src/data/` directory:
- `stats.ts` - Dashboard statistics
- `calendar.ts` - Calendar events
- `branches.ts` - Office locations
- `clients.ts` - Client information
- `jobs.ts` - Project data
- `quotes.ts` - Proposal data
- `services.ts` - Service catalog

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- ESLint configuration with React hooks rules
- Consistent formatting and naming conventions
- Component-based architecture
- Clean, readable code structure

## 📱 Screenshots

### Home Dashboard
![Home Dashboard](./screenshots/home.png)

### Interactive Map
![Map View](./screenshots/map.png)

### Calendar Interface
![Calendar View](./screenshots/calendar.png)

---

**Note**: In this hackathon, we'll give you a simple, easy-to-complete task so you can focus entirely on showcasing how you code rather than what you code. Our primary evaluation will be based on the quality of your work—clean and readable code, logical structure, consistent formatting, proper naming conventions, and adherence to best practices. It's about writing code that's not only functional but also maintainable, scalable, and professional.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
