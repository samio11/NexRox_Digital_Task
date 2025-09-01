Job Portal Backend API
A RESTful API for a job portal application built with Node.js, Express, TypeScript, and MongoDB. This API supports user authentication, job posting, and job management functionalities.

🚀 Features
User Authentication (Register, Login, Logout)

JWT-based authentication with secure cookies

Job CRUD operations (Create, Read, Update, Delete)

Advanced querying with filtering, searching, sorting, and pagination

Role-based access control

Password hashing with bcrypt

Error handling and validation

📦 Installation
Clone the repository:

bash
git clone <your-repo-url>
cd server
Install dependencies:

bash
npm install
Set up environment variables:

bash
# Create a .env file in the root directory
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-portal
BCRYPT_SALT=12
JWT_ACCESS_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
NODE_ENV=development
Start the development server:

bash
npm run dev
🏗️ Project Structure
text
server/
├── src/
│   ├── app/
│   │   ├── config/          # Configuration files
│   │   ├── errors/          # Error handling utilities
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── middlewares.ts/  # Custom middlewares
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── jobs/        # Jobs module
│   │   │   └── user/        # User module
│   │   ├── routes/          # Route definitions
│   │   └── utils/           # Utility functions
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
├── dist/                   # Compiled JavaScript files
└── package.json
📋 API Endpoints
Authentication Endpoints
Register User
URL: /api/auth/register

Method: POST

Auth Required: No

Request Body:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
{
  "success": true,
  "message": "User Created Done",
  "statusCode": 201,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
Login User
URL: /api/auth/login

Method: POST

Auth Required: No

Request Body:

json
{
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
{
  "success": true,
  "message": "User Logged In Successfully",
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
Logout User
URL: /api/auth/logout

Method: POST

Auth Required: Yes

Response:

json
{
  "success": true,
  "message": "User Logged Out Successfully",
  "statusCode": 200,
  "data": ""
}
Job Endpoints
Create Job
URL: /api/jobs

Method: POST

Auth Required: Yes (USER role)

Request Body:

json
{
  "title": "Senior React Developer",
  "description": "Looking for an experienced React developer...",
  "jobType": "Fixed Price",
  "minBudget": 5000,
  "maxBudget": 8000,
  "skillsRequired": "React",
  "level": "Senior",
  "locationType": "Remote"
}
Response:

json
{
  "success": true,
  "message": "Job is created",
  "statusCode": 201,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e2",
    "user": "65a1b2c3d4e5f6a7b8c9d0e1",
    "title": "Senior React Developer",
    "description": "Looking for an experienced React developer...",
    "jobType": "Fixed Price",
    "minBudget": 5000,
    "maxBudget": 8000,
    "skillsRequired": "React",
    "level": "Senior",
    "locationType": "Remote",
    "createdAt": "2024-01-12T10:30:00.000Z",
    "updatedAt": "2024-01-12T10:30:00.000Z"
  }
}
Get All Jobs (with query parameters)
URL: /api/jobs?search=react&jobType=Fixed Price&level=Senior&page=1&limit=10&sort=-createdAt

Method: GET

Auth Required: Yes (USER role)

Query Parameters:

search: Search in title, jobType, and level fields

jobType: Filter by job type (Fixed Price/Hourly)

level: Filter by experience level (Junior/Mid/Senior)

locationType: Filter by location type (Remote/On-site/Hybrid)

page: Page number (default: 1)

limit: Items per page (default: 10)

sort: Sort field with prefix (- for descending)

Response:

json
{
  "success": true,
  "message": "Jobs Data is Getted",
  "statusCode": 200,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e2",
      "user": {
        "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "title": "Senior React Developer",
      "description": "Looking for an experienced React developer...",
      "jobType": "Fixed Price",
      "minBudget": 5000,
      "maxBudget": 8000,
      "skillsRequired": "React",
      "level": "Senior",
      "locationType": "Remote",
      "createdAt": "2024-01-12T10:30:00.000Z",
      "updatedAt": "2024-01-12T10:30:00.000Z"
    }
  ]
}
Update Job
URL: /api/jobs/:id

Method: PUT

Auth Required: Yes (USER role - only job owner)

Request Body:

json
{
  "title": "Updated React Developer Position",
  "maxBudget": 9000
}
Response:

json
{
  "success": true,
  "message": "Job Data is Updated",
  "statusCode": 200,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e2",
    "user": "65a1b2c3d4e5f6a7b8c9d0e1",
    "title": "Updated React Developer Position",
    "description": "Looking for an experienced React developer...",
    "jobType": "Fixed Price",
    "minBudget": 5000,
    "maxBudget": 9000,
    "skillsRequired": "React",
    "level": "Senior",
    "locationType": "Remote",
    "createdAt": "2024-01-12T10:30:00.000Z",
    "updatedAt": "2024-01-12T11:30:00.000Z"
  }
}
Delete Job
URL: /api/jobs/:id

Method: DELETE

Auth Required: Yes (USER role - only job owner)

Response:

json
{
  "success": true,
  "message": "Job Data is Deleted",
  "statusCode": 200,
  "data": ""
}
🛡️ Authentication
The API uses JWT authentication with secure HTTP-only cookies. After successful login, the server sets two cookies:

accessToken - Short-lived token for API access

refreshToken - Long-lived token for token refresh

Required Headers for Protected Routes:

http
Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
🎯 Skills Enum
Available skills for job postings:

HTML, CSS, JavaScript, TypeScript

React, Next.js, Angular, Vue.js

Node.js, Express.js, NestJS

MongoDB, PostgreSQL, MySQL

GraphQL, AWS, Docker, Git

Figma, UI/UX Design

🚦 Error Handling
The API returns standardized error responses:

json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "data": null
}
Common error status codes:

400 - Bad Request

401 - Unauthorized

403 - Forbidden

404 - Not Found

500 - Internal Server Error

🧪 Testing the API
You can test the API using tools like:

Postman

Thunder Client (VS Code extension)

curl commands
