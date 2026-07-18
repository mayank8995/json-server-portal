const router = require('express').Router();
const controller = require('../controllers/appController');

router.get('/employeeList', controller.getEmployees);
router.get('/paginatedEmployeeList', controller.getPaginatedEmployees);
router.get('/analytics', controller.getAnalytics);
router.get('/performanceCards', controller.getPerformanceCards);
router.get('/profile', controller.getProfile);
router.get('/getFilterList', controller.getFilters);
router.post('/login', controller.login);
router.post('/profile', controller.addProfile);
router.patch('/profile', controller.editProfile);
router.post('/signup', controller.signup);
module.exports = router;
