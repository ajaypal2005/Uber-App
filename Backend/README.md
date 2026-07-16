# Backend API Documentation

## Register User

`POST /users/register`

This endpoint creates a new user account. The request body must include a `fullname` object, an `email`, and a `password`.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Required Data

- `fullname.firstname` is required and must be at least 3 characters long.
- `email` is required and must be a valid email address.
- `password` is required and must be at least 6 characters long.
- `fullname.lastname` is optional.

### Response Codes

- `201 Created`: User registered successfully. The response includes the generated JWT token and user data.
- `400 Bad Request`: Validation failed or required fields are missing.
- `500 Internal Server Error`: An unexpected server or database error occurred.

### Success Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-token",
  "user": {
    "_id": "66a1f0b7c2f4a9b7d1234567",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

### Notes

- The route is mounted under `/users`, so the full endpoint path is `/users/register`.
- Passwords are hashed before being stored in the database.

## Login User

`POST /users/login`

This endpoint authenticates an existing user with an email address and password. The request body must include an `email` and a `password`.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Required Data

- `email` is required and must be a valid email address.
- `password` is required and must be at least 6 characters long.

### Response Codes

- `200 OK`: Login successful. The response includes the generated JWT token and user data.
- `400 Bad Request`: Validation failed or required fields are missing.
- `401 Unauthorized`: The email or password is invalid.

### Success Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-token",
  "user": {
    "_id": "66a1f0b7c2f4a9b7d1234567",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Notes

- The route is mounted under `/users`, so the full endpoint path is `/users/login`.
- The password is verified against the stored hashed password.
