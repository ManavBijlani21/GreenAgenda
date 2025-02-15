# GreenAgenda
![alt text](/code/public/images/Logo.jpg)
GreenAgenda is a community initiative across Australia that regularly organizes social events for individuals passionate about sustainability, afforestation and environmental conservation. We host activities focused on tree planting, maintaining clean spaces and raising awareness about ecological issues. Our mission is to foster a healthier planet for both present and future generations.

# Table of Contents
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Project Setup](#setup-and-deployment)
- [Backend Integration](#backend-integration)
- [Frontend Deployment](#frontend-deployment)
- [Team](#team)


# Run Instructions, run in /code directory
navigate to the /code directory and in there run the following commands, also the testInfo.txt file contains the login credentials for demo accounts

service mysql start

mysql (enter MYSQL CLI)

CREATE database Website_Database (creates a database within mysql)

exit (mysql CLI exit to run CLI commands in terminal)

mysql < database_backup.sql (Command to import the database dump)

mysqldump --databases Website_Database > database_backup.sql (After making the changes to the database, or to save at anypoint)

npm install (install any missing packages)

npm install nodemailer

npm start (not server and DB running, next commands are to stop db and server)

ctrl+c (stop the npm server running, has to be in the terminal the server was started in)

service mysql stop (stops the databse running, should save a most recent copy of the DB just before this using the above dump command)

![alt text](/code/public/images/Logo.jpg)
![Demo](/code/public/images/download.gif)
