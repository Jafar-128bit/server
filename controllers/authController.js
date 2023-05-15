const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/databaseConnect');

exports.signIn = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM login WHERE username = ?';
    connection.query(sql, [username], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error signing in' });
        } else if (results.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
        } else {
            // Check password
            const match = await bcrypt.compare(password, results[0].password);
            if (!match) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                // Create and sign JWT
                const token = jwt.sign({ id: results[0].id }, 'tempkeyfornow123', { expiresIn: '1h' });
                res.status(200).json({ message: 'Sign in successful', token: token });
            }
        }
    });
};

exports.signUp = async (req, res) => {
    const { username, password, email } = req.body;
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save user to database
    const sql = 'INSERT INTO login (username, password, email) VALUES (?, ?, ?)';
    connection.query(sql, [username, hashedPassword, email], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating user' });
        } else {
            res.status(200).json({ message: 'User created successfully' });
        }
    });
};