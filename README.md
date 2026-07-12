# Amazon Route 53 Clone
*May take while to load at start due to cold start of vercel and render*

A full-stack clone of the **AWS Route 53** DNS management console, built with **Next.js 16**, **FastAPI**, and **SQLite**. This application replicates the core hosted-zone and DNS-record management workflows of the real AWS console, complete with multi-tenant authentication, automatic SOA/NS record generation, and the Cloudscape Design System UI.

> **Live Demo:** Frontend on Vercel · Backend on Render  
> Default credentials: `admin@example.com` / `password123`

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [License](#license)

---

## Features

| Category | Details |
|---|---|
| **Authentication** | JWT-based signup/login with bcrypt password hashing. 7-day token expiry. Default admin seeded on startup. |
| **Hosted Zones** | Create, list, view, update, and delete hosted zones. Each zone auto-generates a unique Zone ID (`Z…`), four NS records, and an SOA record — mirroring real Route 53 behavior. |
| **DNS Records** | Full CRUD for A, AAAA, CNAME, MX, TXT, NS, SOA, SRV, CAA, and PTR record types. Support for routing policies, alias records, TTL, health checks, and set identifiers. |
| **Tenant Isolation** | Every user sees only their own hosted zones. Domain uniqueness is enforced per-user, not globally. |
| **UI Fidelity** | Built with AWS Cloudscape Design System (dark mode). The landing page, navigation, breadcrumbs, tables, forms, split panels, and modals match the real AWS console. |
| **Responsive** | Mobile-first responsive layout. Stacks gracefully on small screens without breaking the desktop experience. |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                        Frontend                          │
│              Next.js 16 (App Router, Turbopack)          │
│         Cloudscape Design System · Tailwind CSS          │
│                                                          │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌─────────┐ │
│  │ Auth    │  │ Hosted   │  │ DNS Record│  │ Layout  │ │
│  │ Context │  │ Zones    │  │ Editor    │  │ Shell   │ │
│  │         │  │ Context  │  │           │  │ + Nav   │ │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘  └─────────┘ │
│       │            │              │                      │
│       └────────────┴──────────────┘                      │
│                    │                                     │
│            Axios HTTP Client                             │
│        (JWT in Authorization header)                     │
└────────────────────┬─────────────────────────────────────┘
                     │  REST / JSON
                     ▼
┌──────────────────────────────────────────────────────────┐
│                        Backend                           │
│                 FastAPI (Python 3.10+)                    │
│                                                          │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │ API      │  │ Services     │  │ Core               │ │
│  │ Routers  │  │ (Business    │  │ (Config, Security, │ │
│  │          │◄─┤  Logic)      │  │  JWT, bcrypt)      │ │
│  └──────────┘  └──────┬───────┘  └────────────────────┘ │
│                       │                                  │
│               SQLAlchemy ORM                             │
│                       │                                  │
│              ┌────────▼────────┐                         │
│              │   SQLite DB     │                         │
│              │  (route53.db)   │                         │
│              └─────────────────┘                         │
└──────────────────────────────────────────────────────────┘
```

### Request Lifecycle

1. The user interacts with the Next.js frontend.
2. The `AuthContext` checks for a JWT in `localStorage`. If present, it verifies the session via `GET /api/auth/me`. If absent, the user is redirected to `/login`.
3. Authenticated requests attach the JWT as a `Bearer` token via an Axios request interceptor.
4. FastAPI receives the request, validates the JWT in the `get_current_user` dependency, and routes it to the appropriate service layer.
5. The service layer performs business logic (domain validation, zone ID generation, SOA/NS seeding) and persists data through SQLAlchemy.
6. A standardized `APIResponse` envelope (`{ success, message, data }`) is returned to the frontend.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework with file-based routing, Turbopack bundler |
| **React 19** | UI library |
| **Cloudscape Design System** | AWS-native component library (tables, forms, navigation, modals) |
| **Tailwind CSS 4** | Utility-first responsive styling |
| **Axios** | HTTP client with interceptors for JWT and 401 handling |
| **React Hook Form + Zod** | Form state management and schema validation |
| **Framer Motion** | Animations |
| **Sonner** | Toast notifications |

### Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | Async-capable Python web framework with auto-generated OpenAPI docs |
| **SQLAlchemy 2.0** | ORM for database modeling and queries |
| **Alembic** | Database schema migrations |
| **python-jose** | JWT token encoding/decoding |
| **bcrypt** | Password hashing |
| **Pydantic v2** | Request/response schema validation |
| **SQLite** | Lightweight embedded database (file: `route53.db`) |
| **Uvicorn** | ASGI server |

---

## Project Structure

```
route53-clone/
├── backend/
│   ├── app/
│   │   ├── api/                  # Route handlers
│   │   │   ├── auth.py           #   POST /signup, /login, /logout, GET /me
│   │   │   ├── hosted_zones.py   #   CRUD /api/hosted-zones
│   │   │   └── dns_records.py    #   CRUD /api/hosted-zones/:id/records
│   │   ├── core/
│   │   │   ├── config.py         # Settings (SECRET_KEY, DB URL, token expiry)
│   │   │   └── security.py       # JWT creation, bcrypt password hashing
│   │   ├── models/               # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   ├── hosted_zone.py
│   │   │   └── dns_record.py
│   │   ├── schemas/              # Pydantic request/response schemas
│   │   │   ├── auth.py
│   │   │   ├── hosted_zone.py
│   │   │   └── dns_record.py
│   │   ├── services/             # Business logic layer
│   │   │   ├── auth_service.py   #   Default admin seeding
│   │   │   ├── hosted_zone_service.py
│   │   │   └── dns_record_service.py
│   │   ├── database.py           # Engine + SessionLocal factory
│   │   ├── dependencies.py       # get_db, get_current_user (JWT guard)
│   │   └── main.py               # FastAPI app, CORS, routers, startup
│   ├── alembic/                  # Migration scripts
│   ├── requirements.txt
│   └── render.yaml               # Render deployment config
│
├── frontend/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Landing page (hero + products + sidebar)
│   │   ├── layout.tsx            # Root layout (AuthProvider, dark mode)
│   │   ├── login/                # Login page
│   │   ├── signup/               # Signup page
│   │   ├── dashboard/            # Dashboard overview
│   │   ├── hosted-zones/
│   │   │   ├── page.tsx          # Hosted zones table
│   │   │   ├── new/              # Create hosted zone form
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Zone detail + records table
│   │   │       ├── edit/         # Edit zone
│   │   │       └── create-record/# Create DNS record
│   │   └── get-started/          # Getting started page
│   ├── components/
│   │   ├── auth/                 # LoginForm, SignupForm
│   │   ├── layout/               # AppShell, TopNav, Sidebar, Footer
│   │   ├── hosted-zone/          # Table, Inspector, DeleteModal, TagEditor
│   │   ├── dns-record/           # RecordsTable, RecordEditor, RecordForm, …
│   │   └── navigation/           # Side navigation config
│   ├── contexts/                 # AuthContext, HostedZonesContext
│   ├── services/                 # API service wrappers (auth, zones, records)
│   ├── lib/                      # Axios client, token helpers
│   ├── types/                    # TypeScript type definitions
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/route53-clone.git
cd route53-clone
```

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# (Optional) Set environment variables
export SECRET_KEY="your-secret-key-here"

# Start the development server
uvicorn app.main:app --host 0.0.0.0 --reload
```

The backend starts at **http://localhost:8000**. Interactive API docs are available at **http://localhost:8000/docs**.

> On first startup, a default admin user is seeded automatically:  
> Email: `admin@example.com` · Password: `password123`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure the API URL
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local

# Start the development server
npm run dev
```

The frontend starts at **http://localhost:3000**.

### 4. Verify

1. Open http://localhost:3000 in your browser.
2. You should see a loading spinner, then be redirected to the login page.
3. Sign in with `admin@example.com` / `password123` (or use the **Autofill** button).
4. After login, you'll land on the Route 53 dashboard.

---

## Database Schema

The application uses **SQLite** with **SQLAlchemy ORM**. Three tables form the data model:

### Entity Relationship Diagram

```
┌──────────────┐       1:N       ┌──────────────────┐       1:N       ┌──────────────────┐
│    users     │ ──────────────► │   hosted_zones   │ ──────────────► │   dns_records    │
└──────────────┘                 └──────────────────┘                 └──────────────────┘
```

### `users`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTO | Primary key |
| `username` | VARCHAR | UNIQUE, NOT NULL | Display name |
| `email` | VARCHAR | UNIQUE, NOT NULL | Login identifier |
| `hashed_password` | VARCHAR | NOT NULL | bcrypt hash |
| `created_at` | DATETIME | DEFAULT now() | Account creation timestamp |

### `hosted_zones`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTO | Primary key |
| `user_id` | INTEGER | FK → `users.id`, NOT NULL | Owner (tenant isolation) |
| `zone_id` | VARCHAR | UNIQUE, NOT NULL | AWS-style zone ID (e.g., `Z1A2B3C4D5E6F7`) |
| `domain_name` | VARCHAR | NOT NULL | Domain (e.g., `example.com`) |
| `description` | VARCHAR | NULLABLE | Optional description |
| `zone_type` | VARCHAR | NOT NULL, DEFAULT `PUBLIC` | `PUBLIC` or `PRIVATE` |
| `record_count` | INTEGER | DEFAULT `0` | Denormalized record count |
| `created_at` | DATETIME | DEFAULT now() | Creation timestamp |
| `updated_at` | DATETIME | DEFAULT now(), ON UPDATE | Last modification timestamp |

### `dns_records`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PK, AUTO | Primary key |
| `hosted_zone_id` | VARCHAR | FK → `hosted_zones.zone_id`, CASCADE | Parent zone reference |
| `record_id` | VARCHAR | UNIQUE, DEFAULT uuid4 | Unique record identifier |
| `record_name` | VARCHAR | NOT NULL | FQDN (e.g., `api.example.com`) |
| `record_type` | VARCHAR | NOT NULL | `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`, `SOA`, `SRV`, `CAA`, `PTR` |
| `routing_policy` | VARCHAR | NOT NULL, DEFAULT `Simple` | `Simple`, `Weighted`, `Latency`, `Failover`, `Geolocation` |
| `set_identifier` | VARCHAR | NULLABLE | Identifier for weighted/failover policies |
| `alias` | BOOLEAN | DEFAULT `false` | Whether this is an alias record |
| `value` | VARCHAR | NOT NULL | Record value(s), newline-separated for multi-value |
| `ttl` | INTEGER | NULLABLE | Time-to-live in seconds (null for alias records) |
| `health_check_id` | VARCHAR | NULLABLE | Associated health check |
| `evaluate_target_health` | BOOLEAN | DEFAULT `false` | Alias health evaluation flag |
| `created_at` | DATETIME | DEFAULT now() | Creation timestamp |
| `updated_at` | DATETIME | DEFAULT now(), ON UPDATE | Last modification timestamp |

---

## API Overview

All endpoints return a standardized envelope:

```json
{
  "success": true,
  "message": "Descriptive message",
  "data": { ... }
}
```

Base URL: `http://localhost:8000`

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | No | Create a new account. Returns JWT + user object. |
| `POST` | `/api/auth/login` | No | Authenticate. Returns JWT. |
| `POST` | `/api/auth/logout` | No | Logout (client-side token removal). |
| `GET` | `/api/auth/me` | Bearer | Get the current authenticated user's profile. |

**Signup Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "token_type": "bearer"
  }
}
```

---

### Hosted Zones

All hosted zone endpoints require a `Bearer` token in the `Authorization` header. Users can only access their own zones.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/hosted-zones` | List all hosted zones for the authenticated user. |
| `POST` | `/api/hosted-zones` | Create a new hosted zone. Auto-generates Zone ID, SOA, and NS records. |
| `GET` | `/api/hosted-zones/{id}` | Get a specific hosted zone by its database ID. |
| `PUT` | `/api/hosted-zones/{id}` | Update a hosted zone (currently: description only). |
| `DELETE` | `/api/hosted-zones/{id}` | Delete a hosted zone and all associated DNS records (cascade). |

**Create Hosted Zone Request:**
```json
{
  "domain_name": "example.com",
  "description": "Production environment",
  "zone_type": "PUBLIC"
}
```

**Create Hosted Zone Response:**
```json
{
  "success": true,
  "message": "Hosted zone created successfully",
  "data": {
    "id": 1,
    "zone_id": "Z1A2B3C4D5E6F7",
    "domain_name": "example.com",
    "description": "Production environment",
    "zone_type": "PUBLIC",
    "record_count": 2,
    "created_at": "2026-07-11T10:00:00Z",
    "updated_at": "2026-07-11T10:00:00Z"
  }
}
```

> **Note:** `record_count` starts at 2 because SOA and NS records are created automatically.

---

### DNS Records

All DNS record endpoints require a `Bearer` token.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/hosted-zones/{id}/records` | List all DNS records in a hosted zone. |
| `POST` | `/api/hosted-zones/{id}/records` | Create a new DNS record in a hosted zone. |
| `PUT` | `/api/records/{recordId}` | Update an existing DNS record. |
| `DELETE` | `/api/records/{recordId}` | Delete a DNS record. Default SOA/NS records cannot be deleted. |

**Create DNS Record Request:**
```json
{
  "record_name": "api.example.com",
  "record_type": "A",
  "routing_policy": "Simple",
  "alias": false,
  "value": "192.0.2.1",
  "ttl": 300
}
```

**Create DNS Record Response:**
```json
{
  "success": true,
  "message": "DNS Record created successfully",
  "data": {
    "id": 3,
    "record_id": "a1b2c3d4-e5f6-...",
    "hosted_zone_id": "Z1A2B3C4D5E6F7",
    "record_name": "api.example.com",
    "record_type": "A",
    "routing_policy": "Simple",
    "set_identifier": null,
    "alias": false,
    "value": "192.0.2.1",
    "ttl": 300,
    "health_check_id": null,
    "evaluate_target_health": false,
    "created_at": "2026-07-11T10:05:00Z",
    "updated_at": "2026-07-11T10:05:00Z"
  }
}
```

---

### Error Responses

All errors follow the standard HTTP status codes with a JSON `detail` field:

```json
// 400 Bad Request
{ "detail": "Invalid domain name format" }

// 401 Unauthorized
{ "detail": "Could not validate credentials" }

// 404 Not Found
{ "detail": "Hosted zone not found" }

// 500 Internal Server Error
{ "success": false, "message": "An internal server error occurred", "data": null }
```

---

## Deployment

### Backend (Render)

The repository includes a [`render.yaml`](render.yaml) for one-click deployment:

```yaml
services:
  - type: web
    name: route53-backend
    env: python
    rootDir: backend
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set the `SECRET_KEY` environment variable in the Render dashboard for production.

### Frontend (Vercel)

1. Import the repository into Vercel.
2. Set the **Root Directory** to `frontend`.
3. Add the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
   ```
4. Deploy.

> **Note:** The Render free tier has cold starts. The first request after inactivity may take 30–60 seconds. A note is displayed on the login page to set expectations.

---

## License

This project is for educational and demonstration purposes.
