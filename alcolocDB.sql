-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: alcoloc
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `annoncers`
--

DROP TABLE IF EXISTS `annoncers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annoncers` (
  `usrID` int unsigned NOT NULL AUTO_INCREMENT,
  `usrName` varchar(150) NOT NULL,
  `adrr` varchar(300) NOT NULL,
  `nbPlace` int unsigned NOT NULL,
  `ConsoNeeds` int unsigned NOT NULL,
  `AgeMin` int unsigned DEFAULT NULL,
  `AgeMax` int unsigned DEFAULT NULL,
  `titre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`usrID`),
  UNIQUE KEY `usrID` (`usrID`),
  UNIQUE KEY `usrName` (`usrName`,`adrr`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annoncers`
--

LOCK TABLES `annoncers` WRITE;
/*!40000 ALTER TABLE `annoncers` DISABLE KEYS */;
INSERT INTO `annoncers` VALUES (18,'La coloc-scopie','99 rue jules lesven, 29200 brest',3,8,20,21,'La dé crémaillère'),(19,'Louise pupuce','10 rue du swag, 75000 Paris',3,8,20,21,'une superbe soirée');
/*!40000 ALTER TABLE `annoncers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seekers`
--

DROP TABLE IF EXISTS `seekers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seekers` (
  `usrID` int unsigned NOT NULL AUTO_INCREMENT,
  `usrName` varchar(100) NOT NULL,
  `nbPers` int unsigned NOT NULL,
  `consoDisp` int unsigned DEFAULT NULL,
  `AgeMin` int unsigned NOT NULL,
  `AgeMax` int unsigned NOT NULL,
  PRIMARY KEY (`usrID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seekers`
--

LOCK TABLES `seekers` WRITE;
/*!40000 ALTER TABLE `seekers` DISABLE KEYS */;
INSERT INTO `seekers` VALUES (1,'ad lolo',3,8,20,21);
/*!40000 ALTER TABLE `seekers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  2:30:09
