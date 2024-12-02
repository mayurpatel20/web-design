#Assignment 10: Job Portal Application with Role-Based Access
Project Overview
This project is a Job Portal Application built with React, Redux, and Material-UI for frontend development, and Node.js with Express and MongoDB for the backend. It includes role-based access control, enabling admins and employees to perform specific tasks based on their roles.


Key Features
Authentication:
Users can log in based on their credentials.
Role-based access for admin and employee.


Admin Features:
View and manage employees.
Add job postings.
Access shared pages: About Us, Contact Us, and Company Showcase.


Employee Features:
View available job postings.
Access shared pages: About Us, Contact Us, and Company Showcase.


Shared Features:
About Us, Contact Us, and Company Showcase are accessible to both admins and employees.
Logout Functionality:


A logout button to clear user sessions.
Technologies Used
Frontend:
React
Redux Toolkit
Material-UI
React Router
Backend:
Node.js
Express.js
MongoDB (Mongoose)
Setup Instructions
Prerequisites
Node.js installed on your machine.
MongoDB installed or a connection to a MongoDB Atlas cluster.
Steps to Run the Application
1. Clone the Repository
bash
Copy code
git clone <repository_url>
cd <repository_folder>
2. Install Dependencies
For the frontend:

bash
Copy code
cd job-portal-final
npm install
For the backend:

bash
Copy code
cd user-api-project
npm install
3. Start the Backend
Navigate to the backend folder (user-api-project) and start the server:
bash
Copy code
node server.js
Backend server runs on http://localhost:4000.
4. Start the Frontend
Navigate to the frontend folder (job-portal-final) and start the development server:
bash
Copy code
npm start
Frontend runs on http://localhost:3000.
Features and Pages
1. Admin Pages
Employees Page (/employees):

View a list of all employees.
Navigate to Add Jobs or View Jobs pages.
Add Jobs Page (/add-jobs):

Add new job postings.
Navigate to View Employees or View Jobs pages.
Shared Pages:

About Us, Contact Us, and Company Showcase.
2. Employee Pages
Jobs Page (/jobs):

View job postings available in the portal.
Navigate to shared pages.
Shared Pages:

About Us, Contact Us, and Company Showcase.
3. Shared Pages
About Us (/about): Displays information about the platform.
Contact Us (/contact): Users can reach out with feedback.
Company Showcase (/company-showcase): Highlights companies and their details.
API Endpoints
User Management
POST /user/login: Authenticate user credentials.
POST /user/create: Register a new user (admin or employee).
GET /user/getAll: Fetch all user details (Admin only).
Job Management
POST /user/create/job: Add a new job posting (Admin only).
GET /user/get/jobs: Fetch all job postings.
Role-Based Access
Role	Accessible Pages
Admin	Employees, Add Jobs, Jobs, About Us, Contact Us, Company Showcase
Employee	Jobs, About Us, Contact Us, Company Showcase
Navigation
The Logout button is available for both roles after login.
Shared pages (About Us, Contact Us, and Company Showcase) are accessible via navbar links for both roles.
Testing
Login as Admin:

Verify access to /employees, /add-jobs, /jobs, /about, /contact, and /company-showcase.
Verify navigation between pages using navbar links.
Login as Employee:

Verify access to /jobs, /about, /contact, and /company-showcase.
Verify restricted access to /employees and /add-jobs.
Logout:

Test logout functionality for both roles.
Verify redirection to /login after logout.
Future Improvements
Add spinners or loaders during API calls.
Add pagination for job and employee listings.
Enhance UI/UX with more styling and animations.