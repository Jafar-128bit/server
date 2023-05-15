const express = require('express');
const router = express.Router();
const {getAllBoards, newBoard, deleteBoard} = require('../controllers/board');
const {authenticateUser} = require('../middleware/authenticateUser');
const {checkCacheHeapBoard} = require('../middleware/cacheFuntion');

router.get('/boards', authenticateUser, checkCacheHeapBoard, getAllBoards);
router.post('/boards', authenticateUser, newBoard);
router.delete('/boards/:boardId', authenticateUser, deleteBoard);

module.exports = router;