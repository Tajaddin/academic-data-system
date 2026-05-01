# Academic Data Interface System

A web-based platform for academic staff to manage student records, course enrollments, and grade reports. Built with React and TypeScript using a component-driven architecture.

## Features

- **Student records management** — view, create, and update student profiles
- **Course enrollment** — manage course registrations and enrollment status
- **Grade management** — enter and update grades with GPA calculation
- **What-If analysis** — simulate grade scenarios to project GPA outcomes
- **Role-based views** — separate interfaces for administrative and academic staff
- **Automated reports** — generate GPA and enrollment summaries

## Tech Stack

- **React 18** — component-based UI
- **TypeScript** — full type safety across the application
- **Vite** — fast development server and build tool
- **ESLint** — code quality enforcement

## Project Structure

```
academic-data-system/
├── src/
│   ├── components/    # Reusable UI components (tables, forms, modals)
│   ├── pages/         # Page-level components (Students, Courses, Grades)
│   ├── css/           # Stylesheets
│   ├── App.tsx        # Root component with routing
│   └── main.tsx       # Application entry point
├── index.html
├── vite.config.ts
└── tsconfig.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:5173

# Build for production
npm run build

# Lint
npm run lint
```

## License

MIT
