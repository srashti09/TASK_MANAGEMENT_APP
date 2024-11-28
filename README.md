Task Management App - Full Stack Developer Assignment
Overview
The Task Management App is a full-stack application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows users to create, edit, delete, and manage tasks with the ability to categorize tasks by priority, view their details, and track their completion status. Additionally, the app provides an analytical dashboard for visualizing task statistics, including task distribution, completion rate, and upcoming deadlines.

Features
1. Basic Features:
Task Creation: Create tasks with a title, description, due date, and priority (High, Medium, Low).
Task List: View a list of tasks with filtering and sorting options by due date and priority.
Task Details: View the full details of a task in a separate view.
Task Editing: Edit task details and update them in the database.
Task Deletion: Delete tasks, which removes them from the MongoDB database.
2. Analytical Dashboard:
Task Distribution: A pie chart displaying the distribution of tasks based on priority levels.
Completion Rate: A line chart showing the percentage of tasks completed over time.
Upcoming Deadlines: A list or calendar view highlighting tasks with upcoming deadlines.
3. Backend Development:
RESTful API: Developed using Node.js and Express.js to handle CRUD operations for tasks.
MongoDB Integration: Uses MongoDB to store and manage tasks, with Mongoose for schema management.
API Endpoints:
POST /tasks: Create a new task.
GET /tasks: Retrieve a list of tasks with filtering and sorting options.
GET /tasks/:id: Retrieve details of a specific task.
PUT /tasks/:id: Update a task.
DELETE /tasks/:id: Delete a task.
4. Advanced Features:
Task Completion: Mark tasks as completed, updating their status in the database.
Task Filtering: Filter tasks by their completion status (Pending or Completed).
Search Functionality: A search bar to filter tasks by title or description.
Responsive Design: Ensures the app is usable on various devices.
5. UI/UX:
User Interface: A clean, user-friendly interface implemented with bootstrap,css for modern design elements.
Validation: Forms are validated to ensure required fields are filled out when creating or editing a task.
6. Code Quality:
Component Structure: Frontend components are organized for maintainability and scalability.
Backend Structure: The backend is structured with clear separation of concerns (controllers, models, services).

Installation & Setup
Backend (API)
Clone the repository:
 
git clone <repository_url>
cd <project_directory>
Install dependencies:

 
npm install
Create .env file: Add your environment variables such as the MongoDB URI:

makefile
 
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
Start the backend server:


 
npm start
The backend server will run on http://localhost:5000.

Frontend (React App)
Navigate to the client folder:

cd client
Install dependencies:

npm install
Start the frontend server:


npm start
The React app will run on http://localhost:3000.
Folder Structure

/client                    # Frontend React app
  /src
    /components            # React components like TaskList, TaskForm
    /pages                 # Pages for different routes (Home, About, Dashboard)
    /styles                # Styles for the app
/server                    # Backend Node.js app
  /controllers             # Handles business logic for task operations
  /models                  # Mongoose models for tasks
  /routes                  # Defines API routes for CRUD operations
  /config                # Business logic to interact with database
  app.js                   # Entry point for the backend server
  .env                     # Environment variables for MongoDB connection, etc.
Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB

API: RESTful API for managing tasks
How to Contribute
Fork the repository and clone it locally.
Create a feature branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -am 'Add feature').
Push to the branch (git push origin feature-branch).
Open a pull request with a description of your changes.
License
This project is licensed under the MIT License.

Conclusion
This Task Management App provides a comprehensive solution for task tracking with features like task creation, completion tracking, and an analytical dashboard to visualize the data. The application is built using best practices of the MERN stack and is fully responsive across devices.
