# Lost and Found Reporting System (LFRS)

A full-stack web application built to streamline the reporting and management of lost items in Sri Lanka. Citizens can easily submit lost item reports, while police officers manage and track reports efficiently through a secure dashboard.

---

## Project Structure

```
LFRS/
├── Backend/       # Express.js + TypeScript + MongoDB backend
├── Frontend/      # React + Vite frontend
├── README.md      # Project overview and setup instructions
```

---

##  Quick Start

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB

---

## Backend Setup (TypeScript)

1. Navigate to the backend folder:

   ```bash
   cd Backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Fill  `.env` file in the `Backend/` directory 

  
4. Run the development server:

   ```bash
   npm run dev
   ```

   The server will start on: `http://localhost:8000`

5. To build the backend:

   ```bash
   npm run build
   ```

6. To run the production build:

   ```bash
   npm start
   ```

**Backend Scripts (in `package.json`):**

```json
 "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "npm install && tsc",
    "start": "node ./dist/index.js"
  }
```

---

## Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd Frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Fill `.env` file in the `Frontend/` directory

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will run at: `http://localhost:5173`

---

## Tech Stack

### Frontend

* React + Vite
* JavaScript
* Tailwind CSS
* Shadcn
* Redux Toolkit (RTK Query)
* Clerk (Authentication)

### 🔹 Backend

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* Resend
* Vonage

---

## Key Features

* Submit lost and fount item reports with images
* Police dashboard for managing reports
* Clerk-based secure authentication
* Report filtering, status updates & search
* RESTful API integration

---

## License

This project is for academic and educational purposes only. Not intended for commercial use.

---

## Contact

Feel free to reach out via GitHub issues or email if you'd like to contribute or collaborate.
