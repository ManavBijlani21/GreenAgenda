# Run Instructions, run in /code directory
navigate to the /code directory and in there run the following commands, also the testInfo.txt file contains the login credentials for demo accounts

service mysql start

mysql (enter MYSQL CLI)

CREATE database Website_Database (creates a database within mysql)

exit (mysql CLI exit to run CLI commands in terminal)

mysql < database_backup.sql (Command to import the database dump)

mysqldump --databases Website_Database > database_backup.sql (After making the changes to the database, or to save at anypoint)

npm start (not server and DB running, next commands are to stop db and server)

ctrl+c (stop the npm server running, has to be in the terminal the server was started in)

service mysql stop (stops the databse running, should save a most recent copy of the DB just before this using the above dump command)

# Template Repository for COMP SCI 2207/7207 Web & Database Computing (2023 Semester 1)

Contains environment files for WDC 2023. Copy this template for a general sandbox.

Auto commit/push/sync to Github is disabled by default in this template repository.
Enable the GitDoc extension to use this fucntionality (either in your VSCode settings, or in the Dev Container settings)

## Wher to find Milestone 1

The milestone 1 documents can be found in the 'docs' folder as well as another README explaining where every part including the rubric is.

## Folder structure and general workflow documentation:

Generally from root docs means any written work for submissions and code is the folder with the express server. Generally for addition of a new webpage copy the "default.html" file and rename the copy to the webpage name then add the route where needed either in user.js or index.js. Further user index.js for all PUBLIC URLs and any routes in user.js will have the checks for user login and appropriate site access before letting and operations be conducted. Regarding css, "default.html" will include the standard site stylings and header and footer so add any new stylings using a second external stylesheet using the same name as the new webpage but ending in the ".css" extension instead of ".html" also copy the default.js file and rename it and change the script tag for external JS. Also regarding uploads to github, for this initial set-up everything will go directly to main but any actual implementations and so forth must be done as branch merges going forward. For variable naming standard refer to dataplan and use the names from the "Data Elements" column and "Format" column to determine the structure of AJAX query results (they should all be snake case). For CSS use flexbox and margins are not allowed, if needed use grid for formatting and wrap the component in a parent div and use padding in the parent div inplace of margin on the origional component.
