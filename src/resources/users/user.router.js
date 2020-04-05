const router = require('express').Router();
const UsersController = require('./user.controller');

router.route('/').get([UsersController.getAll]);

router.route('/:userId').get([UsersController.getById]);

router.route('/').post([UsersController.create]);

router.route('/:userId').put([UsersController.update]);

router.route('/:userId').delete([UsersController.delete]);

module.exports = router;
