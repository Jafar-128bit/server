const connection = require('../config/databaseConnect');

//Get all the cards
exports.getAllCards = (req, res) => {
    const { columnId } = req.params;
    const sql = 'SELECT * FROM cards WHERE column_id = ? ORDER BY position';
    try {
        connection.query(sql, [columnId], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp(results);
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

//Create a new board
exports.newCard = (req, res) => {
    const { columnId, title, description, position } = req.body;
    const sql = 'INSERT INTO cards (column_id, title, description, position) VALUES (?, ?, ?, ?)';
    try {
        connection.query(sql, [columnId, title, description, position], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp({code: 200, results: results});
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

//Update a card
exports.updateCard = (req, res) => {
    const { cardId } = req.params;
    const { columnId, position } = req.body;
    const sql = 'UPDATE cards SET column_id = ?, position = ? WHERE id = ?';
    try {
        connection.query(sql, [columnId, position, cardId], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp({code: 200, results: results});
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

//Delete a card
exports.deleteCard = (req, res) => {
    const { cardId } = req.params;
    const sql = 'DELETE FROM cards WHERE id = ?';
    try {
        connection.query(sql, [cardId], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp({code: 200, results: results});
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}