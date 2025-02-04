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
-- Current Database: `Website_Database`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Website_Database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Website_Database`;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (1,'Site Street','1a','Site City','Site State','5173'),(2,'City street','2','Adelaide','SA','9039'),(3,'Rundle Mall','456','Adelaide','SA','5000'),(4,'King William Street','123','Adelaide','SA','5000'),(5,'Gouger Street','789','Adelaide','SA','5000'),(6,'North Terrace','10','Adelaide','SA','5000'),(7,'Flinders Street','1-2','Adelaide','SA','5000'),(8,'Morphett Street','220','Adelaide','SA','5000'),(9,'Wakefield Street','90','Adelaide','SA','5000'),(10,'','','','',NULL),(11,'None','None','None','None',NULL),(12,'None','None','None','None',NULL),(13,'null','null','null','null',NULL),(14,'null','null','null','null',NULL),(15,'Test Address','5A Street','Sydney','NSW',NULL),(16,'Test102STRR','Test102Add','CHECK','State',NULL),(17,'Test102STRR','Test102Add','CHECK','State',NULL),(18,'City','Test','Stree','Victoria',NULL),(19,'Fifth','5C','Victoria','SA',NULL);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
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
  `email_id` varchar(255) NOT NULL,
  `address_id` int NOT NULL,
  `feedback` text,
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
INSERT INTO `User` VALUES ('Aisha','Patel','0475079723','password123','a.patel@gmail.com',8,'GreenAgenda\'s sustainable living workshop opened my eyes to so many simple yet effective ways to reduce my carbon footprint. I\'ve already started composting and using public transport more often. It\'s amazing how small changes can add up to make a big difference.'),('Emma','Thompson','0475079723','password123','emma.t@gmail.com',10,'Participating in GreenAgenda\'s community planting day was an eye-opening experience. It\'s amazing to see how a small group of dedicated individuals can make such a positive impact on our local environment. I can\'t wait for the next event!'),('Jessica','Miller','0474720299','$2b$10$V9BlySFRAsLsW1d6iWKTSe/9vC0hpUaCwvgbQDh6zWEeInCXUA45C','jessicam23@gmail.com',5,'The beach cleanup event was a fantastic experience. It was amazing to see how a group of passionate individuals could make such a difference in preserving the beach\'s natural beauty. By removing trash and debris, we not only improved the environment but also helped protect marine life. It was inspiring to be part of an initiative that had such a positive impact, and I\'m already looking forward to the next opportunity to give back!'),('Liam','O\'Connor','0475079723','password123','liam.oconnor@gmail.com',8,'The wildlife habitat restoration project by GreenAgenda was truly inspiring. Seeing the immediate impact of our work on local ecosystems was rewarding. It\'s comforting to know that our efforts are making a real difference for endangered species.'),('Michael','Chen','0475079723','password123','m.chen@gmail.com',1,'The sustainable living workshop organized by GreenAgenda changed my perspective on daily habits. I\'ve implemented several eco-friendly practices at home, and it feels great to be part of a community that cares so deeply about our planet\'s future.'),('Ellie','Brown','0203017590','$2b$10$1CTobs0bKZhMcuHVzcWEaO/sNXp1SCOyHiPdkBfHJw6JsVPoz0JpO','manager.ellie@gmail.com',4,'The eco-friendly activities I participated in truly opened my eyes to how small changes can have a big impact on the environment. Whether it was organizing a community clean-up or learning new ways to reduce waste, these experiences have motivated me to adopt more sustainable practices in my daily life. '),('Temp','Admin',NULL,'$2b$10$de85wTQnLdk.Y3rXLjP.BOGpXC0pVMSQmRgqBceFzVYKPW0xNo9cS','temp@testing.com',1,NULL),('Test102','Last102','0457010102','$2b$10$FIHif.xxhN6SEo4MTo9Dke3QKFcj3gJo789hLB4PhHuTBHQdPbFEq','test102@gmail.com',17,NULL),('Test103','Last103','0475079789','$2b$10$hJTUOjAQPbp6akirynOzdeD9d9lnqtVAozqbowJZYLzQ/i1/ICrI6','test103@gmail.com',18,NULL),('Test101','Last101','0478070766','$2b$10$W0P0d3V30xasrj/3OuQoAu5FD5YguzSB8z1K1eqCaLcNTR6rnqofC','test121@gmail.com',15,NULL),('Logann','Everett','0475074591','$2b$10$E4306GqbszbWIrgrpKp4Xelh0Xzx2piG6ynoAHt94oJkfFhjQ.Ug2','testuser105@gmail.com',19,'The GreenAgenda solar panel project was incredibly motivating. Witnessing the direct benefits of our work on sustainable energy was fulfilling. It’s reassuring to know that our efforts contribute to a greener future.');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-04 14:49:46
