const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const Member = require('../../models/Member');

const router = express.Router();

// @route   GET api/members
// @desc    Get all members
// @access  Public

// @route   GET api/:member_id
// @desc    Get an members
// @access  Public

// @route   POST api/member
// @desc    Register a member
// @access  Public

// @route   PUT api/:member_id
// @desc    Update an members
// @access  Public

// @route   PUT api/:member_id
// @desc    Delete an members
// @access  Public

module.exports = router;
