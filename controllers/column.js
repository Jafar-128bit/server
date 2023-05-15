const connection = require('../config/databaseConnect');

//Get all the columns
exports.getAllColumns = (req, res) => {
    const {boardId} = req.params;
    const sql = 'SELECT * FROM columns WHERE board_id = ? ORDER BY position';
    try {
        connection.query(sql, [boardId], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp({code: 200, results: results});
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

// Create a new column for a board
exports.newColumn = (req, res) => {
    const {boardId, name, position} = req.body;
    const sql = 'INSERT INTO columns (board_id, name, position) VALUES (?, ?, ?)';
    try {
        connection.query(sql, [boardId, name, position], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp({code: 200, results: results});
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
}

// Update a column
exports.updateColumn = (req, res) => {
    const { columnId } = req.params;
    const { name, position } = req.body;
    try {
        const sql = 'UPDATE columns SET name = ?, position = ? WHERE id = ?';
        connection.query(sql, [name, position, columnId], (error, results) => {
            if (error) res.status(400).jsonp({code: 404, errorMassage: error});
            res.status(200).jsonp({code: 200, results: results});
        });
    } catch (e) {
        console.log(e);
        res.status(500).jsonp({code: 500, errorMassage: e});
    }
};

//Delete a column from a board
exports.deleteColumn = (req, res) => {
    try {
        const {columnId} = req.params;
        connection.beginTransaction((err) => {
            if (err) throw err;
            const selectColumnSql = 'SELECT * FROM columns WHERE id = ?';
            const updateCardSql = 'UPDATE cards SET column_id = ?, position = ? WHERE id = ?';
            const deleteColumnSql = 'DELETE FROM columns WHERE id = ?';
            connection.query(selectColumnSql, [columnId], (error, results) => {
                if (error) {
                    connection.rollback(() => {
                        throw error;
                    });
                }
                const column = results[0];
                // Get the previous column
                const selectPreviousColumnSql = 'SELECT * FROM columns WHERE board_id = ? AND position = ? LIMIT 1';
                connection.query(selectPreviousColumnSql, [column.board_id, column.position - 1], (error, results) => {
                    if (error) {
                        connection.rollback(() => {
                            throw error;
                        });
                    }
                    const previousColumn = results[0];
                    connection.query(deleteColumnSql, [columnId], (error) => {
                        if (error) {
                            connection.rollback(() => {
                                throw error;
                            });
                        }
                        // Update card position if there is a previous column
                        if (previousColumn) {
                            connection.query(updateCardSql, [previousColumn.id, previousColumn.card_count, columnId], (error) => {
                                if (error) {
                                    connection.rollback(() => {
                                        throw error;
                                    });
                                }
                            });
                        }
                        connection.commit((err) => {
                            if (err) {
                                connection.rollback(() => {
                                    throw err;
                                });
                            }
                            res.status(200).jsonp({code: 200, results: results});
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({code: 500, errorMassage: error});
    }
};