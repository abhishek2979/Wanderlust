# Wanderlust - MERN Stack Project

> An travel listing web app built with the **MERN Stack**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **M** | MongoDB + Mongoose |
| **E** | Express.js |
| **R** | React 18 + Vite |
| **N** | Node.js |
| Auth | JWT (JSON Web Tokens) |
| Styling | Bootstrap 5 + Custom CSS |
| Images | Cloudinary |

---

## 📁 Project Structure

```
wanderlust-mern/
├── backend/                  ← Express REST API
│   ├── controllers/
│   │   ├── listingController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js           ← JWT protect middleware
│   ├── models/
│   │   ├── Listing.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/
│   │   ├── listingRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── cloudinary.js
│   ├── seed.js               ← Sample data seeder
│   ├── server.js             ← Entry point
│   └── package.json
│
└── frontend/                 ← React + Vite SPA
    ├── src/
    │   ├── api/
    │   │   └── axios.js      ← Axios instance with JWT interceptor
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ListingCard.jsx
    │   │   └── StarRating.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx  ← Global auth state (Context API)
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ShowListing.jsx
    │   │   ├── NewListing.jsx
    │   │   ├── EditListing.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── App.jsx            ← React Router setup
    │   └── App.css
    ├── index.html
    └── package.json
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Fill in your `.env`:
```
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
JWT_SECRET=your_strong_secret_here
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
PORT=8080
```

Seed the database with sample data:
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev      # development (with nodemon)
# or
npm start        # production
```

Backend runs at: `http://localhost:8080`

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔗 API Endpoints

### Listings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/listings` | ❌ | Get all listings |
| GET | `/api/listings/:id` | ❌ | Get single listing |
| POST | `/api/listings` | ✅ | Create listing |
| PUT | `/api/listings/:id` | ✅ (owner) | Update listing |
| DELETE | `/api/listings/:id` | ✅ (owner) | Delete listing |

### Reviews
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/listings/:id/reviews` | ✅ | Add review |
| DELETE | `/api/listings/:id/reviews/:reviewId` | ✅ | Delete review |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/users/register` | ❌ | Register new user |
| POST | `/api/users/login` | ❌ | Login, returns JWT |
| GET | `/api/users/me` | ✅ | Get current user |

---

## 🔄 Original → MERN Differences

| Original (EJS) | MERN Version |
|----------------|--------------|
| `passport-local-mongoose` sessions | **JWT tokens** |
| Server-side rendering with EJS | **React SPA** (client-side rendering) |
| `res.render("view.ejs")` | `res.json({ data })` |
| Flash messages via `connect-flash` | JSON error messages in React state |
| Method override (`?_method=DELETE`) | Proper HTTP DELETE/PUT methods |
| Single monolith `app.js` | Separated frontend + backend |

---

## 🧑‍💻 Demo Credentials

After running `node seed.js`:
- **Username:** `demo`
- **Password:** `demo123`

---

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `cors` - Cross-Origin Resource Sharing
- `multer` + `multer-storage-cloudinary` - File uploads
- `cloudinary` - Image storage
- `dotenv` - Environment variables

### Frontend
- `react` + `react-dom` - UI library
- `react-router-dom` - Client-side routing
- `axios` - HTTP requests
- `bootstrap` - CSS framework (via CDN)

---

*Made with ❤️ by Abhishek meena 
