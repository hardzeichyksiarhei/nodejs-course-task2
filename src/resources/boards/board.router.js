const router = require('express').Router();
const BoardService = require('./board.service');

router.route('/').get([BoardService.getAll]);

router.route('/:id').get([BoardService.getByID]);

router.route('/').post([BoardService.create]);

router.route('/:id').put([BoardService.update]);

router.route('/:id').delete([BoardService.delete]);

module.exports = router;
