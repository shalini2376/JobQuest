## JobQuest – Job Search & Filtering Platform

A complete job-search application built using React, featuring authentication, job listings, advanced filters, search functionality, job details page, loader states, failure handling, and protected routes.

This project was entirely developed by me from scratch as part of an assignment.

---

## 🔗 Live Demo

Frontend: https://jobquest-app.netlify.app

---

## 🧪 Test Credentials

Use the following credentials to access the application:

Username: rahul
Password: rahul@2021

(Default credentials provided by API service)

---
## ✨ Features

### 🔒 Authentication

- Secure login using JWT tokens
- Authentication stored using cookies
- Users redirected to login on unauthorized access

### 🔍 Job Listings

- Fetch jobs dynamically from backend API
- Displays company logo, title, rating, location, package

### 🎯 Advanced Filters

- Employment type filter (Full-time, Part-time, Internship, Freelance)
- Salary range filter
- Multi-select handling for employment filters

### 🔎 Search

- Search jobs by title or keywords

- Debounced search updates job list dynamically

### 📌 Job Details Page

- Complete job description
- Skills list
- Life at company section
- Similar jobs suggestions

### 🚦 API Status Management

- Loader UI (loading state)
- Customized error/failure UI
- Retry mechanism for failed API calls
  
### 🧭 Routing & Navigation

- Implemented using React Router
- Protected routes (cannot access jobs without login)
- Not Found page

---

## 🛠 Tech Stack

- Frontend
- React (Class Components)
- React Router
- JavaScript (ES6+)
- CSS
- Utilities
- js-cookie — manage JWT tokens
- react-loader-spinner — loading animations'

---

## 📁 Project Structure
src/
 ├── components/
 │    ├── LoginForm
 │    ├── Header
 │    ├── ProfileAndJobFilters
 │    ├── JobCard
 │    ├── JobItemDetails
 │    ├── NotFound
 │    └── Jobs   <-- Advanced filtering logic
 ├── App.js
 └── index.js
 
---

## 🚀 API Endpoints Used

Base URL: https://apis.ccbp.in

Endpoints:

- /login

- /jobs?employment_type=...&minimum_package=...&search=...

- /jobs/:id

---

## 🧩 Key Concepts Implemented

- State lifting
- Conditional rendering
- Higher-order components for route protection
- API integration + error handling
- Mapping + filtering + UI rendering
- Dynamic URL parameters (/jobs/:id)
- Efficient state updates using prevState

---

## 📸 Screenshots

![Login Page](./public/screenshots/login.png)
![Jobs List](./public/screenshots/home.png)
![Jobs List](./public/screenshots/jobs.png)
![Jobs List](./public/screenshots/job-detail.png)

---

## 🏁 How to Run Locally

git clone https://github.com/shalini2376/JobQuest
cd JobQuest
npm install
npm start

---

## 🌟 About This Project

- This project improved my understanding of:
- Writing clean React architecture
- Managing complex filters
- Handling multiple API states
- Implementing protected routes
- Writing reusable UI components
- Working with JWT + cookies
- Debugging and fixing build issues for production (Netlify deployment)
