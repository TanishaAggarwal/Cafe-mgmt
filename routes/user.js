const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config;

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

router.post('login', (req, res) => {
	let user = req.body;
	query = 'SELECT email, password, role, status FROM user WHERE email = ?';
	connection.query(query, [user.email], (err, results) => {
		if (!err) {
			if (results.length <= 0 || results[0] != user.password) {
				return res.status(401).json({message : 'Incorrect usrername or password'});
			} else if (results[0].status === 'false') {
				return res.status(401).json({ message: 'Wait for adminal approval.'});
			} else if (results[0].password == user.password) {
				const response = { email: results[0].email, role: results[0].role};
				const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h'});
				res.status(200).json({token : accessToken});
				return 
			} else {
				return res.status(400).json({ message: 'Something went wrong.'})
			}
		} else {
			return res.status(500).json(err);
		}
	});
});

module.exports = router;