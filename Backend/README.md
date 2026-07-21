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

## Register Captain

`POST /captains/register`

This endpoint creates a new captain account.

### Request Body

```json
{
  "fullname": {
    "firstname": "John", // Required, minimum 3 characters
    "lastname": "Doe" // Optional, minimum 3 characters if provided
  },
  "email": "john.doe@example.com", // Required, valid email
  "password": "password123", // Required, minimum 6 characters
  "vehicle": {
    "color": "Red", // Required, minimum 3 characters
    "plate": "ABC-123", // Required, minimum 3 characters
    "capacity": 4, // Required, integer, minimum 1
    "vehicleType": "car" // Required, must be 'car', 'motorcycle', or 'auto'
  }
}
```

### Response Codes

- `201 Created`: Captain registered successfully. The response includes the generated JWT token and captain data.
- `400 Bad Request`: Validation failed, email already exists, or required fields are missing.
- `500 Internal Server Error`: An unexpected server or database error occurred.

### Success Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-token", // JWT token
  "captain": {
    "_id": "6a5f0caad9870bd52892440e",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Notes

- The route is mounted under `/captains`, so the full endpoint path is `/captains/register`.
- Passwords are hashed before being stored in the database.
- The generated token is also set as an HTTP-only cookie.

## Login Captain

`POST /captains/login`

This endpoint authenticates an existing captain using their email and password.

### Request Body

```json
{
  "email": "john.doe@example.com", // Required, valid email
  "password": "password123" // Required, minimum 6 characters
}
```

### Response Codes

- `200 OK`: Login successful. The response includes the generated JWT token and captain data.
- `400 Bad Request`: Validation failed, required fields missing, or invalid email/password.
- `500 Internal Server Error`: An unexpected server or database error occurred.

### Success Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-token", // JWT token
  "captain": {
    "_id": "6a5f0caad9870bd52892440e",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Notes

- The route is mounted under `/captains`, so the full endpoint path is `/captains/login`.
- The generated token is also set as an HTTP-only cookie.

## Captain Profile

`GET /captains/profile`

This endpoint retrieves the authenticated captain's profile.

### Headers

- `Authorization`: `Bearer <token>` (Optional if token is provided via cookie)
- `Cookie`: `token=<token>` (Optional if token is provided via Authorization header)

### Response Codes

- `200 OK`: Profile retrieved successfully.
- `401 Unauthorized`: Token is missing, invalid, or blacklisted.
- `500 Internal Server Error`: An unexpected server or database error occurred.

### Success Response Example

```json
{
  "captain": {
    "_id": "6a5f0caad9870bd52892440e",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Notes

- The route is mounted under `/captains`, so the full endpoint path is `/captains/profile`.
- Requires a valid JWT token.
