CREATE DATABASE Website_Database;

 Use Website_Database;

 CREATE TABLE User (
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number CHAR(10),
    password VARCHAR(50) NOT NULL,
    user_type VARCHAR(15),
    email_id VARCHAR(255) UNIQUE,
    PRIMARY KEY (email_id)
 );

 CREATE TABLE Address(
    address_id INT NOT NULL,
    street VARCHAR(100),
    street_number VARCHAR(10),
    city VARCHAR(20),
    state VARCHAR(40),
    postal_code VARCHAR(6),
    PRIMARY KEY (address_id)
 );

ALTER TABLE User ADD COLUMN address_id INT NOT NULL;

ALTER TABLE User ADD FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE;

CREATE TABLE Branch(
    branch_id INT NOT NULL,
    branch_phone_number char(10),
    branch_email_id varchar(255),
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

ALTER TABLE Branch ADD PRIMARY KEY (branch_id);

CREATE TABLE Job(
    job_id INT NOT NULL,
    PRIMARY KEY(job_id),
    title VARCHAR(20),
    status VARCHAR(255),
    description TEXT,
    email_id VARCHAR(255) NULL,
    FOREIGN KEY (email_id) REFERENCES User(email_id) ON DELETE SET NULL
);

CREATE TABLE Event(
    event_id int,
    PRIMARY KEY(event_id),
    title VARCHAR(255),
    description TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date DATE,
    location VARCHAR(100),
    accessibility_status VARCHAR(10),
    rsvp_bool_check INT,
    email_id VARCHAR(255) NULL,
    FOREIGN KEY (email_id) REFERENCES User(email_id) ON DELETE SET NULL,
    branch_id INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id) ON DELETE CASCADE
);


CREATE TABLE RSVP(
    rsvp_id INT,
    PRIMARY KEY(rsvp_id),
    date DATE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    email_id VARCHAR(255) NULL,
    FOREIGN KEY (email_id) REFERENCES User(email_id) ON DELETE CASCADE,
    event_id INT,
    FOREIGN KEY (event_id) REFERENCES Event(event_id) ON DELETE CASCADE
);

ALTER TABLE RSVP MODIFY rsvp_id INT AUTO_INCREMENT;




