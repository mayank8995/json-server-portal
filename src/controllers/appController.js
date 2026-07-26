const service = require('../services/appService');

const getEmployees = (req, res) => {
  try {
    const response = service.fetchEmployeeList();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Error is fetching Employee list' });
  }
};
const getPaginatedEmployees = (req, res) => {
  try {
    const response = service.paginatedEmployeeList(req);
    res.status(200).json(response);
    // res.status(500).json({});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getFilters = (req, res) => {
  try {
    const response = service.fetchFilters(req);
    // console.log('in final response>>', response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error in filters' });
  }
};
const getAnalytics = (req, res) => {
  try {
    const response = service.fetchAnalytics();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Error in fetching Analytics' });
  }
};
const getPerformanceCards = (req, res) => {
  try {
    const response = service.fetchPerformanceCards();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Error in fetching performance cards' });
  }
};
const getProfile = (req, res) => {
  try {
    const response = service.fetchProfile(req.query);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Error in fetching user profile' });
  }
};
const login = (req, res) => {
  try {
    const response = service.login(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
const addProfile = (req, res) => {
  try {
    const response = service.addProfile(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const editProfile = (req, res) => {
  try {
    const response = service.editProfile(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const signup = (req, res) => {
  try {
    const response = service.signup(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEmployees,
  getPaginatedEmployees,
  getAnalytics,
  getPerformanceCards,
  getProfile,
  login,
  addProfile,
  editProfile,
  signup,
  getFilters,
};
