[Description]
# Folder Structure
```bash
|---src
    |---index.ts
|---gitignore
|---package.json
|---tconfig.son
```
# Dependencies
* Node.js
* TypeScript
* Express
* ts-node-dev
# Getting Started
Before you begin, ensure you have the following installed on your machine:

* Node.js (v14 or later)
* npm (Node Package Manager, included with Node.js)
* Git
## Setup Instructions
### 1. Clone the Repository
First, clone the repository to your local machine using Git.
```bash
git clone https://github.com/staq001/[app-name].git
cd [app-name]
```
### 2. Install Dependencies
Navigate to the project directory and install the required dependencies.
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root directory of the project and add your environment-specific variables. You can use the provided .env.example file as a reference.
```bash
cp .env.example .env
```
Edit the .env file to match your environment configuration.

### 4. Run the Development Server
Start the development server with the following command. This will also watch for any changes in your code and automatically restart the server.
```bash
npm start
```
### 5. Verify the Setup
Open your browser and navigate to http://localhost:3000 to verify that the application is running correctly.

# API Endpoints
Every API endpoint begins with:
```bash
/api/v1
```
# Others
## Technical Choices
Used all of these technologies for the following reasons.
*  TypeScript for type safety and because it meshes well with Express and MongoDB
*  Express.js because it makes building, testing, and scaling API routes straightforward.
*  Rate Limiter because protecting the API from abuse and overuse is a must.
*  Helmet because every app should have basic HTTP security headers by default.
*  Logger for structured logs with levels (info, error, debug) make debugging and monitoring painless.
*  Gemini AI because, even in free mode, it allows around 30 queries/day, which is enough for testing or lightweight usage.
*  MongoDB because it's schema-flexible and adapts as the data model evolves.
*  MongoDB because it stores data in JSON-like documents, and it scales easily and supports complex queries.

## Approach to Stretch Goal
I picked and implemented the second option of the stretch goal — AI-Powered Summary Generation. It was quite straightforward, I would say. All I did was query the Google Gemini AI API, asking it to generate a detailed yet concise summary based on the article's title.

## Next steps
Users could definitely use authentication for verification, especially in a real-world scenario. Additionally, the schemas of both models could be expanded and padded with stricter validations to ensure the data collected is accurate and well-documented. Lastly, tests are an essential part of software engineering, so it would be beneficial to write robust test suites for each implemented service.
