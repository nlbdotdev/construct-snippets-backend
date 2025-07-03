# Construct Snippets Backend

This is the backend API for the Construct Snippets application. It is built with Express.js, MongoDB (via Mongoose), and JWT authentication.

## Features
- User authentication (JWT, cookies)
- Snippet CRUD operations
- Input validation and error handling
- CORS enabled for local frontend development

## Requirements
- Node.js (v16+ recommended)
- MongoDB (local or remote)

## Setup

1. **Clone the repository**

```bash
git clone <repo-url>
cd construct/construct-snippets-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root of this directory:

```env
MONGODB_URI=mongodb://localhost:27017/construct-snippets
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_LIFETIME=1d
BCRYPTJS_SALTROUNDS=12
PORT=3001
```

4. **Start MongoDB**

If running locally, ensure MongoDB is running:

```bash
brew services start mongodb-community
```

5. **Run the server**

```bash
npm start
```

The API will be available at [http://localhost:3001/api/](http://localhost:3001/api/)

## API Endpoints

- `POST /api/users/signup` — Register a new user
- `POST /api/users/login` — Login and receive a session token
- `GET /api/snippets` — List all snippets (requires auth)
- `POST /api/snippets` — Create a new snippet (requires auth)

...and more. See the code for details.

## Development
- Uses nodemon for hot-reloading (install globally if desired)
- CORS is enabled for `http://localhost:3000` (frontend)

## License
MIT
