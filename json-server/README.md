# JSON Server Mock API

This folder contains all the configuration and data files for the mock API server using JSON Server.

## Files Overview

- **`db.json`** - Mock database with sample data for posts, comments, users, etc.
- **`json-server.json`** - JSON Server configuration file
- **`routes.json`** - Custom API route mappings
- **`middleware.js`** - Custom middleware for CORS, authentication, etc.
- **`env.example`** - Example environment configuration
- **`MOCK_API_README.md`** - Comprehensive documentation

## Quick Start

1. **Install dependencies**: `npm install`
2. **Copy environment file**: `cp json-server/env.example .env.local`
3. **Start mock API**: `npm run mock:api`
4. **Start both servers**: `npm run dev:mock`

## Configuration

The mock API runs on port 3001 by default. You can modify this in `json-server.json`.

## Data Structure

The mock data includes:
- Blog posts with metadata
- Nested comments system
- User management
- Dashboard statistics
- Menu state management

## API Endpoints

All endpoints are prefixed with `/api` and match your existing API structure:
- `/api/post/posts` - Blog posts
- `/api/post/comments` - Comments
- `/api/post/meta` - Categories and tags
- `/api/menu/master` - Menu state
- `/api/dashboard` - Dashboard data
- `/api/users` - User management

For detailed documentation, see `MOCK_API_README.md`.
