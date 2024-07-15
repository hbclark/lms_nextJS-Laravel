This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



# LMS Project

This project is a Learning Management System (LMS) built with a Next.js frontend and a Laravel backend.

## Table of Contents

- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [Additional Notes](#additional-notes)
- [Password Requirements](#password-requirements)

## Project Structure

The project is organized into two main parts:
- **Frontend**: Built using Next.js.
- **Backend**: Built using Laravel.

### Frontend

The frontend structure is as follows:

```
LMS_FRONTEND/
├── .vscode/                  # Visual Studio Code configuration files
├── public/                   # Public static assets
│   ├── favicon.ico           # Favicon icon
│   └── ...                   # Other static files
├── src/                      # Source files for the application
│   ├── actions/              # Actions for state management 
│   ├── api/                  # API related code
│   ├── app/                  # Main application logic and components
│   │   ├── auth/             # Authentication related pages and components
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   └── services/         # Services and utilities
│   ├── components/           # Reusable React components
│   │   ├── AskHelpButton/    # Component for asking help
│   │   ├── BookItem/         # Component representing a book item
│   │   ├── BooksItem/        # Component for displaying a list of books
│   │   ├── DashboardHeader/  # Header component for the dashboard
│   │   ├── EditBookForm/     # Form for editing a book
│   │   ├── EditUserForm/     # Form for editing user details
│   │   ├── Navbar/           # Navigation bar component
│   │   ├── SearchBook/       # Component for searching books
│   │   ├── SideBar/          # Sidebar component
│   │   ├── SignupForm/       # Form for user signup
│   │   └── UsersListItem/    # Component for listing users
│   ├── context/              # React context for state management
│   ├── layout.js             # Main layout component
│   ├── not-found.js          # 404 Not Found page
│   └── page.js               # Main page component
└── README.md                 # Project documentation
```

### Description of Main Folders and Files

- **.vscode/**: Contains Visual Studio Code configuration files for setting up the development environment.
- **public/**: Holds static assets that can be served directly. This includes the favicon and other images or static files.
- **src/**: The main directory for the source code of the application.
  - **actions/**: Contains action creators for managing state, likely used with a state management library like Redux.
  - **api/**: Includes code related to API calls and services.
  - **app/**: Houses the main application logic, including different pages and services.
    - **auth/**, **about/**, **contact/**, **login/**, **register/**: Specific directories for each of the primary application pages.
  - **components/**: A collection of reusable components used throughout the application.
    - Each subdirectory under `components/` typically represents a single component or a related group of components.
  - **context/**: Contains files for setting up React context, which is used for state management.
  - **layout.js**: Defines the main layout for the application.
  - **not-found.js**: The 404 error page component.
  - **page.js**: The main page component.

## Directory Structure of dashboard

```
src/
└── app/
    └── auth/
        └── dashboard/
            ├── book/
            │   ├── add/                # Page for adding a new book
            │   ├── edit/               # Page for editing book details
            │   ├── list/               # Page listing all books
            │   ├── search/             # Page for searching books
            │   └── page.js             # Main page component for managing books
            ├── booksList/
            │   └── page.js             # Main page component for listing books
            ├── borrow/
            │   └── page.js             # Main page component for borrowing books
            └── user/
                ├── add/                # Page for adding a new user
                ├── borrow/             # Page for managing borrowed books for a user
                ├── edit/               # Page for editing user details
                ├── page.js             # Main page component for user-related actions
                ├── BookList.js         # Component for listing user's borrowed books
                └── layout.js           # Layout component for the user dashboard
```

## Description of Directories and Files

- **book/**: This directory contains pages and components for managing books.
  - **add/**: Contains files for adding new books to the system.
  - **edit/**: Contains files for editing existing book details.
  - **list/**: Contains files for listing all the books available in the system.
  - **search/**: Contains files for searching books within the system.
  - **page.js**: Serves as the main page component for book-related actions.

- **booksList/**: This directory includes:
  - **page.js**: The main component responsible for displaying a list of books.

- **borrow/**: This directory handles the borrowing functionalities:
  - **page.js**: The main page component for managing book borrowing.

- **user/**: This directory manages user-related functionalities:
  - **add/**: Contains files for adding new users.
  - **borrow/**: Contains files for managing books borrowed by users.
  - **edit/**: Contains files for editing user details.
  - **page.js**: Main component for managing user-related actions.
  - **BookList.js**: Component to list all books borrowed by a specific user.
  - **layout.js**: Provides the layout for user dashboard pages.

### Backend

The backend structure is as follows:

```
LMS_BACKEND/
├── app/                      # Application core files
├── config/                   # Configuration files
├── database/                 # Database migrations and seeders
├── routes/                   # Route definitions
├── resources/                # Views and assets
└── README.md                 # Project documentation
```

## Frontend Setup

To set up the frontend:

1. Navigate to the `LMS_FRONTEND` directory:
    ```bash
    cd lms_frontend
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. The frontend will be accessible at `http://localhost:3000`.

## Backend Setup

To set up the backend:

1. Navigate to the `LMS_BACKEND` directory:
    ```bash
    cd lms_backend
    ```

2. Install the required PHP packages using Composer:
    ```bash
    composer install
    ```

3. Set up the database configuration in the `.env` file:
    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=lms
    DB_USERNAME=clark
    DB_PASSWORD=123456ax
    ```

4. Configure the application URLs in the `.env` file:
    ```dotenv
    APP_URL=http://localhost:8000
    FRONTEND_URL=http://localhost:3000
    ```

5. Run the database migrations:
    ```bash
    php artisan migrate
    ```

6. Seed the database with fake data:
    ```bash
    php artisan db:seed
    ```

7. The backend will be accessible at `http://localhost:8000`.

## Database Configuration

Using XAMPP to provide MySQL service

Make sure your MySQL server is running and the database configuration in the `.env` file is correct. Here's a quick reference:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lms
DB_USERNAME=clark
DB_PASSWORD=123456ax
```

## Running the Application

To run the entire application:

1. Start the backend server by navigating to `lms_backend` and running:
    ```bash
    php artisan serve
    ```

2. Start the frontend server by navigating to `lms_frontend` and running:
    ```bash
    npm run dev
    ```

You can now access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Additional Notes

- After adding a new user through the backend, you need to **manually** update the user type to **"Admin"** in the database.
- To access the backend database and modify user details, you can use a tool like phpMyAdmin or directly connect through the MySQL command line.

## Password Requirements

Passwords must meet the following criteria:
- Length: 8-15 characters
- Include at least one uppercase letter
- Include at least one lowercase letter
- Include at least one number
- Include at least one special character (e.g., !@#?)

---

Make sure to update this `README.md` file as the project evolves and new functionalities or changes are introduced.



# Session Management and Access Control

This application uses `next-auth` to manage user sessions and protect application routes. Below is a guide on how session management and access control are implemented to secure the dashboard and restrict sensitive actions to admin users only.

## Session Management with `next-auth`

`next-auth` is a powerful library used to handle user authentication and maintain session state across the application. It ensures that only authenticated users can access the dashboard and its related functionalities.

### Steps to Implement Session Management:

1. **Installation**: Install `next-auth` in your project to facilitate user authentication and session management.

2. **Configuration**: Configure `next-auth` by setting up authentication providers and defining session callbacks. This configuration allows you to manage user roles and include them in session data.

3. **Protecting Routes**: Implement route protection using `next-auth`. Ensure that users must be authenticated to access the dashboard and other protected routes. Non-authenticated users attempting to access these routes will be redirected to the login page.

## Access Control for Admin Actions

To enhance security and control, certain actions within the application are restricted to users with admin privileges. This ensures that sensitive operations can only be performed by authorized admin users.

### Steps to Restrict Admin Actions:

1. **Role-Based Access**: Assign roles to users, such as "user" and "admin". These roles determine what level of access each user has within the application.

2. **Server-Side Role Checks**: Before rendering pages where sensitive actions occur, check the user’s role on the server side. If a user without admin privileges attempts to access these pages, they will be redirected to the dashboard page.

3. **Client-Side Role Enforcement**: Enforce role checks on the client side as well. This helps prevent unauthorized users from seeing or interacting with components meant for admins.

## Summary of Protected Areas

- **Dashboard Access**: Only authenticated users can access the dashboard. Non-authenticated users are redirected to the login page if they attempt to access dashboard routes.

- **Admin Actions**: Actions such as adding, editing, deleting, or returning books, and managing users are restricted to admin users. Non-admin users attempting to access these admin-specific pages or actions are redirected to the main dashboard page.

## Additional Notes

- **Session Security**: Keep your session management and access control logic up-to-date to address new security requirements and changes in user roles.
- **User Experience**: Redirect non-authenticated users to the login page and non-admin users to the dashboard to ensure they understand their access restrictions without encountering error pages.

By implementing these practices, you ensure that your application is secure and user access is managed effectively based on their authentication status and role.
