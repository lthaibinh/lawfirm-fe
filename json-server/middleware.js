module.exports = (req, res, next) => {
  // Enable CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  // Simulate authentication for protected routes
  if (req.path.startsWith('/api/admin') || req.path.includes('users')) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Unauthorized - Authentication token required',
        status: 401
      });
    }
  }

  // Add delay simulation for development (optional)
  // setTimeout(next, 500);

  // Log requests for debugging
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);

  next();
};
