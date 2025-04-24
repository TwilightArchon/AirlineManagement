# AirlineManagement

# CS4400 Project Guide

## Setup Instructions

Before you can run this project, you need to install Node.js and npm (which comes with Node.js).

### Windows Installation
1. Visit the [Node.js official website](https://nodejs.org/)
2. Download the LTS (Long Term Support) version recommended for most users
3. Run the installer and follow the installation wizard
4. Accept the license agreement and keep the default installation settings
5. Click "Install" to begin the installation process
6. After installation completes, click "Finish"
7. Verify installation by opening Command Prompt and typing:
   ```
   node -v
   npm -v
   ```
   Both commands should display version numbers if installation was successful

### macOS Installation
1. Visit the [Node.js official website](https://nodejs.org/)
2. Download the LTS version for macOS
3. Run the installer package and follow the instructions
4. Alternatively, if you use Homebrew, you can install Node.js by running:
   ```
   brew install node
   ```
5. Verify installation by opening Terminal and typing:
   ```
   node -v
   npm -v
   ```

### Linux Installation
1. Using apt (Ubuntu/Debian):
   ```
   sudo apt update
   sudo apt install nodejs npm
   ```

2. Using dnf (Fedora):
   ```
   sudo dnf install nodejs
   ```

3. Verify installation:
   ```
   node -v
   npm -v
   ```

## Instructions to run the app

1. Clone this repository:
   ```
   git clone [repository-url]
   cd am-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

5. Once open the website, you can either click the drop down button views or procedures to run the application.

## Technologies for this application
Frontend: Next.js under react framework, with various components from Radix UI
Backend: Mysql local database
   mysql2 library to connect mysql local database and the server
   use api calls to connect the database and the user side

Connection: Use procedure and view api to interact with database (db.ts) to establish connection.

Data flow:
Frontend components use fetch to call API endpoints
API routes execute SQL queries or stored procedures using the database connection
Results are returned as JSON to the frontend
Frontend displays the results in tables or other UI components

## Team Contribution
Felix Wang: Implemented views in the frontend.

Junjie Tang: Implemented alternative backend mysql connection with flask

Yuanhong Zhou: Implemented procedures in the frontend.

Yurun Zhu:Implemented the backend connection to mysql

