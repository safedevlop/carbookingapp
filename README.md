# Automobile Service Booking System

A full-stack web application for booking automobile services with React frontend, Node.js backend, and MongoDB database.

## Features

- Book vehicle service online with customer details
- Responsive design with TailwindCSS
- MongoDB data storage
- Docker containerization
- CI/CD pipeline with GitHub Actions

## Tech Stack

- **Frontend**: React.js, TailwindCSS, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd automobile-service-app
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Set up environment variables**
```bash
# Create .env file in server directory
cd ../server
echo "MONGO_URI=mongodb://localhost:27017/automobile-service" > .env
echo "PORT=5000" >> .env
```

4. **Start MongoDB locally** (if not using Docker)
```bash
mongod
```

5. **Run the application**
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory, new terminal)
cd ../client
npm start
```

### Docker Development

1. **Run with Docker Compose**
```bash
docker-compose up --build
```

2. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (admin)

## Project Structure

```
automobile-service-app/
├── client/                 # React frontend
│   ├── src/
│   │   └── App.jsx        # Main React component
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container config
├── server/                # Node.js backend
│   ├── server.js          # Express server setup
│   ├── routes/bookings.js # API routes
│   ├── models/Booking.js  # MongoDB schema
│   ├── package.json       # Backend dependencies
│   └── Dockerfile         # Backend container config
├── docker-compose.yml     # Multi-container setup
└── .github/workflows/     # CI/CD pipeline
    └── ci-cd.yml
```