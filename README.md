<<<<<<< HEAD
## Inventory Management System (IMS)

A full-stack web application built with the **MERN stack** that allows admins to manage product inventories seamlessly. Features include product creation with image uploads (via Cloudinary), quantity updates, pagination, authentication, and protected admin access.

---

##  Features

-  **Authentication** (Login / Signup)
-  Admin access protected by middleware
-  **Product Management**
  - Add product with image (via Cloudinary)
  - Update product quantity
  - Paginated product listing
-  **Dark / Light Theme Toggle**
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
git clone https://github.com/your-username/ims-project.git
cd ims-project

##  Setup Backend

cd backend
npm install

## create .env file
PORT=8080
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
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

 

=======
# Projectx1
>>>>>>> 1a9596570080fd3e8b634dcecd4a262f00d4e919
