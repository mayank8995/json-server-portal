const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
// middleware for cookies
app.use(cookieParser());
const appRoutes = require('./src/routes/appRoutes');

const corsOptions = {
  origin: 'https://advance-dashboard.onrender.com',
  // origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Access-Control-Allow-Origin',
  ],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/', appRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Hybrid Backend is running on port ${PORT}`);
});
