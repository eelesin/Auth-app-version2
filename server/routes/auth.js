const express = require('express')
const { body } = require('express-validator')
const { register, login} = require('../controllers/authController')
const validate = require('../middleware/validate')

const router = express.Router();

//Validation rule live on the route - they document the contract clearly
const registerRules = [
    body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name too long'),

    body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

    body('password')
    .isLength({ min: 8}).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number')
];

//POST /api/auth/register
// Flow: rules run -> validate middleware checks -> controller executes

router.post('/register', registerRules, validate, register);

const loginRules = [
    body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

    body('password')
    .notEmpty().withMessage('Password is required')
];

//Post /api/auth/login
router.post('/login', loginRules, validate, login)

module.exports = router