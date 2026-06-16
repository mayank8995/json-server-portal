const jsonServer = require('json-server')
const cors = require('cors');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
// Define allowed production origins
const allowedOrigins = ['https://advance-dashboard.onrender.com'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,X-Requested-With,Accept,Access-Control-Allow-Origin'
};

// Apply standard defaults (logger, static, read-only if configured)
server.use(middlewares);
// Attach the main json-server router
server.use(jsonServer.rewriter({
  '/api/*': '/$1'  // optional: prefix all routes with /api
}))


// Enable robust CORS handling
server.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests across all routes
server.options('*', cors(corsOptions));

server.use(router)

server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})