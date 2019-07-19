const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const Member = require('../../models/Member');
const Admin = require('../../models/Admin');

//PASSWORD REQUIREMENTS  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
// @route   GET api/members/admin/create
// @desc    Create the admin
// @access  Private

// @route   GET api/members/admin
// @desc    Get the admin
// @access  Private

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
