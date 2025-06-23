# Auth Frontend

This is the frontend of an authentication system built using **React (Vite)**. It includes secure login functionality with **JWT-based authentication**, **CAPTCHA verification**, and integration with a backend API.

## Features

-  User login with username & password
-  JWT token-based authentication
-  CAPTCHA verification to prevent bots
-  Token storage and route protection
-  Built with **Vite**, **React**, **Tailwind CSS**, and **Axios**
-  API Integration with backend auth system

## Tech Stack

- React + Vite
- Tailwind CSS
- Axios
- JWT
- Google reCAPTCHA (or custom CAPTCHA)
- React Router DOM

## 📁 Project Structure
Frontend/
├── public/
│ ├── _redirects
│ ├── image.png 
│ └── logo.png
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Header.jsx
│ │ └── ProtectedRoute.jsx
│ ├── pages/
│ │ ├── AdminPanel.jsx
│ │ ├── Login.jsx
│ │ └── SharePage.jsx
│ ├── utils/
│ └── main.jsx
├── .env
├── .gitignore
├── index.css
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── vite.config.js
├── vercel.json
└── ReadMe.md
