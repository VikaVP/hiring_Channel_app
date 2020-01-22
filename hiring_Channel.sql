-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: hiring_Channel
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `password` text NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'vika','1234','company',NULL),(2,'Nani','[object Promise]','engineer','nani@gmail.com'),(3,'Nani','123','engineer','nani@gmail.com'),(4,'Nani','[object Promise]','engineer','nani@gmail.com'),(5,'Nani','123','engineer','nani@gmail.com'),(6,'Nani','123','engineer','nani@gmail.com'),(7,'Nani','$2b$10$KiVTfMn8QFmB2988wdXM3OprGnV3pPhRNIclbPeiD65W6bZ4CHlPq','engineer','nani@gmail.com'),(8,'wika','$2b$10$0i5JDJSoKkQHm.mrFImm.OqFh6GRNNjh4mucP698wUEYzLyT4p3lG','engineer','hjh@gmail.com'),(9,'wika','$2b$10$CP0N7hD8Rkj0ogMFqEP9OeVxtayM/uMFqJVwC62YdOsohS2Ss67LK','company','wika@gmail.com'),(10,'Silo','$2b$10$RbCLU.0kj1zYjyI4nWfUGuUOVmZQPTbIHXM8dTTQMDO3dbbB89H/W','company','silo@gmail.com'),(11,'silo','$2b$10$abLf0b6JEyW6BonHE/BWL.MSQvb5BNJtgXII6eQCebiZfBhU1CSi6','company','silo@gmail.com'),(12,'Lala','$2b$10$WfqQMWdGGl1QxQIf8wWDleqfmKzVuspVsSEaKEpvJczzdWtFZE626','engineer','lala123@gmail.com'),(13,'Lastri','$2b$10$p3it.eNj9u1osqNwUYw/0eWXhdaVy1O88Y40JCjK4ItjvlDskohv2','engineer','last@gmail.com');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyData`
--

DROP TABLE IF EXISTS `companyData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companyData` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Logo` varchar(100) DEFAULT NULL,
  `Location` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyData`
--

LOCK TABLES `companyData` WRITE;
/*!40000 ALTER TABLE `companyData` DISABLE KEYS */;
INSERT INTO `companyData` VALUES (4,'Tokopedia','/images/image-1575956514590.png','Jakarta','Market Place','tokopedia@recruitment.com',''),(5,'Arkademy','/images/image-1576137773582.png','Jakarta','flatform course online','halo@arkademy.com',''),(6,'Microsoft','/images/image-22756.png','Washington, AS','Technology and software innovator','microsoft@service.com',''),(7,'Grab','/images/image-22926.png','Jakarta','Startup Ojek online','grab@service.com',''),(8,'Shopee','/images/image-23019.png','Jakarta','E-commerce','shopee@recruit.com',''),(15,'Warner Bros','/images/image-182537.jpg','USA','Entertain bussiness Management and Creative art','wb@info.com','$2b$10$jLvpz9ehL0/9HPI/JHrTYOlVhtS/.ZNqXIY7cYS1U8JJv3cS0QA2W');
/*!40000 ALTER TABLE `companyData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engineerData`
--

DROP TABLE IF EXISTS `engineerData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engineerData` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Skill` varchar(200) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Showcase` varchar(100) NOT NULL,
  `Date_created` date DEFAULT NULL,
  `Date_update` date DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `expected_salary` varchar(100) NOT NULL,
  `Photo` text,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engineerData`
--

LOCK TABLES `engineerData` WRITE;
/*!40000 ALTER TABLE `engineerData` DISABLE KEYS */;
INSERT INTO `engineerData` VALUES (22,'Wika Silo','Software Engineers','Javascript, React Js, Node Js, Python','Jakarta','1990-03-24','Building website','2019-12-02','2019-12-25','wikas@gmail.com','18000000','/images/image-14290.jpg',''),(23,'Mirna Khoirunnisa','Software Engineers','Java, MongoDB, ASP.net','Jakarta','1980-04-11','Logic analitical','2019-12-12',NULL,'mirna@gmail.com','18000000','/images/image-14636.jpg',''),(24,'Sarah Situmorang','Fullstack Javascript','Javascript, C#, C++, Node Js','Jakarta','1992-08-03','Programming website','2019-12-12',NULL,'sarah123@gmail.com','14000000','/images/image-14855.jpg',''),(25,'Ningrum Ajizah','Frontend Developer','Javascript, React js, Adobe Photoshop','Bandung','1981-10-03','Design website, Design illustrator, Artistic','2019-12-12',NULL,'ningrumaja@gmail.com','17000000','/images/image-15331.jpg',''),(26,'Abdul Hasan','Frontend Developer','Javascript, React js, MYSQL','Bandung','1977-10-05','Building website','2019-12-12',NULL,'abduldev@gmail.com','24000000','/images/image-15453.jpg',''),(27,'Srikandi Jessica','Backend Developer','Node js, Python, PHP, Java','Semarang','1989-10-11','Building website','2019-12-12',NULL,'jessikaok@gmail.com','16000000','/images/image-15643.jpg',''),(28,'Fajar Iqbal','Backend Developer','Node js, Python, PHP','Bogor','1993-05-12','Building website, Design website','2019-12-12',NULL,'fajariq123@gmail.com','14000000','/images/image-1593.jpg',''),(29,'Fajar Iqbal','Backend Developer','Node js, Python, PHP','Bogor','1993-05-12','Building website, Design website','2019-12-24','2019-12-24','fajariq123@gmail.com','14000000','/images/image-92029.jpg','123');
/*!40000 ALTER TABLE `engineerData` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-22 11:14:19
