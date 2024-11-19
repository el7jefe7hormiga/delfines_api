const { Router } = require('express');
const { index, ping } = require('../controllers/index.controller.js');

const router = Router();

router.get("/", index);

router.get("/ping", ping);

module.exports = router;
