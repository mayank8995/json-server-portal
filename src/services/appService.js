const db = require('../config/db');
const { z } = require('zod');
const { getList, fetchFiltersList } = require('./utilService');

const PaginationSchema = z
  .object({
    page: z.coerce
      .number()
      .int()
      .positive('Page must be a positive integer')
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(100, 'Max items per page is 100')
      .default(10),
  })
  .catchall(z.string());

const paginatedEmployeeList = (req) => {
  const response = getList(req);
  return {
    success: true,
    ...response,
  };
  //Math.ceil(employeeList[0].totalEmployeeCount / limit)
};
const fetchFilters = (req) => {
  const response = fetchFiltersList(req);
  // console.log('response>>>', response);
  return {
    success: true,
    ...response,
  };
};

const fetchEmployeeList = () => db.get('employeeList').value();
const fetchAnalytics = () => db.get('analytics').value();
const fetchPerformanceCards = () => db.get('performanceCards').value();

const fetchProfile = () => db.get('profile').value();

const login = ({ email, password }) => {
  const user = db.get('users').find({ email, password }).value();
  if (!user) {
    throw new Error('Invalid Credentials');
  }
  return {
    token: `fake-jwt-${user.id}-${Date.now()}`,
    user: { id: user.id, email: user.email, name: user.name },
    message: 'Logged in successfully',
  };
};

const addProfile = ({
  name,
  phone,
  email,
  department,
  designation,
  empId,
  jdate,
  wmode,
  location,
  image,
}) => {
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
    image,
  };
  db.set('profile', newProfile).write();
  return { message: 'Profile added successfully' };
};

const editProfile = (payload) => {
  db.get('profile').assign(payload).write();
  return { message: 'Profile edited successfully' };
};

const signup = ({ name, email, password, designation, department, empId }) => {
  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    designation,
    department,
    empId,
  };

  db.get('users').push(newUser).write();

  return {
    token: `fake-jwt-${newUser.id}-${Date.now()}`,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    message: 'Sign up successful',
  };
};

module.exports = {
  fetchEmployeeList,
  paginatedEmployeeList,
  fetchAnalytics,
  fetchPerformanceCards,
  fetchProfile,
  login,
  addProfile,
  editProfile,
  signup,
  fetchFilters,
};
