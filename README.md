# React + Spring Boot  Microservices Project

This is a training project that demonstrates a microservices architecture using Spring Boot for backend services and React for the frontend. The application simulates a basic product ordering system with three core services:

- **Product Service**
- **Inventory Service**
- **Order Service**

## 🧩 Technologies Used

### Backend (Microservices)
- Java 21.0.6
- Spring Boot 3.5.3
- Spring Data JPA
- Spring Web
- MySQL
- Maven

### Frontend
- React JS (with functional components)
- Axios for HTTP requests
- React Router

## 🛠 Microservices Overview

| Service   | Port | Description |
|-----------|------|-------------|
| Inventory | 8080 | Manages product stock and availability. |
| Order   | 8081 | Places orders based on product availability. |
| Product     | 8082 | Manages product data like name, price, description, etc. |

Each service runs independently and communicates through REST APIs.

## 🚀 Running the Project

### Prerequisites
- Java JDK 21
- Node.js & npm
- Git
- MySQL
- IDE: IntelliJ / VSCode

