# 🧳 JobQuest – Job Search & Filtering Platform

A complete job-search application built using **React**, featuring authentication, job listings, advanced filters, search functionality, job details pages, loader states, failure handling, and protected routes.

This project was **entirely developed by me from scratch** as part of an assignment.

---

## 🔗 Live Demo
Netlify:  https://jobquest-app.netlify.app

---

## 🧪 Test Credentials
Use the following credentials to log in:

- **Username:** `rahul`
- **Password:** `rahul@2021`

*(Default credentials provided by the API service)*

---

## ✨ Features

### 🔒 Authentication
- Secure login using JWT tokens
- Authentication stored in cookies
- Unauthorized users are redirected to login

### 🔍 Job Listings
- Fetches jobs dynamically from API
- Shows company logo, title, rating, location, and package

### 🎯 Advanced Filters
- Filter by employment type (Full-time, Part-time, Internship, Freelance)
- Filter by salary range
- Supports multi-select employment filters

### 🔎 Search
- Search jobs by keywords
- Automatically updates results on typing (debounced search)

### 📌 Job Details Page
- Detailed job description
- Skills list
- “Life at Company” section
- Similar jobs suggestions

### 🚦 API Status Management
- Loader state using `react-loader-spinner`
- Custom error screen for failed API calls
- Retry mechanism

### 🧭 Routing & Navigation
- Implemented using React Router
- Protected routes (requires login)
- Custom 404 Not Found page

---

## 🛠 Tech Stack

### Frontend
- React (Class Components)
- React Router
- JavaScript (ES6+)
- CSS

### Utilities
- `js-cookie` – JWT token handling
- `react-loader-spinner` – loading animations

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── Header
 │    ├── LoginForm
 │    ├── ProfileAndJobFilters
 │    ├── JobCard
 │    ├── JobItemDetails
 │    ├── NotFound
 │    └── Jobs
 ├── App.js
 ├── index.js
 └── index.css
```

## 🚀 API Endpoints Used

**Base URL:** https://apis.ccbp.in

### Endpoints:
- `/login`
- `/jobs?employment_type=...&minimum_package=...&search=...`
- `/jobs/:id`

---

## 🧩 Key Concepts Implemented
- State lifting
- Conditional rendering
- Protected routes (Higher-order component approach)
- API integration & error handling
- Dynamic URL parameters (`/jobs/:id`)
- Efficient state updates using `prevState`
- Reusable UI components

---

## 📸 Screenshots

![Login Page](.public/screenshots/job_login.png)
![Jobs List](./public/screenshots/job_home.png)
![Jobs List](./public/screenshots/jobs.png)
![Jobs List](./public/screenshots/job_details.png)

---

## 🏁 How to Run Locally
```bash
git clone https://github.com/shalini2376/JobQuest
cd JobQuest
npm install
npm start

---

## 🌟 About This Project

This project strengthened my understanding of:

- Clean React architecture
- Designing multi-filter systems
- Handling complex API states
- Building protected routes
- Managing JWT authentication
- Creating reusable components
- Debugging and preparing production builds (Netlify)

