# B6A2 Vehicle Rental System

**Live API URL:** [Live Demo](https://vehicle-rental-system-delta.vercel.app/)

---

## 🎯 Project Overview

B6A2 Vehicle Rental System is a backend RESTful API for a vehicle rental management platform.  
It allows seamless management of vehicles, customers, and bookings, supporting admin and customer roles with secure authentication and authorization.

**Key Capabilities:**

- **Vehicles:** Manage inventory, track availability, add/update/remove vehicles.
- **Customers:** Manage user accounts and profiles.
- **Bookings:** Handle vehicle rentals, returns, and rental cost calculations.
- **Authentication:** Secure, role-based access (Admin, Customer) via JWT.

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js** (Web Framework)
- **PostgreSQL** ([Neon Serverless Postgres](https://neon.tech/))
- **bcrypt** (Password hashing)
- **jsonwebtoken** (JWT authentication)

---

## 📁 Project Structure

The repository follows a modular pattern for scalability and maintainability:

```
B6A2-Vehicle-Rental-System/
├─ src/
│  ├─ config/              # Database & environment config
│  ├─ module/
│  │  ├─ vehicles/         # Vehicle-related logic & API (controller, service, routes)
│  │  ├─ users/            # User management (controller, service, routes)
│  │  ├─ bookings/         # Booking logic (controller, service, routes)
│  │  ├─ auth/             # Authentication & authorization logic
│  ├─ middleware/          # Authentication, error handling, etc.
│  ├─ helpers/             # Utility functions
│  ├─ app.ts
│  ├─ server.ts
├─ package.json
├─ tsconfig.json
├─ .env.example
```

---

## ⚡ Setup & Usage

### Prerequisites

- Node.js
- TypeScript
- Git
- PostgreSQL ([Neon Postgres](https://neon.tech/)

### Getting Started

1. **Create a project on Neon:**

   - Go to [Neon Postgres](https://neon.tech/).
   - Create a new project.
   - Copy your database connection string.

2. **Clone the repo:**

   ```bash
   git clone https://github.com/ashrafulatif/B6A2-Vehicle-Rental-System.git
   cd B6A2-Vehicle-Rental-System
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**  
   Create a `.env` file in the root directory and add:

   ```
   DATABASE_URL=
   JWT_SECRET=
   PORT=
   ```

   > **Note:**  
   > Refer to [`src/config/config.ts`](src/config/config.ts) in this project to see how these environment variables are loaded and used.  
   > Ensure that your `.env` values match the expected shape required for database and authentication.

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Now the API will be available at `http://localhost:5000`.

---

## 📚 API Endpoints

### Authentication

- **POST** `/api/v1/auth/register` — Register a new user
- **POST** `/api/v1/auth/login` — Login and receive a JWT token

---

### Vehicles

- **POST** `/api/v1/vehicles`  
  _Admin only_  
  Add new vehicle with name, type, registration, daily rent price, and availability status

- **GET** `/api/v1/vehicles`  
  _Public_  
  List all vehicles

- **GET** `/api/v1/vehicles/:vehicleId`  
  _Public_  
  Get specific vehicle details

- **PUT** `/api/v1/vehicles/:vehicleId`  
  _Admin only_  
  Update vehicle details, daily rent price, or availability status

- **DELETE** `/api/v1/vehicles/:vehicleId`  
  _Admin only_  
  Delete vehicle (only if no active bookings exist)

---

### Users

- **GET** `/api/v1/users`  
  _Admin only_  
  View all users

- **PUT** `/api/v1/users/:userId`  
  _Admin or Own user_

  - Admin: Update any user's role or details
  - Customer: Update own profile only

- **DELETE** `/api/v1/users/:userId`  
  _Admin only_  
  Delete user (only if no active bookings exist)

---

### Bookings

- **POST** `/api/v1/bookings`  
  _Customer or Admin_  
  Create booking with start/end dates

  - Validates vehicle availability
  - Calculates total price (daily rate × duration)
  - Updates vehicle status to "booked"

- **GET** `/api/v1/bookings`  
  _Role-based_

  - Admin: View all bookings
  - Customer: View own bookings only

- **PUT** `/api/v1/bookings/:bookingId`  
  _Role-based_
  - Customer: Cancel booking (before start date only)
  - Admin: Mark as "returned" (updates vehicle to "available")
  - System: Auto-mark as "returned" when period ends

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 🙋 Contact

[GitHub: ashrafulatif](https://github.com/ashrafulatif)

---
