const router = require('express').Router();
const UsersService = require('./user.service');

router.route('/').get([UsersService.getAll]);

router.route('/:id').get([UsersService.getByID]);

router.route('/').post([UsersService.create]);

router.route('/:id').put([UsersService.update]);

router.route('/:id').delete([UsersService.delete]);

module.exports = router;
