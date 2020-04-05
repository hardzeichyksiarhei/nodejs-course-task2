const router = require('express').Router();
const BoardController = require('./board.controller');

router.route('/').get([BoardController.getAll]);

router.route('/:id').get([BoardController.getByID]);

router.route('/').post([BoardController.create]);

router.route('/:id').put([BoardController.update]);

router.route('/:id').delete([BoardController.delete]);

module.exports = router;
