# Placement Intelligence Dashboard

## Overview

Placement Intelligence Dashboard is a student-focused web application designed to help engineering students evaluate their placement readiness and identify areas for improvement.

The platform provides career guidance, company eligibility analysis, DSA progress tracking, and resume evaluation in a single dashboard.

---

## Features

### Placement Readiness Calculator

- Calculates placement readiness score based on:
  - CGPA
  - DSA Progress
  - Projects

### Company Eligibility Checker

- Checks company eligibility using:
  - CGPA
  - Active Backlogs

### Career Path Analyzer

Supports:

- Software Engineer
- Java Backend Developer
- Data Analyst
- Data Scientist
- Frontend Developer

Provides missing skill recommendations.

### DSA Progress Tracker

Tracks:

- Easy Problems
- Medium Problems
- Hard Problems

Generates skill level classification.

### Resume Strength Analyzer

Evaluates:

- Projects
- Internships
- Certifications
- DSA Progress

Provides resume score and readiness status.

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Version

- Version 2.0

---

## Future Enhancements

- Responsive UI Improvements
- Company Database Integration
- Resume Upload & Analysis
- Student Authentication
- Spring Boot Backend
- MySQL Database
- REST APIs
- AI-based Recommendations

---

# PlacementIQ Development Status

## Vision

PlacementIQ is being developed as a flagship full-stack MERN application that demonstrates strong software engineering principles, real-world relevance, and thoughtful architectural decisions.

The objective is to build a production-oriented placement intelligence platform that remains valuable even without advanced analytics or AI features. Future intelligence capabilities will enhance the platform rather than define its purpose.

---

## Current Development Philosophy

The project is being designed with the following priorities:

- Resume impact
- Technical depth
- Real-world relevance
- Quality over quantity
- Interview discussion value
- Scalability and maintainability

Instead of building multiple unrelated projects, PlacementIQ is intended to showcase the ability to design, develop, and evolve a comprehensive software system over time.

---

## Current Architecture

```
Frontend
    ↓
JavaScript fetch()
    ↓
Express Backend
    ↓
In-Memory Storage (Development Phase)
```

---

## Backend Progress

### Technology Stack

- Node.js
- Express.js
- REST APIs
- JavaScript (ES6+)
- Git & GitHub

### Implemented Features

#### User Management APIs

| Method | Endpoint     | Purpose                           |
| ------ | ------------ | --------------------------------- |
| POST   | `/register`  | Register a new user               |
| GET    | `/users`     | Retrieve all users                |
| GET    | `/users/:id` | Retrieve a specific user          |
| PUT    | `/users/:id` | Replace a user's details          |
| PATCH  | `/users/:id` | Partially update a user's details |
| DELETE | `/users/:id` | Delete a user                     |

### Concepts Implemented

- CRUD Operations
- Route Parameters
- Request Validation
- Status Codes
- Frontend-to-Backend Communication
- CORS Handling
- JSON Request and Response Processing
- RESTful API Design

---

## Development Roadmap

### Phase 1 – Engineering Foundations (In Progress)

- [x] Frontend Prototype
- [x] Authentication UI
- [x] Express Server Setup
- [x] REST API Development
- [x] CRUD Operations
- [x] Frontend ↔ Backend Communication
- [ ] Frontend Integration for Remaining Workflows
- [ ] Persistent Database Integration (MongoDB)

### Phase 2 – Production Readiness

- [ ] User Authentication & Authorization
- [ ] JWT-based Session Management
- [ ] Protected Routes
- [ ] Input Sanitization and Enhanced Validation
- [ ] Error Handling Improvements
- [ ] Deployment Preparation

### Phase 3 – Intelligence Enhancements

- [ ] Placement Readiness Analytics
- [ ] Personalized Preparation Insights
- [ ] Skill Gap Identification
- [ ] Decision-Support Features

---

## Immediate Development Priorities

The next phase of PlacementIQ focuses on strengthening the full-stack foundation before introducing advanced capabilities.

### Upcoming Milestones

- [ ] Complete backend-based login flow
- [ ] Remove authentication dependency on localStorage
- [ ] Integrate MongoDB for persistent data storage
- [ ] Refactor frontend to consume backend APIs consistently
- [ ] Introduce production-ready authentication mechanisms
- [ ] Improve overall application architecture and maintainability

This roadmap reflects the project's philosophy of prioritizing engineering quality, real-world relevance, and interview discussion value over feature quantity.

## Long-Term Goal

To develop PlacementIQ into a scalable placement intelligence platform that helps students assess their preparation, identify improvement areas, and make informed decisions throughout their placement journey while simultaneously demonstrating strong full-stack engineering capabilities.
