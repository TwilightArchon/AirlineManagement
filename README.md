# AirlineManagement

# CS4400 Project Setup Guide

## Prerequisites: Installing Node.js and npm

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

## Getting Started with the Project

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

## Project Structure

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- `src/app`: Contains the pages of the application
- `public`: Static assets like images
- `src/components`: Reusable React components

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
