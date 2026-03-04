const express = require('express');
const router = express.Router();
const { protect } = require('../auth/auth.middleware');
const { getOverview, getReadingHistory } = require('./stats.controller');

router.use(protect);

router.get('/overview', getOverview);
router.get('/reading-history', getReadingHistory);

module.exports = router;
