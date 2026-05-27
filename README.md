# Portfolio Backend

## Overview
This is the backend service for a portfolio application built with modern web technologies. The backend is designed to handle API requests, manage data, and serve as the core server infrastructure for the portfolio platform.

## Description
The portfolio backend is a robust server application that provides all the necessary endpoints and business logic to support a dynamic portfolio website. It manages user data, project information, skills, experience, and other portfolio-related content. The backend is built with scalability, performance, and maintainability in mind.

### Key Features
- RESTful API endpoints for portfolio data management
- Database integration for persistent data storage
- Authentication and authorization mechanisms
- Error handling and validation
- CORS support for cross-origin requests
- Environment-based configuration

## Deployment
This backend is connected to **Render** for cloud hosting and deployment. The application is automatically deployed whenever changes are pushed to the main branch, ensuring the portfolio stays up-to-date with the latest updates.

### Deployment Details
- **Hosting Platform**: Render
- **Auto-deploy**: Enabled on main branch
- **Environment**: Production-ready configuration

## Getting Started
To run this backend locally:

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server

Method Route            What it does
GET     /               Health check
GET     /about          Your basic info
GET     /skills         Your skills list
POST    /contact        Sends contact email
GET     /visitors       Get visitor count
POST    /visitors       Increment visitor count
GET     /testimonials   Fetch all testimonials
POST    /testimonials   Add a new testimonial

## API Endpoints
All endpoints are documented and available for integration with the portfolio frontend application.