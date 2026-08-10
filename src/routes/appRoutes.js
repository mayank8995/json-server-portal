const router = require('express').Router();
const controller = require('../controllers/appController');
const { verifyJWT } = require('../middleware/verifyJWT');
// router.get('/employeeList',verifyJWT, controller.getEmployees);
router.get(
  '/paginatedEmployeeList',
  verifyJWT,
  controller.getPaginatedEmployees
);
router.get('/analytics', verifyJWT, controller.getAnalytics);
router.get('/performanceCards', verifyJWT, controller.getPerformanceCards);
router.get('/profile', verifyJWT, controller.getProfile);
router.get('/getFilterList', verifyJWT, controller.getFilters);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/profile', verifyJWT, controller.addProfile);
router.patch('/profile', verifyJWT, controller.editProfile);
router.post('/signup', controller.signup);
router.get('/getEmployeeDetails', verifyJWT, controller.getEmployeeDetails);

module.exports = router;
