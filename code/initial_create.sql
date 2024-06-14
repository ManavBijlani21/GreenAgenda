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
    address_id INT NOT NULL AUTO_INCREMENT,
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
    branch_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(branch_id),
    branch_phone_number char(10),
    branch_email_id varchar(255),
    address_id INT,
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

CREATE TABLE Event(
    event_id INT AUTO_INCREMENT,
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
    rsvp_id INT AUTO_INCREMENT,
    PRIMARY KEY(rsvp_id),
    date DATE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    email_id VARCHAR(255) NULL,
    FOREIGN KEY (email_id) REFERENCES User(email_id) ON DELETE CASCADE,
    event_id INT,
    FOREIGN KEY (event_id) REFERENCES Event(event_id) ON DELETE CASCADE
);

ALTER TABLE User MODIFY password VARCHAR(255);

ALTER TABLE Branch ADD COLUMN manager_id varchar(255);

ALTER TABLE Branch ADD FOREIGN KEY (manager_id) REFERENCES User(email_id) ON DELETE SET NULL;




Create table UserBranches( user_branch_id int NOT NULL AUTO_INCREMENT,  PRIMARY KEY (user_branch_id),  email_id varchar(255) NOT NULL,  FOREIGN KEY (email_id) REFERENCES User(email_id) ON DELETE CASCADE,   branch_id int NULL,  FOREIGN KEY (branch_id) REFERENCES Branch(branch_id) ON DELETE SET NULL );