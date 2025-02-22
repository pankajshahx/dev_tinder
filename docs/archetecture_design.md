# Dev Tinder - Project Plan

## Overview

Dev Tinder is a platform similar to Tinder but designed for developers to connect professionally. The project will have two microservices:

1. **Frontend** - User interface for interacting with the platform.
2. **Backend** - Handles business logic, database, and APIs.

## Tech Stack

- **Backend:** Node.js, MongoDB, REST APIs
- **Frontend:** React.js (to be implemented later)

## Database Design

### User Schema

```json
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "password": "string",
  "bio": "string",
  "skills": ["string"],
  "location": "string",
  "profilePicture": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### ConnectionRequest Schema

```json
{
  "_id": "ObjectId",
  "senderId": "ObjectId",
  "receiverId": "ObjectId",
  "status": "pending | accepted | rejected | ignored",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## API Design

### User APIs

- **POST /users/register** → Register a new user
- **POST /users/login** → Authenticate user
- **GET /users/:id** → Get user profile
- **PUT /users/:id** → Update user profile
- **DELETE /users/:id** → Delete user

### ConnectionRequest APIs

- **POST /connections/request** → Send a connection request
- **PUT /connections/respond** → Accept, reject, or ignore a request
- **GET /connections/pending** → Get all pending requests
- **GET /connections/matches** → Get accepted connections

## Features

1. **User Authentication** - Signup/Login
2. **Profile Management** - Update skills, bio, and details
3. **Explore Page** - Browse other developers
4. **Send Requests** - Connect with developers
5. **Match System** - View accepted connections
6. **Ignore Requests** - Option to ignore a request

This plan covers the foundation of Dev Tinder. Let me know if any improvements are needed! 🚀
