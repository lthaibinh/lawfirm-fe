# Mock API with JSON Server

This project includes a mock API server using JSON Server to simulate backend endpoints during development.

> **Important**: JSON Server uses **1-based pagination**. Page 1 is the first page, page 0 will return no results.

> **Note**: The `accountServices` automatically converts 0-based page numbers (from your component) to 1-based page numbers (for JSON Server), so you can continue using 0-based indexing in your UI components.

> **Note**: All json-server related files are now organized in the `json-server/` folder for better project structure.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your API base URL:
```bash
cp json-server/env.example .env.local
```

Set the mock API URL in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### 3. Start the Mock API Server

#### Option A: Run Mock API Only
```bash
npm run mock:api
```

#### Option B: Run Mock API with Watch Mode
```bash
npm run mock:api:watch
```

#### Option C: Run Both Next.js and Mock API (Recommended for Development)
```bash
npm run dev:mock
```

## Available Endpoints

The mock API provides the following endpoints that match your existing API structure:

### Blog Posts
- `GET /api/post/posts` - Get all blog posts
- `GET /api/post/posts/:id` - Get specific blog post
- `POST /api/post/posts` - Create new blog post
- `PUT /api/post/posts/:id` - Update blog post
- `DELETE /api/post/posts/:id` - Delete blog post

### Comments
- `GET /api/post/comments/:postId` - Get comments for a post
- `GET /api/post/comments/:postId/:parentId` - Get nested comments
- `POST /api/post/comments` - Create new comment
- `PUT /api/post/comments/:id` - Update comment
- `DELETE /api/post/comments/:id` - Delete comment

### Meta Data
- `GET /api/post/meta` - Get categories and tags
- `POST /api/post/meta` - Create new meta entry
- `PUT /api/post/meta/:id` - Update meta entry
- `DELETE /api/post/meta/:id` - Delete meta entry

### Menu State
- `GET /api/menu/master` - Get current menu state
- `PUT /api/menu/master` - Update menu state

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics and activity

### Users
- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Accounts
- `GET /api/accounts` - Get all accounts with pagination and filtering
- `GET /api/accounts/:id` - Get specific account by ID
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update existing account
- `DELETE /api/accounts/:id` - Delete account


#### Account Query Parameters (JSON Server Native)
- `_page` - Page number for pagination (JSON Server native)
- `_limit` - Number of items per page (JSON Server native)
- `q` - Search term for text search across all fields (JSON Server native)
- `status` - Filter by account status (active, inactive, pending, suspended)
- `accountType` - Filter by account type (individual, corporate, startup, trust, partnership)
- `assignedAttorney` - Filter by assigned attorney
- `_sort` - Sort field (accountName, clientName, createdAt, balance, etc.) (JSON Server native)
- `_order` - Sort direction (asc, desc) (JSON Server native)

## Data Structure

The mock data is stored in `db.json` and includes:

- **Posts**: Sample blog posts with titles, content, metadata
- **Comments**: Nested comment structure with post relationships
- **Meta**: Categories and tags for content organization
- **Users**: Sample user accounts with roles
- **Accounts**: Sample client accounts with comprehensive information including:
  - Account details (number, name, client info)
  - Contact information (email, phone)
  - Financial data (balance, currency)
  - Status and type classification
  - Assignment and activity tracking
  - Billing address and notes
- **Dashboard**: Statistics and recent activity data
- **Menu**: Current navigation state

## Features

### CORS Support
The mock API includes CORS headers to allow cross-origin requests from your Next.js app.

### Authentication Simulation
Protected routes (like `/api/users`) require a valid Bearer token in the Authorization header.

### Custom Routes
The API uses custom routing to match your existing endpoint structure.

### Real-time Updates
When running with `--watch` flag, the API automatically reloads when `db.json` changes.

### JSON Server Native Features
The accounts endpoint uses JSON Server's built-in features:
- **Pagination**: `_page` and `_limit` parameters
- **Search**: `q` parameter for text search across all fields
- **Filtering**: Direct field filtering (status, accountType, assignedAttorney)
- **Sorting**: `_sort` and `_order` parameters

## Development Workflow

1. **Start Development**: Run `npm run dev:mock` to start both servers
2. **Edit Data**: Modify `db.json` to add/update mock data
3. **Test APIs**: Use your existing API calls - they'll work with the mock server
4. **Switch to Real API**: Change `NEXT_PUBLIC_API_BASE_URL` in `.env.local`

## Customization

### Adding New Endpoints
1. Add data to `db.json`
2. Add routes to `routes.json`
3. Update middleware if needed

### Modifying Response Format
Edit the middleware in `middleware.js` to transform responses or add custom logic.

### Database Schema
Modify `db.json` to match your expected data structure. JSON Server will automatically create RESTful endpoints.

## Troubleshooting

### Port Already in Use
If port 3001 is occupied, change it in `json-server.json`:
```json
{
  "port": 3002
}
```

### CORS Issues
Ensure your Next.js app is making requests to the correct mock API URL.

### Authentication Errors
For protected routes, include a valid Bearer token:
```javascript
headers: {
  'Authorization': 'Bearer your-token-here'
}
```

## Switching Between Mock and Real API

To switch between mock and real API:

1. **Use Mock API**: Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api`
2. **Use Real API**: Set `NEXT_PUBLIC_API_BASE_URL=https://your-real-api.com/api`

Your existing API calls will work with both configurations without code changes.
