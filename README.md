// Hackathon Assignment 

SmartStock

SmartStock is a robust and scalable full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a streamlined and secure platform for administrators to manage product inventories efficiently. Key functionalities include product addition with image uploads (via Cloudinary), stock quantity adjustments, JWT-based authentication, and admin-only protected routes.

---

##  Features

-  **Authentication** (Login / Signup)
-  Admin access protected by middleware
-  **Product Management**
  - Add product with image (via Cloudinary)
  - Update product quantity
  - Paginated product listing
-  Fully responsive UI built with React + TailwindCSS
-  Cloudinary integration for image storage

---

##  Tech Stack

**Frontend:**
- React.js
- Redux Toolkit (User & Theme management)
- TailwindCSS
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- express-fileupload
- Cloudinary SDK
- JSON Web Token (JWT)
- dotenv

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Projectx1.git
cd Projectx1

##  Setup Backend

cd backend
npm install

## create .env file
PORT=8080
MONGO=your_mongo_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

## start backend server

npm start

##  Setup Frontend
cd frontend
npm install


## Start the frontend development server:

npm run dev

 


