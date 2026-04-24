# Frontend

This is the frontend of Manasiness.

It is made with React, Vite, React Router and CSS.

The first version is focused on desktop because the system is for a business dashboard and the mobile version will be better in a next version.

## Stack

- React
- Vite
- React Router
- CSS
- React Toastify
- Lucide React
- Recharts

## Main structure

```txt
frontend/src
├── app
├── assets
├── features
└── shared
```

## app

General app layout and navigation.

Example:

```txt
app/layouts
app/navigation
```

## features

Business pages and their own logic.

Example:

```txt
features/products
features/categories
features/sales
features/orders
features/customers
features/suppliers
features/workers
features/home
features/income
features/expenses
features/pending
features/activity
```

Some features can have pages, api, mappers and config. Not all pages need the same files.

## shared

Reusable things for the app.

Example:

```txt
shared/api
shared/hooks
shared/routes
shared/ui
shared/utils
```

## Routes

Main public routes:

```txt
/
/login
/register
/forgot-password
```

Main protected routes:

```txt
/dashboard
/dashboard/products
/dashboard/categories
/dashboard/sales
/dashboard/orders
/dashboard/customers
/dashboard/workers
/dashboard/suppliers
/dashboard/income
/dashboard/expenses
/dashboard/pending
/dashboard/activity
/dashboard/information
/dashboard/password
```

## API connection

The frontend uses `VITE_API_URL` to connect with backend.

Example:

```env
VITE_API_URL=http://localhost:3000
```

## Run frontend

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

The frontend is made with reusable ui because many pages repeat the same idea: table, detail page, forms, filters and actions.

The goal is keep the design consistent with the Manasiness style and not create a different style in every page.
