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
