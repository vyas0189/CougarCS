const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

router.get('/', (req, res) => res.send('Auth Page'));

module.exports = router;
