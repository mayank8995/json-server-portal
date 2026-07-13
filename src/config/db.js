const jsonServer = require("json-server");

const router = jsonServer.router('db.json');

module.exports = router.db;