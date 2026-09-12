# ✨ Personal Portfolio

A modern, full-stack personal portfolio website built to showcase **projects, qualifications, technical skills, notes, and professional information** through a polished and interactive web experience.

The project follows a **React + Vite frontend** and **Node.js + Express backend** architecture, with protected admin functionality for managing portfolio content dynamically.

## 🚀 Highlights

- 🎨 Modern and responsive portfolio interface
- 📂 Dedicated project listing and project detail pages
- 🎓 Qualifications and education section
- 🖼️ Personal gallery management
- 📝 Notes and individual note detail pages
- 🛠️ Dynamic management of skills, languages, hobbies, profile, education, gallery, notes, and projects
- 🔐 Protected admin area with authentication
- ☁️ Cloudinary integration for media uploads
- 🔑 JWT-based authentication
- 🗄️ MongoDB database integration through Mongoose
- ⚡ Smooth animations and interactive UI elements
- 🌌 Particle effects and 3D visuals for a more immersive experience
- 📱 Responsive design across desktop and mobile devices

## 🧩 Application Structure

### Public Portfolio

Visitors can explore:

- **Home** — personal introduction and portfolio overview
- **Projects** — project collection with individual detail pages
- **Qualifications** — academic and professional background
- **Gallery** — visual content and personal highlights
- **Notes** — articles/notes with dedicated detail pages

### Admin Dashboard

The protected admin area provides content management for:

- Profile information
- Projects
- Education
- Languages
- Skills
- Hobbies
- Gallery
- Notes

This makes the portfolio content maintainable without editing the frontend directly.

## 🏗️ Tech Stack

### Frontend

- **React 19**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **Framer Motion / Motion**
- **GSAP**
- **Three.js**
- **React Three Fiber & Drei**
- **tsParticles**
- **Axios**
- **Lucide React / React Icons**

### Backend

- **Node.js**
- **Express 5**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcryptjs**
- **Cloudinary**
- **Multer**
- **dotenv**
- **Slugify**
- **Groq SDK**

## 📁 Project Structure

```text
Personal-Portfolio/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       │   ├── public/
│       │   └── admin/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── server.js
```

## 🔄 How It Works

The **frontend** handles the public portfolio experience and communicates with the backend through API requests.

The **backend** manages authentication, data operations, media uploads, and portfolio content stored in MongoDB. Protected routes ensure that administrative functionality is only accessible to authenticated users.

The architecture keeps presentation, business logic, authentication, data models, and API routes separated for easier maintenance and future expansion.

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saanisayyad/Personal-Portfolio.git
cd Personal-Portfolio
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
npm run dev
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

### 4. Configure environment variables

Create the required `.env` file in the backend and provide the database, authentication, Cloudinary, and other service credentials used by the application.

> Never commit secrets or production credentials to the repository.

## 🔐 Admin Access

The application includes a protected admin section under `/admin` with authentication and content-management screens. Administrative routes are guarded through a protected-route flow before allowing access to dashboard functionality.

## 🎯 Purpose

This project serves as both a **personal portfolio** and a practical demonstration of full-stack development concepts, including:

- Component-based frontend architecture
- REST-style API integration
- Authentication and authorization
- CRUD-based content management
- Database modeling
- Secure password handling
- Cloud media storage
- Responsive and interactive UI development

## 🌟 Why This Project

Rather than using a static portfolio template, this project is designed as a **content-driven application** where portfolio information can be updated through an administrative interface. This provides a more scalable foundation for adding new projects, notes, qualifications, media, and personal information over time.

## 👨‍💻 Author

**Mohammadsaani Sayyad**

Full-Stack Developer • Data Analyst • Computer Engineer

---

⭐ Built with React, Node.js, MongoDB, and a lot of curiosity.
