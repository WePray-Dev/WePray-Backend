# Project Name

This project is a Node.js-based authentication and user management service, designed to handle user registration, login, and prayer tracking functionalities. It follows best practices in code structure, error handling, and validation, with MongoDB as the primary database.

## Features

1. **User Registration**: Allows new users to register with required fields, including name, email, address, and subscription plan. Passwords are securely hashed using `bcrypt`.
2. **User Login**: Authenticates users via email and password, returning a JWT token for session management.
3. **Prayer Tracking**: Enables users to create and interact with prayer entries, including visibility settings (private or public).
4. **Error Handling**: Centralized error handling with custom error classes (`ValidationError`, `AuthError`, `DatabaseError`) and error logging using `winston`.
5. **Data Validation**: All inputs are validated using `Joi` schemas to ensure data integrity and prevent invalid data entries.

## Tech Stack

- **Node.js**: Backend runtime.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: ODM for MongoDB to define models and schemas.
- **Joi**: Schema validation for inputs.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: JWT generation and validation.
- **winston**: Logging for error tracking.

## Project Structure

- **controllers/**: Contains route controllers for handling requests.
- **middlewares/**: Centralized error handling middleware.
- **models/**: MongoDB schemas and models.
- **services/**: Business logic and database interactions.
- **validators/**: Input validation schemas using `Joi`.
- **utils/**: Custom error classes for standardized error handling.
- **routes/**: Route definitions and middleware assignments.
- **config/**: Configuration files for environment variables.

## Installation

### Prerequisites

- **Node.js** and **npm**
- **MongoDB** (local or cloud-based like MongoDB Atlas)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
