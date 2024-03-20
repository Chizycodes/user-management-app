# User Management App

This project is a user management application designed to facilitate the creation and management of user accounts. It consists of two main screens:

## User Creation Screen

This screen allows users to input their personal information such as first name, last name, phone number, email, password, and date of birth.

## User Table Screen

Here, users can view a paginated table displaying the list of users. The table columns include first name, last name, phone number, email, and date of birth.

## Technologies

- **Backend:** NodeJS / Express
- **Frontend:** React
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
