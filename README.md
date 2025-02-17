# GreenAgenda
![alt text](/code/public/images/Logo.jpg)
#
GreenAgenda is a community initiative across Australia that regularly organizes social events for individuals passionate about sustainability, afforestation and environmental conservation. We host activities focused on tree planting, maintaining clean spaces and raising awareness about ecological issues. Our mission is to foster a healthier planet for both present and future generations.

## Table of Contents
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Screenshots] (#screenshots)
- [Project Setup](#setup-and-deployment)
- [Team](#team)

## Key Features
• **Overview of GreenAgenda** – Provides users with an overview of the mission behind GreenAgenda, featuring an intuitive and visually appealing UI with a green theme.

• **Open Donations** – Informs users about active donation opportunities, allowing them to contribute to the organization.

• **Upcoming Events** – Displays a list of upcoming events across multiple states, including event names, times, and locations for each event.

• **GreenBot** – An AI-powered chatbot integrated to assist users with queries related to events and in general.

• **Community and Feedback** – Users can view feedback from past community members, fetched from the database and displayed with pagination. Registered users can also provide their own feedback.

• **Join the Community** – Enables users to register an account, participate in discussions, and contribute feedback.

## Screenshots

### Sign Up / Login Page
<p align="center">
  <img src="/code/public/images/sign-up-readme.jpg" width = "350px" height = "250px">
  <img src="/code/public/images/login-readme.jpg" width = "350px" height = "250px">
</p>

### Homepage
<p align="center">
  <img src="/code/public/images/homepage-readme.jpg">
</p>

### AI-powered chatbot
<p align="center">
  <img src="/code/public/images/chatbot-1-readme.jpg" width = "350px" height = "450px">
  <img src="/code/public/images/chatbot-2-readme.jpg" width = "350px" height = "450px">
</p>

### Upcoming events
![Demo](/code/public/images/events_rendering.gif)

### About page
<p align="center">
  <img src="/code/public/images/about-1-readme.jpg">
</p>

### Support page
<p align="center">
  <img src="/code/public/images/support-1-readme.jpg" width = "400px" height = "300px">
  <img src="/code/public/images/support-2-readme.jpg" width = "400px" height = "300px">
</p>

### Community & Feedback page
<p align="center">
  <img src="/code/public/images/community-1-readme.jpg">
  <img src="/code/public/images/community-2-readme.jpg">
</p>

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, Vue.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Libraries:** Bootstrap
- **Tools:** Insomnia (API Testing), Git

## Project Setup

1. **Navigate to the `/code` directory**:
   ```bash
   cd /code

2. Start the MySQL service:
    ```bash
    service mysql start

3. Enter the MySQL CLI:
    ```bash
    mysql

4. Create the database within MySQL:
    ```bash
    CREATE DATABASE Website_Database;

5. Exit the MySQL CLI:
    ```bash
    exit

6. Import the database dump:
    ```bash
    mysql < database_backup.sql
    mysqldump --databases Website_Database > database_backup.sql

7. Install missing packages and start the server
    ```bash
    npm install
    npm start

8. To stop the server and database
    • Press Ctrl + C in the terminal to stop the npm server.
    • Stop MySQL service
        ```bash
        service mysql stop

## Team
• **Manav Bijlani**
• **Faisal Umar**
• **Jack Rowlands**
• **Sharzil Hasnine**

