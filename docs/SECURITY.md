# Security

This document explains the security base of Manasiness.

The first version is not perfect security, but it already has important things to protect the app.

## Authentication

Manasiness uses JWT for authentication.

The token is saved in a httpOnly cookie, not in localStorage.

This is better because JavaScript from the browser cannot read the token directly.

Basic flow:

```txt
login/register → backend creates JWT → backend sends cookie → protected routes validate cookie
```

## Passwords

Passwords are not saved as plain text.

The backend uses bcrypt to hash the password before save it in database.

The database should save something like:

```txt
password_hash
```

Never save the real password.

## Cookies

The auth cookie should be configured with safe options.

Example idea:

```txt
httpOnly: true
secure: true in production
sameSite depending of deploy
```

In development, the frontend and backend can run in different ports.

Example:

```txt
frontend: http://localhost:5173
backend: http://localhost:3000
```

Because of that, CORS needs credentials enabled.

## CORS

CORS should not be open in production.

The backend should use the frontend url from environment variables.

Example:

```env
FRONTEND_URL=https://your-frontend-url.com
```

## Rate limit

Sensitive routes like login should have rate limit.

This helps slow down brute force attacks.

Example:

```txt
/auth/login → limited requests
```

## Generic errors

The app should not return too much information in errors.

Example, this is not good:

```txt
email does not exist
password is wrong
```

Better:

```txt
Invalid credentials
```

This makes harder for an attacker to know what part is failing.

## Protected routes

Most backend modules should be protected.

Public routes:

```txt
/auth/login
/auth/register
/auth/forgot-password
```

Protected routes:

```txt
/categories
/products
/users
/sales
/orders
/staff
/customers
/workers
/suppliers
/stats
```

The protected middleware should validate the token and set the store information in the request.

Example idea:

```txt
req.store = decoded token
```

## Store isolation

This is one of the most important security rules.

A store should never access data from another store.

Every protected query should use `store_id`.

Example:

```sql
WHERE store_id = $1
```

This is not only database organization, also security.

## Environment variables

Secrets should be in `.env`, not hard-coded.

Important variables:

```env
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
RESEND_API_KEY=
```

The `.env` file should not be uploaded to GitHub.

## Frontend security

The frontend should not save private tokens in localStorage.

The frontend can ask the backend who is logged with an endpoint like:

```txt
/auth/me
```

The backend reads the cookie and returns safe store data.

## Final note

Security is a process.

This version already has a good base, but later it can improve with more validation, logs, stronger permissions and better deploy configuration.
