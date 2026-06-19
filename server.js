const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');

const app = express();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();


app.use(middlewares);
app.use(express.json()); // To parse JSON bodies


app.get('/employeeList', (req, res) => {
  const db = router.db; 
  const employeeList = db.get('employeeList').value();
  res.status(200).json(employeeList);
});
app.get('/analytics', (req, res) => {
  const db = router.db; 
  const analytics = db.get('analytics').value();
  res.status(200).json(analytics);
});
app.get('/performanceCards', (req, res) => {
  const db = router.db; 
  const performanceCards = db.get('performanceCards').value();
  res.status(200).json(performanceCards);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: `fake-jwt-${user.id}-${Date.now()}`,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

app.post('/profile', (req, res) => {
  const db = router.db;
  const { name, phone, email, department,designation,empId,jdate,wmode,location,image } = req.body;
  const newProfile = {
    name, 
    phone, 
    email, 
    department,
    designation,
    empId,
    jdate,
    wmode,
    location,
    image
  };
  db.set('profile', newProfile).write();
  res.status(201).json(db.get('profile').value());
});

app.patch('/profile', (req, res) => {
  const db = router.db;
  db.get('profile').assign(req.body).write();
  res.status(201).json(db.get('profile').value());
});


app.post('/signup', (req, res) => {
  const { name, email, password ,designation, department, empId} = req.body;
  const db = router.db;

  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, 
    designation,
    department,
    empId
  };

  
  db.get('users').push(newUser).write();

  res.status(201).json({
    token: `fake-jwt-${newUser.id}-${Date.now()}`,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

const corsOptions = {
  // origin: (origin, callback) => {
  //   // Allow requests with no origin (like mobile apps or curl)
  //   if (!origin) return callback(null, true);
    
  //   if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Blocked by CORS policy'));
  //   }
  // },
  // origin:'https://advance-dashboard.onrender.com',
  origin:'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,X-Requested-With,Accept,Access-Control-Allow-Origin'
};
// Enable robust CORS handling
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests across all routes
app.options('*', cors(corsOptions));

// 3. Bind the automated json-server router to an endpoint
// This auto-generates CRUD for whatever is inside db.json
app.use(router); 

app.listen(3000, () => {
  console.log('Hybrid Backend is running on port 3000');
});
