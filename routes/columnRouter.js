const express = require('express');
const router = express.Router();
const {getAllColumns, newColumn, deleteColumn, updateColumn} = require('../controllers/column');

//TODO: Add cache data function to these router also
router.get('/columns/:boardId', getAllColumns);
router.post('/columns', newColumn);
router.delete('/columns/:columnId', deleteColumn);
router.put('/columns/:columnId', updateColumn);

module.exports = router;