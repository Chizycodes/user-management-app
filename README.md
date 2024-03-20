# User Management App

This project is a user management application designed to facilitate the creation and management of user accounts. It consists of two main screens:

## User Creation Screen

This screen allows users to input their personal information such as first name, last name, phone number, email, password, and date of birth.

## User Table Screen

Here, users can view a paginated table displaying the list of users. Additionally, users have the ability to filter the user list by date of birth. The table columns include first name, last name, phone number, email, and date of birth.

## Technologies

- **Backend:** NodeJS / Express
- **Frontend:** React TypeScript
- **Database:** MongoDB

## Setup Instructions

To set up and run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Chizycodes/user-management-app.git`
2. Install dependencies:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
3. Configure environment variables for the backend (DATABASE_URL) and frontend (VITE_API_URL).
4. Start development servers:
   - Frontend: `cd client && npm run dev`
   - Backend: `cd server && npm start`
5. Access the application in your web browser.

## Backend API Documentation

For detailed documentation of the API endpoints and their usage, please refer to the [Backend API Documentation](https://documenter.getpostman.com/view/21871844/2sA358d5qw).
