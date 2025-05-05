import express from 'express';

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.get('/', userController.getAllRentals);

module.exports = router;
