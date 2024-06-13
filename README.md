# Course Management API

![Node.js](https://img.shields.io/badge/Node.js-v14.17-green)
![Express.js](https://img.shields.io/badge/Express.js-v4.17-blue)
![Prisma](https://img.shields.io/badge/Prisma-v2.28-orange)
![License](https://img.shields.io/badge/License-MIT-red)

## Overview

This repository contains a RESTful API for managing courses within a Learning Management System (LMS). It provides endpoints for user authentication, course management (CRUD operations), and progress tracking using Prisma ORM for database operations.

## API Documentation
Postam API documentation is available at [`Link`](https://documenter.getpostman.com/view/31503957/2sA3XPBh9H).

## Features

- User Authentication:
  - Register a new user (student or teacher).
  - Authenticate users and issue JWT tokens.

- Course Management:
  - Retrieve a list of all courses.
  - Retrieve details of a specific course.
  - Create, update, and delete courses (teachers only).

- Progress Tracking:
  - Retrieve progress for a specific user.
  - Update progress for a specific user (teachers only).

- Security:
  - Uses JWT tokens for secure authentication.
  - Implements role-based access control (students and teachers).

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshxraj/course-Management-API.git
   cd course-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Make sure you have PostgreSQL installed and running.
   - Create a `.env` file in the root directory and add your database URL:

     ```bash
     DATABASE_URL="postgresql://username:password@localhost:5432/course_management"
     ```

   - Run database migrations:

     ```bash
     npx prisma migrate dev --name init
     ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## API Endpoints

- **Authentication:**
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Authenticate a user and get a JWT token.

- **Course Management:**
  - `GET /api/courses`: Retrieve all courses.
  - `GET /api/courses/:id`: Retrieve details of a specific course.
  - `POST /api/courses`: Create a new course (requires teacher role).
  - `PUT /api/courses/:id`: Update a course (requires teacher role).
  - `DELETE /api/courses/:id`: Delete a course (requires teacher role).

- **Progress Tracking:**
  - `GET /api/users/:id/progress`: Retrieve progress for a specific user.
  - `POST /api/users/:id/progress`: Update progress for a specific user (requires teacher role).

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
