# 🚇 MetroFlow

MetroFlow is a full-stack MERN application that simulates a real-world metro ticketing system.  
Users can book metro tickets and receive QR codes, while admins manage stations, fares, and validate tickets through scanning.

The project focuses on **clean backend logic, role-based access, real workflows**, and production-ready practices like Docker and cloud deployment.

---

## 🌐 Live Demo

- **Frontend:** https://metroflow-1.onrender.com  
- **Backend API:** https://metroflow-kjnk.onrender.com  

---

## 🧩 Core Features

### 👤 User
- Sign up & login (JWT authentication)
- Preview fare before booking
- Book metro tickets
- Receive QR code for each ticket
- View complete ticket history (active, used, expired)
- Submit feedback with category selection

### 🛠️ Admin
- Scan and validate tickets via QR code
- Prevent reuse of used or expired tickets
- Add / remove metro stations
- Update distances and fare configuration
- Read and manage user feedback

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control:
  - **Users:** booking, history, feedback
  - **Admins:** scanning, configuration
- Protected routes using middleware

---

## 🧠 Ticket Lifecycle Logic

Each ticket follows a strict state flow:

ACTIVE → USED / EXPIRED


- Only **one active ticket per user** is allowed at a time
- Tickets automatically expire after a fixed duration
- QR scan marks a ticket as `USED` with `usedAt` timestamp
- Expired tickets are blocked from scanning

---

## 🏗️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- QR Code Renderer

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### DevOps
- Docker (backend containerized)
- Render (cloud deployment)

---

## 📦 Project Structure

metrio/
│
├── frontend/
│ ├── src/
│ └── public/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── utils/
│ ├── Dockerfile
│ └── dockerignore
│
└── README.md


---

## 🐳 Docker Support

- Backend is fully dockerized
- Environment-agnostic setup
- Ready for container-based deployments

Example:
```bash
docker build -t metroflow-backend .
docker run -p 5000:5000 metroflow-backend

💬 Feedback System

Authenticated users can submit feedback
Feedback is categorized (issue, suggestion, other)
Admins can view and respond to feedback
Designed to reflect real user-product interaction

🎯 Why This Project Matters

This project was built with real-world constraints in mind:
No unrealistic features
Clear separation of responsibilities
Production-style backend logic
Scalable structure for future versions

MetroFlow demonstrates:

Backend-first thinking
API design clarity
State management discipline

Deployment & DevOps fundamentals

👨‍💻 Author
Aditya Chauhan
GitHub: https://github.com/adityachauhan1-in
LinkedIn: https://www.linkedin.com/in/adityachauhan00/
Email: adityachauhan.ind1@gmail.com