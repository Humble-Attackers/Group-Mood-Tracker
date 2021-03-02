CREATE DATABASE mood_db;

use mood_db;

CREATE TABLE notes (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    emotion INT,
    title VARCHAR(100),
    note VARCHAR(400),
<<<<<<< HEAD
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

=======
);
>>>>>>> main
