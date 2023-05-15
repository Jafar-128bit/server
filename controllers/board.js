const connection = require('../config/databaseConnect');
const {storeInCache, deleteItem} = require('../controllers/cacheController');

//Creating A new board
exports.getAllBoards = (req, res) => {
    const {userId} = req.body;
    const sql = `SELECT * FROM boards WHERE user_id = (${userId})`;
    try {
        connection.query(sql, (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            const isCacheStored = storeInCache(userId, results);
            isCacheStored ? res.status(300).jsonp({
                code: 300,
                message: "Server Caching Completed!",
                results: results,
            }) : res.status(500).jsonp({
                code: 500,
                message: "Server Caching Error Occurred!",
                results: results,
            });
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

//Creating A new board
exports.newBoard = (req, res) => {
    const {name, userId} = req.body;
    const sql = `INSERT INTO boards (name, user_id) VALUES ('${name}', ${userId})`;
    try {
        connection.query(sql, (error, results) => {
            if (error) return res.status(400).jsonp({code: 404, errorMassage: error});
            return res.status(200).jsonp({
                code: 200,
                results: results
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

// Deleting the board with deleting all its associated columns and cards.
exports.deleteBoard = (req, res) => {
    const {boardId} = req.params;
    const {userId} = req.body;
    deleteItem(userId);
    try {
        connection.beginTransaction((error) => {
            if (error) res.status(400).jsonp({code: 404, errorMessage: error});

            const deleteCardsQuery = 'DELETE FROM cards WHERE column_id IN (SELECT id FROM columns WHERE board_id = ?)';
            connection.query(deleteCardsQuery, [boardId], (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        if (error) res.status(400).jsonp({code: 404, errorMessage: error});
                    });
                }

                const deleteColumnsQuery = 'DELETE FROM columns WHERE board_id = ?';
                connection.query(deleteColumnsQuery, [boardId], (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            if (error) res.status(400).jsonp({code: 404, errorMessage: error});
                        });
                    }

                    const deleteBoardQuery = 'DELETE FROM boards WHERE id = ? AND user_id = ?';
                    connection.query(deleteBoardQuery, [boardId, userId], (error, results) => {
                        if (error) {
                            return connection.rollback(() => {
                                if (error) res.status(400).jsonp({code: 404, errorMessage: error});
                            });
                        }

                        connection.commit((error) => {
                            if (error) {
                                return connection.rollback(() => {
                                    if (error) res.status(400).jsonp({code: 404, errorMessage: error});
                                });
                            }

                            res.status(200).jsonp({
                                code: 200,
                                message: 'Board deleted successfully.',
                                results: results
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({code: 500, errorMessage: error});
    }
};
