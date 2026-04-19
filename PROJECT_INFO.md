# 📋 Hanvika – Complete Project Information

> **Version:** 2.0  
> **Status:** Active Development  
> **Last Updated:** March 2026

---

## 1. Project Overview

**Hanvika** is a full-stack **service marketplace platform** where customers can discover, book, and pay for on-demand home/technical services (AC Repair, Plumbing, Electrical, etc.). Workers register, get admin-approved, and then receive and manage customer orders through a dedicated dashboard.

### Core Value Proposition
- Customers browse service categories, select workers, schedule time slots, and pay online.
- Workers apply through a form, get admin-vetted, and receive live task notifications.
- Admins approve/reject worker applications from a dedicated admin dashboard.

---

## 2. Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | React 19 | Built with Vite 6, JSX components |
| **Routing** | React Router v7 | Client-side routing with protected routes |
| **State Management** | Context API | `AuthContext` for authentication state |
| **HTTP Client** | Axios | API calls to backend |
| **UI Framework** | Bootstrap 5 + Custom CSS | Icons via `react-icons` |
| **Backend** | Node.js + Express 4 | RESTful API server |
| **Database** | MongoDB Atlas | Cloud-hosted, accessed via Mongoose 8 |
| **Authentication** | JWT (jsonwebtoken) | Tokens stored in `localStorage` |
| **Password Hashing** | bcrypt | Salted password hashing |
| **File Uploads** | Multer | Profile photos, review images |
| **Validation** | express-validator | Server-side input validation |
| **Dev Tools** | Nodemon, Concurrently | Hot-reload, parallel dev servers |

---

## 3. Directory Structure

```
hanvika-v2/
├── package.json                  # Root: runs both servers via concurrently
├── README.md                     # Original README
├── IMPLEMENTATION_GUIDE.md       # Order management implementation guide
├── REAL_USER_FLOW.md             # Dynamic order system flow doc
├── PROJECT_INFO.md               # ← THIS FILE (complete project info)
│
├── backend/
│   ├── package.json              # Backend dependencies & scripts
│   ├── .env                      # Environment variables (secrets)
│   ├── .env.example              # Template for .env setup
│   ├── src/
│   │   ├── server.js             # Express app entry point
│   │   ├── db.js                 # MongoDB connection (single Mongoose connection)
│   │   ├── models/
│   │   │   ├── User.js           # User schema (customer accounts)
│   │   │   ├── Worker.js         # Worker schema (service providers)
│   │   │   ├── WorkerForm.js     # Worker registration form data
│   │   │   └── Order.js          # Order schema (bookings & payments)
│   │   ├── routes/
│   │   │   ├── auth.js           # User auth (register/login)
│   │   │   ├── workerAuth.js     # Worker auth (register/login)
│   │   │   ├── adminAuth.routes.js    # Admin auth (login with secret key)
│   │   │   ├── adminWorkers.routes.js # Admin worker management (approve/reject)
│   │   │   ├── WorkerForm.js     # Worker registration form submission
│   │   │   ├── orders.js         # Order CRUD & status management
│   │   │   ├── reviews.js        # Reviews CRUD with image uploads
│   │   │   ├── users.js          # User profile endpoints
│   │   │   ├── workerDashboard.js # Worker dashboard data
│   │   │   └── reviews.js.bak    # Backup of reviews route
│   │   ├── middleware/
│   │   │   ├── auth.js           # General JWT auth middleware
│   │   │   ├── userAuth.js       # User-specific auth middleware
│   │   │   ├── workerAuth.js     # Worker-specific auth middleware
│   │   │   ├── adminAuth.middleware.js # Admin auth + secret key verification
│   │   │   ├── cartValidation.js # Cart data validation
│   │   │   └── errorHandler.js   # Global error handling
│   │   └── uploads/              # Uploaded files (images, etc.)
│   │       └── reviews/          # Review images subfolder
│   ├── scripts/                  # Utility scripts
│   ├── create-test-order.js      # Test script: create single order
│   ├── create-multiple-test-orders.js # Test script: create bulk orders
│   ├── test-order.js             # Test script: order testing
│   └── local-orders.json         # Local order data for testing
│
├── frontend/
│   ├── package.json              # Frontend dependencies & scripts
│   ├── .env                      # Frontend env (VITE_API_URL, etc.)
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint configuration
│   ├── index.html                # HTML entry point
│   ├── public/
│   │   └── images/               # Static images (4 files)
│   └── src/
│       ├── main.jsx              # React app bootstrap (BrowserRouter + AuthProvider)
│       ├── App.jsx               # Route definitions & layout
│       ├── App.css               # Global styles
│       ├── AuthContext.jsx        # Auth context (login/logout/token state)
│       ├── assets/               # Static assets (4 files)
│       ├── utils/
│       │   └── workerDashboardUtils.js  # Dashboard helper utilities
│       └── components/
│           ├── layout/
│           │   ├── AppLayout.jsx     # Main app wrapper layout
│           │   ├── Sidebar.jsx       # Navigation sidebar
│           │   └── Sidebar.css       # Sidebar styles
│           │
│           ├── Navbar.jsx            # Top navigation bar
│           ├── Footer.jsx            # Page footer
│           │
│           ├── LoginPage.jsx         # Customer login/register
│           ├── LoginPage.css
│           ├── Select.jsx            # Role selection page (User/Worker)
│           ├── Select.css
│           ├── ProtectedRoute.jsx    # Auth guard for user routes
│           │
│           ├── WorkerSection.jsx     # Homepage: service categories grid
│           ├── WorkerDetailsPage.jsx # Worker listing by category
│           ├── WorkerDetails.jsx     # Individual worker detail card
│           ├── WorkerDetails.css
│           │
│           ├── WorkerLogin.jsx       # Worker login page
│           ├── WorkerLogin.css
│           ├── WorkerForm.jsx        # Worker registration form
│           ├── WorkerForm.css
│           ├── WorkersDashboard.jsx  # Worker task management dashboard
│           ├── WorkersDashboard.css
│           ├── WorkerHome.jsx        # Worker home/landing page
│           ├── WorkerHome.css
│           │
│           ├── AdminLogin.jsx        # Admin login (with secret key)
│           ├── AdminDashboard.jsx    # Admin management dashboard
│           ├── AdminProtectedRoute.jsx # Auth guard for admin routes
│           │
│           ├── ReviewForm.jsx        # Submit reviews (with image upload)
│           ├── ReviewForm.css
│           ├── WorkerReviews.jsx     # Display worker reviews
│           ├── WorkerReviews.css
│           │
│           ├── Contact.jsx           # Contact us page
│           ├── Contact.css
│           ├── Chatbox.jsx           # AI/support chatbot
│           ├── Chatbot.css
│           ├── ImageSlider.jsx       # Image carousel component
│           │
│           ├── Notifications.jsx     # Notifications component
│           └── Notifications.css
```

---

## 4. Database Models (MongoDB)

### 4.1 User Model (`users` collection)
| Field | Type | Required | Details |
|-------|------|----------|---------|
| `username` | String | ✅ | Unique |
| `email` | String | ✅ | Unique |
| `phone` | String | ❌ | Default: `""` |
| `password` | String | ✅ | bcrypt hashed |
| `role` | String (enum) | ❌ | `USER` | `WORKER` | `ADMIN`, Default: `USER` |

### 4.2 Worker Model (`workers` collection)
| Field | Type | Required | Details |
|-------|------|----------|---------|
| `username` | String | ✅ | Unique |
| `email` | String | ✅ | Unique |
| `phone` | String | ✅ | — |
| `password` | String | ✅ | bcrypt hashed |
| `status` | String (enum) | ❌ | `pending` | `approved` | `rejected`, Default: `pending` |
| `serviceType` | String (enum) | ❌ | `Technical` | `Non-Technical` | `Housekeeping` |
| `rejectionReason` | String | ❌ | Reason if rejected |
| `approvedAt` | Date | ❌ | Timestamp of approval |
| `createdAt` | Date | Auto | Mongoose timestamps |
| `updatedAt` | Date | Auto | Mongoose timestamps |

### 4.3 WorkerForm Model (`workerforms` collection)
| Field | Type | Required | Details |
|-------|------|----------|---------|
| `fullName` | String | ✅ | — |
| `phoneNumber` | String | ✅ | — |
| `email` | String | ✅ | — |
| `address` | String | ✅ | — |
| `city` | String | ✅ | — |
| `state` | String | ✅ | — |
| `country` | String | ✅ | — |
| `age` | Number | ✅ | — |
| `gender` | String | ✅ | — |
| `costPerHour` | String | ❌ | Hourly rate |
| `workerTypes` | Object | ❌ | Boolean flags: `acRepair`, `mechanicRepair`, `electricalRepair`, `electronicRepair`, `plumber`, `packersMovers` |
| `profilePhoto` | Buffer + ContentType | ❌ | Binary image data |

### 4.4 Order Model (registered in `db.js`)
| Field | Type | Required | Details |
|-------|------|----------|---------|
| `user` | ObjectId (ref: User) | ❌ | Guest checkout allowed |
| `contactInfo.fullName` | String | ✅ | Trimmed |
| `contactInfo.mobileNumber` | String | ✅ | Trimmed |
| `contactInfo.email` | String | ✅ | Regex validated |
| `items[]` | Array | ✅ | `itemId`, `itemType` (Worker), `name`, `price`, `quantity`, `fees` |
| `location` | String | ✅ | Service location |
| `date` | Date | ✅ | Scheduled date |
| `timeSlots[]` | String[] | ✅ | Selected time slots |
| `subtotal` | Number | ✅ | — |
| `deliveryFee` | Number | ❌ | Default: 0 |
| `platformFee` | Number | ❌ | Default: 0 |
| `discount` | Number | ❌ | Default: 0 |
| `tax` | Number | ❌ | Default: 0 |
| `total` | Number | ✅ | — |
| `promoCode` | String | ❌ | — |
| `paymentStatus` | enum | ❌ | `not_required` | `pending` | `completed` | `failed` |
| `paymentMethod` | enum | ❌ | `cash` | `other` |
| `status` | enum | ❌ | `pending` | `confirmed` | `in-progress` | `completed` | `cancelled` |
| `createdAt` | Date | Auto | — |
| `updatedAt` | Date | Auto | Pre-save hook |

---

## 5. API Endpoints

### 5.1 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | User login → returns JWT | ❌ |
| POST | `/api/auth/register` | User registration | ❌ |
| GET | `/api/auth/test` | Auth health check | ❌ |

### 5.2 Worker Authentication (`/api/worker-auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/worker-auth/login` | Worker login → returns JWT | ❌ |
| POST | `/api/worker-auth/register` | Worker registration | ❌ |

### 5.3 Admin Authentication (`/api/auth/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/admin/login` | Admin login (requires secret key) | ❌ |

### 5.4 Admin Worker Management (`/api/admin/workers`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/workers` | List all workers (with status filter) | 🔒 Admin |
| PATCH | `/api/admin/workers/:id/approve` | Approve a worker | 🔒 Admin |
| PATCH | `/api/admin/workers/:id/reject` | Reject a worker (with reason) | 🔒 Admin |

### 5.5 Worker Form (`/api/worker-form`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/worker-form` | Submit worker registration form | ❌ |

### 5.6 Orders (`/api/orders`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | Get all pending orders | 🔒 |
| POST | `/api/orders` | Create new order (after payment) | 🔒 |
| PATCH | `/api/orders/:id` | Accept/decline an order | 🔒 |

### 5.7 Reviews (`/api/reviews`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/reviews` | Get all reviews | ❌ |
| POST | `/api/reviews` | Submit a review (with image upload) | 🔒 |

### 5.8 Users (`/api/users`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/current` | Get current user details | 🔒 |

### 5.9 Utility Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server status check |
| GET | `/health` | Health check (returns JSON status + time) |
| GET | `/uploads/:filename` | Serve static uploaded files |
| GET | `/uploads/reviews/:filename` | Serve review images |
| GET | `/api/image/:filename` | Legacy path for review images |

---

## 6. Frontend Routes

| Path | Component | Protected | Description |
|------|-----------|-----------|-------------|
| `/` | `WorkerSection` | ❌ | Homepage – service categories grid |
| `/login` | `LoginPage` | ❌ | Customer login/register |
| `/select` | `Select` | ❌ | Role selection (User vs Worker) |
| `/worker-login` | `WorkerLogin` | ❌ | Worker login page |
| `/worker-form` | `WorkerForm` | ❌ | Worker registration form |
| `/workers-dashboard` | `WorkersDashboard` | ✅ User | Worker task management |
| `/workers/:categoryId` | `WorkerDetailsPage` | ✅ User | Workers by service category |
| `/reviews` | `WorkerReviews` | ❌ | Public reviews listing |
| `/add-review` | `ReviewForm` | ✅ User | Submit a new review |
| `/contact` | `Contact` | ❌ | Contact us page |
| `/admin-login` | `AdminLogin` | ❌ | Admin login (separate layout) |
| `/admin` | `AdminDashboard` | ✅ Admin | Admin management panel |
| `/unauthorized` | Access Denied | ❌ | Permission denied page |

**Global Components** (rendered on all non-admin pages):
- `Navbar` – top navigation
- `Footer` – page footer
- `Chatbox` – AI/support chatbot (floating)
- `Sidebar` – navigation sidebar (via `AppLayout`)

---

## 7. Authentication & Authorization

### 7.1 Authentication Flow
```
1. User/Worker submits credentials → POST /api/auth/login or /api/worker-auth/login
2. Backend validates credentials against hashed passwords (bcrypt)
3. JWT is generated with user ID & role
4. Token returned to client → stored in localStorage
5. AuthContext updates → isAuthenticated = true
6. All subsequent API calls include token in Authorization header
```

### 7.2 Role-Based Access
| Role | Access |
|------|--------|
| **USER** | Browse services, book workers, make payments, view orders, submit reviews |
| **WORKER** | Login, view dashboard, accept/decline orders |
| **ADMIN** | Login (requires secret key), approve/reject workers, manage platform |

### 7.3 Middleware Stack
| Middleware | Purpose |
|-----------|---------|
| `auth.js` | General JWT verification |
| `userAuth.js` | Verify user role |
| `workerAuth.js` | Verify worker role |
| `adminAuth.middleware.js` | Verify admin role + secret key |
| `cartValidation.js` | Validate cart data before order creation |
| `errorHandler.js` | Catch & format all server errors |

---

## 8. Service Categories

The platform supports these on-demand service categories:

| Service | Worker Type Key | Description |
|---------|----------------|-------------|
| 🔧 AC Repair | `acRepair` | Air conditioning services |
| 🛠️ Mechanic Repair | `mechanicRepair` | Mechanical services |
| ⚡ Electric Repair | `electricalRepair` | Electrical wiring & fixtures |
| 📱 Electronics Repair | `electronicRepair` | Gadget & electronics repair |
| 🚰 Plumber | `plumber` | Plumbing services |
| 📦 Packers & Movers | `packersMovers` | Relocation services |

---

## 9. Order & Payment Flow

```
┌─────────────────────────────────────────────────────────┐
│                    CUSTOMER FLOW                         │
├─────────────────────────────────────────────────────────┤
│ 1. Browse Categories on Homepage (WorkerSection)        │
│ 2. Select Category → View available Workers             │
│ 3. Choose Worker → Add to Cart (CartContext)             │
│ 4. Cart stores: items, quantities, prices, service type  │
│ 5. Checkout: fill location, date, time slots             │
│ 6. "Proceed to Payment" → order saved to localStorage   │
│ 7. Stripe processes payment                              │
│ 8. On success → PaymentSuccess.jsx:                      │
│    - Fetches current user details via JWT                │
│    - Creates order in MongoDB with real user data        │
│    - Clears localStorage                                 │
│ 9. Order appears in Worker Dashboard as a task           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    WORKER FLOW                           │
├─────────────────────────────────────────────────────────┤
│ 1. Worker registers via WorkerForm                       │
│ 2. Admin reviews & approves/rejects                      │
│ 3. Approved workers login → WorkersDashboard             │
│ 4. Dashboard shows pending orders as task cards           │
│ 5. Worker accepts/declines orders                        │
│ 6. Accepted → task removed; Declined → status updated    │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Environment Configuration

### 10.1 Backend (`backend/.env`)
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_SECRET=<your_long_random_secret>
ADMIN_SECRET_KEY=<your_admin_secret_key>
PORT=5003
```

### 10.2 Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5003
```

> ⚠ **Important:** Never hardcode API URLs in frontend code. Always use `import.meta.env.VITE_API_URL`.

---

## 11. How to Run Locally

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (or a local MongoDB instance)

### Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd hanvika-v2

# 2. Install root dependencies (concurrently)
npm install

# 3. Install backend dependencies
cd backend
npm install

# 4. Set up backend environment
# Copy .env.example to .env and fill in your values
cp .env.example .env

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Set up frontend environment
# Create .env with your backend URL
echo "VITE_API_URL=http://localhost:5003" > .env

# 7. Start both servers (from root directory)
cd ..
npm run dev
```

This starts:
- **Backend** → `http://localhost:5003` (Express API server via Nodemon)
- **Frontend** → `http://localhost:5173` (Vite dev server with HMR)

### Individual Server Commands
```bash
# Backend only
cd backend && npm run dev     # Development (Nodemon)
cd backend && npm start       # Production (Node)

# Frontend only
cd frontend && npm run dev    # Development (Vite HMR)
cd frontend && npm run build  # Production build
cd frontend && npm run preview # Preview production build
```

---

## 12. Key Frontend Components

| Component | File | Purpose |
|-----------|------|---------|
| **AppLayout** | `layout/AppLayout.jsx` | Main layout wrapper with sidebar |
| **Sidebar** | `layout/Sidebar.jsx` | Left navigation sidebar |
| **Navbar** | `Navbar.jsx` | Top navigation bar with auth links |
| **LoginPage** | `LoginPage.jsx` | Customer login & registration form |
| **Select** | `Select.jsx` | Role selection page (User / Worker) |
| **WorkerSection** | `WorkerSection.jsx` | Homepage grid of service categories |
| **WorkerDetailsPage** | `WorkerDetailsPage.jsx` | List workers in a selected category |
| **WorkerDetails** | `WorkerDetails.jsx` | Individual worker profile card |
| **WorkerLogin** | `WorkerLogin.jsx` | Worker-specific login page |
| **WorkerForm** | `WorkerForm.jsx` | Worker registration form (multi-field) |
| **WorkersDashboard** | `WorkersDashboard.jsx` | Worker's task management dashboard |
| **AdminLogin** | `AdminLogin.jsx` | Admin login with secret key |
| **AdminDashboard** | `AdminDashboard.jsx` | Admin panel for worker management |
| **ReviewForm** | `ReviewForm.jsx` | Submit reviews with photo upload |
| **WorkerReviews** | `WorkerReviews.jsx` | Public listing of worker reviews |
| **Chatbox** | `Chatbox.jsx` | Floating AI/support chatbot |
| **Contact** | `Contact.jsx` | Contact us page |
| **ImageSlider** | `ImageSlider.jsx` | Image carousel component |
| **ProtectedRoute** | `ProtectedRoute.jsx` | Auth guard for user-only routes |
| **AdminProtectedRoute** | `AdminProtectedRoute.jsx` | Auth guard for admin-only routes |

---

## 13. Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.21.2 | Web framework |
| `mongoose` | ^8.12.1 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `bcrypt` | ^5.1.1 | Password hashing |
| `cors` | ^2.8.5 | Cross-origin resource sharing |
| `dotenv` | ^16.4.7 | Environment variable management |
| `multer` | ^1.4.5 | File upload handling |
| `express-validator` | ^7.2.1 | Input validation |
| `uuid` | ^9.0.1 | Unique ID generation |
| `nodemon` | ^3.1.9 | Dev server auto-restart |

---

## 14. Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `react-router-dom` | ^7.4.0 | Client-side routing |
| `axios` | ^1.8.4 | HTTP client for API calls |
| `bootstrap` | ^5.3.3 | CSS framework |
| `react-icons` | ^5.5.0 | Icon library |
| `vite` | ^6.2.0 | Build tool & dev server |
| `@vitejs/plugin-react` | ^4.3.4 | React plugin for Vite |

---

## 15. Deployment (Render)

### Backend – Deploy as Web Service
1. Connect your GitHub repo to Render
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_SECRET_KEY`, `PORT`
6. Whitelist the Render server IP in MongoDB Atlas Network Access

### Frontend – Deploy as Static Site
1. Connect your GitHub repo to Render
2. Set root directory to `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://api.hanvikaservices.in`

---

## 16. Security Considerations

- ✅ **JWT Authentication** – all sensitive endpoints require valid tokens
- ✅ **bcrypt Password Hashing** – passwords never stored in plaintext
- ✅ **Admin Triple Factor** – admin login requires username + password + secret key
- ✅ **Input Validation** – express-validator on server side
- ✅ **CORS** – restricted to localhost and whitelisted production domains
- ✅ **Enum Validation** – database-level constraints on roles, statuses, categories
- ✅ **Error Handling** – global error handler prevents sensitive data leaks in production

---

## 17. Development Rules & Best Practices

1. **Never hardcode API URLs** – always use `import.meta.env.VITE_API_URL` in frontend
2. **Never modify authentication** without team discussion
3. **Follow modular MVC structure** – each feature gets its own model, controller, route
4. **Keep frontend/backend contracts consistent** – API changes must update both sides
5. **New feature file structure:**

   **Backend:**
   ```
   models/<feature>.model.js
   routes/<feature>.routes.js
   middleware/<feature>.middleware.js (if needed)
   ```

   **Frontend:**
   ```
   components/<Feature>.jsx
   components/<Feature>.css
   ```

---

## 18. Current Features (Implemented)

- ✅ JWT-based user authentication (register/login)
- ✅ Worker authentication (separate register/login)
- ✅ Admin authentication (with secret key)
- ✅ Role-based route protection (User, Worker, Admin)
- ✅ Service category browsing (6 categories)
- ✅ Worker profile viewing
- ✅ Worker registration form with photo upload
- ✅ Admin dashboard for worker approval/rejection
- ✅ Order management system (create, accept, decline)
- ✅ Payment integration (Stripe)
- ✅ Review system with image uploads
- ✅ Modern sidebar-based UI layout
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ AI/support chatbot
- ✅ Contact us page
- ✅ Image slider/carousel
- ✅ Health check endpoint

---

## 19. Planned Features

- 🔲 Advanced booking system with calendar integration
- 🔲 Real-time notifications (WebSocket)
- 🔲 Payment gateway expansion
- 🔲 Analytics dashboard
- 🔲 Worker availability calendar
- 🔲 Push notifications (mobile)
- 🔲 Rating & ranking algorithm for workers
- 🔲 Multi-language support

---

## 20. Contact & Team

- **Project:** Hanvika Service Management Platform
- **Version:** 2.0
- **Architecture:** MERN Stack (MongoDB, Express, React, Node.js)
- **Structured for:** Team scalability and production deployment
