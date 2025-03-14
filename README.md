# Job Board Application

A modern job posting and company directory application built with Next.js 15 and TypeScript. This platform allows users to browse company profiles, view job listings, and explore employee information.

## 🚀 Features

- **Company Directory**: Browse and search through companies
- **Company Profiles**: View detailed company information including founding year, headquarters, size, and revenue
- **Job Listings**: Explore job openings with detailed descriptions
- **Employee Directory**: View employees associated with companies
- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Mock Data**: Automatically falls back to mock data when API is unavailable

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript

## Getting Started


## 🔧 Setup and Installation

1. Clone the repository
   ```bash

   git clone https://github.com/yourusername/job-board-frontend.git
   cd job-board-frontend

 2. Install dependencies

 Create a .env.local file in the project root and add your API URL
 NEXT_PUBLIC_API_URL=http://localhost:8000
 
  Start the development server

 📡 API Integration
The application is designed to work with a backend API with the following endpoints:

/api/v1/companies - Get all companies
/api/v1/companies/:id - Get a specific company
/api/v1/jobs - Get all jobs
/api/v1/profiles - Get all user profiles
/api/v1/companies/:id/jobs - Get jobs for a specific company
/api/v1/companies/:id/users - Get employees for a specific company
For development without an API, the application uses mock data.

🚢 Deployment
Deploying to AWS Amplify
Create an amplify.yml file in your project root:
```bash
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm install
    build:
      commands:
        - echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production
        - npm run build
  artifacts:
    baseDirectory: frontend/.next
    files:
      - '**/*'
  cache:
    paths:
      - frontend/node_modules/**/*
      - frontend/.next/cache/**/*

 ```     


4. Set up the NEXT_PUBLIC_API_URL environment variable in Amplify Console.

5.  Connect your repository to AWS Amplify.

Deploying to Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.


### Explanation of Changes:
1. **Code Blocks**: Wrapped commands in triple backticks (```) for proper Markdown formatting.
2. **Lists**: Used `-` for unordered lists to make the API endpoints clear.
3. **Headings**: Used `##` for subheadings to maintain hierarchy.

Let me know if you need further adjustments! 😊