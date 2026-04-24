# Architecture

This document explain how Manasiness is organized.

The project has two big parts:

```txt
frontend
backend
```

The idea is not make everything mixed. Each part has their own job and each folder should be easy to understand later.

## Frontend architecture

The frontend is made with React and Vite.

The structure is mostly separated in `features` and `shared`.

```txt
frontend/src
├── app
├── assets
├── features
└── shared
```

## app

This folder has the general layout and navigation of the app.

Example:

```txt
app/layouts/DashboardLayout.jsx
app/navigation/DashboardSidebar.jsx
```

The dashboard layout keeps the sidebar and the main content. The sidebar controls the links to pages like products, sales, orders, stats and settings.

## features

This folder has the main business pages.

Example:

```txt
features/products
features/categories
features/sales
features/orders
features/customers
features/suppliers
features/workers
features/income
features/expenses
features/pending
features/activity
```

A feature can have pages, api files, mappers or config files depending of what it needs.

Example idea:

```txt
products/pages
products/api
products/mappers
products/config
```

Not all features need the same folders. Some pages are more simple, so they have less files.

## shared

This folder has code that can be reused in many parts of the app.

Example:

```txt
shared/api
shared/hooks
shared/routes
shared/ui
shared/utils
```

### shared/api

Here is the API client and common request logic.

### shared/hooks

Here are hooks like debounce or other reusable React logic.

### shared/routes

Here are route helpers like protected routes.

### shared/ui

Here are reusable components like layouts, cards, tables, forms, guards and overlays.

### shared/utils

Here are small helpers like currency and phone format.

## Backend architecture

The backend is made with Node.js, Express and PostgreSQL.

The backend follows this flow:

```txt
routes → controllers → services → repositories
```

## routes

Routes define the endpoint and connect it with the controller.

Example idea:

```txt
GET /products
POST /products
GET /products/:id
```

Routes should not have business logic. They only receive the route and send it to the controller.

## controllers

Controllers handle the request and response.

They take things like `req.body`, `req.params`, `req.query` and `req.store`, then call the service.

Controllers should be thin. They should not have SQL and should not have too much business logic.

## services

Services have the real business logic.

Example:

- validate if a product exists
- validate if a customer belongs to the same store
- decide if stock should change
- prepare the data before save
- throw controlled errors

## repositories

Repositories talk directly with PostgreSQL.

This is where SQL queries live.

The repository should not decide the business rules. It should only get, create, update or delete data.

## Errors

The backend has centralized error handling.

The goal is to avoid sending dangerous details to the frontend.

Example idea:

```txt
service throws AppError
error middleware sends clean response
```

## Authentication flow

The app uses JWT with httpOnly cookies.

Basic flow:

```txt
login/register → backend creates token → token goes in cookie → protected routes read cookie → req.store is available
```

The frontend should not need to save the token in localStorage.

## General rule

If a file is getting too big, the first question is:

```txt
Is this page logic, shared ui, business logic, or database logic?
```

Then move it to the correct place.
