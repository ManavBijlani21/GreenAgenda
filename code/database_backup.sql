-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: Website_Database
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `street_number` varchar(10) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(40) DEFAULT NULL,
  `postal_code` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (1,'Site Street','1a','Site City','Site State','5173'),(2,'City street','2','Adelaide','SA','9039'),(3,'Rundle Mall','456','Adelaide','SA','5000'),(4,'King William Street','123','Adelaide','SA','5000'),(5,'Gouger Street','789','Adelaide','SA','5000'),(6,'North Terrace','10','Adelaide','SA','5000'),(7,'Flinders Street','1-2','Adelaide','SA','5000'),(8,'Morphett Street','220','Adelaide','SA','5000'),(9,'Wakefield Street','90','Adelaide','SA','5000');
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Branch`
--

DROP TABLE IF EXISTS `Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_phone_number` char(10) DEFAULT NULL,
  `branch_email_id` varchar(255) DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `manager_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `address_id` (`address_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `Branch_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `Address` (`address_id`) ON DELETE CASCADE,
  CONSTRAINT `Branch_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `User` (`email_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branch`
--

LOCK TABLES `Branch` WRITE;
/*!40000 ALTER TABLE `Branch` DISABLE KEYS */;
INSERT INTO `Branch` VALUES (3,'1234567890','morphetstreet@gmail.com',7,'manager.sarah@gmail.com'),(4,'0192992929','wakefieldstreet@gmail.com',8,'manager.ellie@gmail.com');
/*!40000 ALTER TABLE `Branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `accessibility_status` varchar(10) DEFAULT NULL,
  `rsvp_bool_check` int DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `branch_id` int NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `email_id` (`email_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `User` (`email_id`) ON DELETE SET NULL,
  CONSTRAINT `Event_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `Branch` (`branch_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (3,'Yoga day','International Day of Yoga holds significant importance globally as it promotes physical and\nmental well-being through ancient practices.','2024-06-14 08:00:18','2024-06-21','Morphett Street','public',1,'manager.sarah@gmail.com',3),(4,'Nature Day day','World Nature Conservation Day holds profound significance globally as it advocates for the protection and preservation\nof our natural environment.','2024-06-14 08:00:28','2024-12-21','wake field','private',1,'nicol33@gmail.com',4);
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RSVP`
--

DROP TABLE IF EXISTS `RSVP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RSVP` (
  `rsvp_id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`rsvp_id`),
  KEY `email_id` (`email_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `RSVP_ibfk_1` FOREIGN KEY (`email_id`) REFERENCES `User` (`email_id`) ON DELETE CASCADE,
  CONSTRAINT `RSVP_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RSVP`
--

LOCK TABLES `RSVP` WRITE;
/*!40000 ALTER TABLE `RSVP` DISABLE KEYS */;
INSERT INTO `RSVP` VALUES (3,'2024-06-19','2024-06-14 08:03:01','Confirmed','jessicam23@gmail.com',3),(4,'2024-12-10','2024-06-14 08:03:16','Confirmed','nicol33@gmail.com',4);
/*!40000 ALTER TABLE `RSVP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` char(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type` varchar(15) DEFAULT NULL,
  `email_id` varchar(255) NOT NULL,
  `address_id` int NOT NULL,
  PRIMARY KEY (`email_id`),
  UNIQUE KEY `email_id` (`email_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `Address` (`address_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('Jessica','Miller','0474720299','$2b$10$V9BlySFRAsLsW1d6iWKTSe/9vC0hpUaCwvgbQDh6zWEeInCXUA45C','participant','jessicam23@gmail.com',5),('Ellie','Brown','0203017590','$2b$10$1CTobs0bKZhMcuHVzcWEaO/sNXp1SCOyHiPdkBfHJw6JsVPoz0JpO','manager','manager.ellie@gmail.com',4),('Sarah','Johnson','0474702299','$2b$10$09FhZhI27Wtu9tD3l2GNw.ROKcQ2PVY3qFH7SU2LjIYQomYBmUODW','manager','manager.sarah@gmail.com',3),('Nicol','Moore','0234017590','$2b$10$o5FpqTBVEMAKKbkKcGEQIuy1Jh7NxOm5hg4vCrIWMAD10DA1MFwtu','participant','nicol33@gmail.com',6),('Temp','Admin',NULL,'$2b$10$de85wTQnLdk.Y3rXLjP.BOGpXC0pVMSQmRgqBceFzVYKPW0xNo9cS','admin','temp@testing.com',1);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserBranch`
--

DROP TABLE IF EXISTS `UserBranch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserBranch` (
  `user_id` varchar(255) NOT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `UserBranch_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`email_id`) ON DELETE CASCADE,
  CONSTRAINT `UserBranch_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `Branch` (`branch_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserBranch`
--

LOCK TABLES `UserBranch` WRITE;
/*!40000 ALTER TABLE `UserBranch` DISABLE KEYS */;
INSERT INTO `UserBranch` VALUES ('jessicam23@gmail.com',3),('nicol33@gmail.com',4);
/*!40000 ALTER TABLE `UserBranch` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14  8:04:28
