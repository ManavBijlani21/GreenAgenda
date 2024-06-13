CREATE DATABASE IF NOT EXISTS Website_Database;

USE Website_Database;

CREATE TABLE IF NOT EXISTS Address(
    address_id INT NOT NULL AUTO_INCREMENT,
    street VARCHAR(100),
    street_number VARCHAR(10),
    city VARCHAR(20),
    state VARCHAR(40),
    postal_code VARCHAR(6),
    PRIMARY KEY (address_id)
);

CREATE TABLE IF NOT EXISTS User (
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number CHAR(10),
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(15),
    email_id VARCHAR(255) UNIQUE,
    address_id INT,
    PRIMARY KEY (email_id),
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Branch(
    branch_id INT NOT NULL AUTO_INCREMENT,
    branch_name VARCHAR(100),
    PRIMARY KEY(branch_id),
    branch_phone_number CHAR(10),
    branch_email_id VARCHAR(255),
    address_id INT,
    manager_id VARCHAR(255),
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES User(email_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Job(
    job_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(job_id),
    title VARCHAR(20),
    status VARCHAR(255),
    description TEXT,
    email_id VARCHAR(255) NULL,
    FOREIGN KEY (email_id) REFERENCES User(email_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Event(
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

CREATE TABLE IF NOT EXISTS RSVP(
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
