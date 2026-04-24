# Manasiness

Manasiness is a web application made to help small stores and small business with their daily control.

The idea is simple: register the movements, see the information more organized, control products stock, and have a better view of income, expenses and pending payments.

This project is my first real full stack project, so the main objective is not only make screens, also build a complete flow with frontend, backend, database, authentication and security base.

## Stack

### Languages
- JavaScript
- SQL

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express

### Database
- PostgreSQL

### Authentication & Security
- JWT
- httpOnly cookies
- bcrypt
- CORS
- Rate limiting

### UI & Feedback
- Lucide React
- React Toastify
- Recharts

### Email
- Resend

### Development tools
- ESLint
- dotenv
- node --watch
- DBeaver
- Postman

## Main features

- Register and login store account
- Protected dashboard
- Categories management
- Products management
- Customers, suppliers and workers management
- Sales flow
- Orders flow
- Staff payments flow
- Income, expenses, pending and activity views
- Store information and password pages
- Desktop only first version
- Not found page inside and outside dashboard

## Architecture

Manasiness is separated in frontend and backend. The project is not in one big file because I wanted each part to have their own responsibility.

### Frontend

The frontend is organized by features and shared components.

The pages, api, mappers, configs and feature logic are inside `features`.

The reusable ui, hooks, routes, api client and utils are inside `shared`.

Example:

```txt
frontend/src/features/products
frontend/src/shared/ui
frontend/src/shared/api
```

### Backend

The backend follows a layered structure:

```txt
routes → controllers → services → repositories
```

The idea is that routes only define the endpoint, controllers handle request and response, services have the business logic, and repositories talk with PostgreSQL.

See more in `docs/ARCHITECTURE.md`.

## Database

The database is made with PostgreSQL and is prepared for multi-store data.

Most important idea: each store has their own categories, products, users and movements using `store_id`.

The schema uses foreign keys, validations, indexes and some triggers for automatic dates.

See more in `docs/DATABASE.md`.

## Security

The first version already has a security base:

- httpOnly cookies for auth
- JWT authentication
- Password hashing with bcrypt
- CORS with credentials
- Rate limit in sensitive routes
- Generic error messages
- Protected backend routes

See more in `docs/SECURITY.md`.

## How to run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment variables

### Backend

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
RESEND_API_KEY=your_resend_key
```

### Frontend

```env
VITE_API_URL=http://localhost:3000
```

## Notes

This project is still growing. The first version is focused on desktop and on having the complete business flow working.

Later versions can improve responsive design, roles with permissions, voice assistant and more advanced reports.
