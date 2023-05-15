const express = require('express');
const router = express.Router();
const {getAllCards, newCard, deleteCard, updateCard} = require('../controllers/card');

router.get('/cards/:columnId', getAllCards);
router.post('/cards', newCard);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards/:cardId', updateCard);

module.exports = router;