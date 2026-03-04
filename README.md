# 📖 Readify

A full-stack book tracking web app where readers track their progress, discover books, and connect with others.

## Tech Stack

| Layer | Stack |
|-------|-------|
| **Frontend** | React (Vite), Tailwind CSS v4, Zustand, Recharts |
| **Backend** | Express, Mongoose, JWT auth |
| **Database** | MongoDB |
| **External** | Google Books API |

## Project Structure

```
readify/
├── server/               # Express API
│   ├── config/           # DB + env config
│   ├── modules/          # Feature-based modules
│   │   ├── auth/         # Registration, login, JWT
│   │   ├── books/        # Google Books API proxy
│   │   ├── library/      # UserBook CRUD + shelves
│   │   └── stats/        # Reading statistics
│   └── utils/            # Shared helpers
├── client/               # React SPA
│   └── src/
│       ├── api/          # Axios API layer
│       ├── components/   # Reusable UI + layout
│       ├── features/     # Smart feature modules
│       ├── store/        # Zustand state
│       ├── hooks/        # Custom hooks
│       └── utils/        # Formatters + constants
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### Backend

```bash
cd server
cp .env .env.local   # edit with your values
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` and proxies API calls to `http://localhost:5000`.

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/readify
JWT_SECRET=your_secret_here
GOOGLE_BOOKS_API_KEY=your_key_here
```

## Features (v1)

- 🔐 JWT Authentication (register/login)
- 🔍 Book search via Google Books API
- 📚 Personal library with shelves (Want to Read, Reading, Completed)
- 📊 Reading progress tracking with visual progress bars
- 📈 Stats dashboard with charts

## License

MIT
