# AWS Route 53 Clone

This is a full-stack clone of AWS Route 53, featuring a responsive UI mimicking the AWS console and a backend to manage Hosted Zones and DNS Records.

## Architecture Overview

*   **Frontend**: Built with **Next.js 16** (App Router), React 19, TypeScript, and **TailwindCSS**. It utilizes **Cloudscape Design Components** (the official AWS UI library) to provide an authentic, realistic AWS look and feel.
*   **Backend**: Powered by **FastAPI** (Python), using **SQLAlchemy** as the ORM, and **SQLite** for a lightweight, file-based database that requires zero configuration.
*   **Authentication**: Secure JWT-based authentication implemented with `python-jose` and `passlib` (bcrypt). A default admin user (`admin@example.com` / `password123`) is automatically seeded into the database on application startup.

## Setup Instructions

### Prerequisites
*   Node.js (v20+)
*   Python (3.10+)
*   npm or yarn

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the UI at `http://localhost:3000`.

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   *   **macOS/Linux**: `source venv/bin/activate`
   *   **Windows**: `venv\Scripts\activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```
6. Access the API documentation at `http://localhost:8000/docs`.

## Database Schema

The backend uses SQLite with the following SQLAlchemy entities:

### 1. Users (`users`)
*   `id` (Integer, Primary Key)
*   `username` (String, Unique)
*   `email` (String, Unique)
*   `hashed_password` (String)
*   `created_at` (DateTime)

### 2. Hosted Zones (`hosted_zones`)
*   `id` (Integer, Primary Key)
*   `zone_id` (String, Unique) - Route53 style ID (e.g. `Z04D3Q3...`)
*   `domain_name` (String)
*   `description` (String, Nullable)
*   `zone_type` (String, default: `PUBLIC`)
*   `record_count` (Integer)
*   `created_at` (DateTime)
*   `updated_at` (DateTime)

### 3. DNS Records (`dns_records`)
*   `id` (Integer, Primary Key)
*   `hosted_zone_id` (String, ForeignKey to `hosted_zones.zone_id`)
*   `record_id` (String, Unique)
*   `record_name` (String)
*   `record_type` (String) - e.g., A, AAAA, CNAME, MX, TXT
*   `routing_policy` (String, default: `Simple`)
*   `set_identifier` (String, Nullable)
*   `alias` (Boolean, default: `False`)
*   `value` (String)
*   `ttl` (Integer, Nullable)
*   `health_check_id` (String, Nullable)
*   `evaluate_target_health` (Boolean, default: `False`)
*   `created_at` (DateTime)
*   `updated_at` (DateTime)

## API Overview

The backend provides a RESTful API. Interactive documentation is available via Swagger UI at `/docs` when the backend is running.

### Authentication
*   `POST /api/auth/login` - Authenticate a user and receive a JWT access token.
*   `POST /api/auth/register` - Register a new user account.

### Hosted Zones
*   `GET /api/hosted-zones` - List all hosted zones.
*   `POST /api/hosted-zones` - Create a new hosted zone.
*   `GET /api/hosted-zones/{zone_id}` - Get details of a specific hosted zone.
*   `PUT /api/hosted-zones/{zone_id}` - Update a hosted zone's metadata (e.g. description).
*   `DELETE /api/hosted-zones/{zone_id}` - Delete a hosted zone and all of its associated DNS records.

### DNS Records
*   `GET /api/hosted-zones/{zone_id}/records` - List all DNS records belonging to a specific hosted zone.
*   `POST /api/hosted-zones/{zone_id}/records` - Create a new DNS record.
*   `PUT /api/hosted-zones/{zone_id}/records/{record_id}` - Update an existing DNS record.
*   `DELETE /api/hosted-zones/{zone_id}/records/{record_id}` - Delete a specific DNS record.
