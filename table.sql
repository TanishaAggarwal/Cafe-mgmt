CREATE TABLE user(
  id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(250),
	contact_number VARCHAR(20),
	email VARCHAR(30),
	password VARCHAR(230),
	status VARCHAR(20),
	role VARCHAR(20),
	UNIQUE (email) 
);

INSERT INTO user (name, contact_number, email, password, status, role) VALUES ('Admin', '8077097654', 'admin@gmail.com', 'admin123', 'true', 'admin');