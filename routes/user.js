const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/signup', (req, res) => {
	let user = req.body;
	query = 'SELECT email, password, role, status FROM user WHERE email=?';
	connection.query(query, [user.email], (err, results) => {
		if (!err) {
			if (results.email <= 0) {
				query = "INSERT INTO user (name, contact_number, email, password, status, role) VALUES (?,?,?,?, 'false', 'user')";
				connection.query(query, [user.name, user.contact_number, user.email, user.password], (err, results) => {
					if (!err) return res.status(200).json({message : 'Successfully Registered!'});
					else return res.status(400).json(err);
				});
			} else {
				return res.status(400).json({message : "Email Already exist."});
			}
		} else {
			return res.status(500).json(err);
		}
	});
});

module.exports = router;