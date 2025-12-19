-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: task_management
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('todo','in_progress','done') NOT NULL DEFAULT 'todo',
  `deadline` date NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `FK_6ea2c1c13f01b7a383ebbeaebb0` (`user_id`),
  CONSTRAINT `FK_6ea2c1c13f01b7a383ebbeaebb0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'testing testing2','test123','todo','2030-06-15','test123','2025-12-18 10:33:31.211079','2025-12-18 12:40:52.000000',1),(2,'testing 2','test123','todo','2030-06-15','test123','2025-12-18 10:34:20.207191','2025-12-18 10:34:20.207191',1),(4,'testing 2','lorem ipsum dolor','done','2030-06-20','fullname1','2025-12-18 11:06:21.462900','2025-12-19 03:27:03.000000',2),(5,'testing 5','lorem ipsum dolor','todo','2030-06-20','fullname1','2025-12-18 12:45:07.872572','2025-12-18 12:45:07.872572',2),(6,'TESTING 10','fesfio  iojseio  oefs o','in_progress','2026-01-23','fullname1','2025-12-19 03:12:27.465716','2025-12-19 03:12:27.465716',2),(7,'Testtttt',NULL,'todo','2026-12-25','fullname1','2025-12-19 03:57:39.140240','2025-12-19 03:57:39.140240',2),(8,'testtt','sfgess efes f esefs f','in_progress','2026-04-16','naufalg','2025-12-19 04:09:50.762816','2025-12-19 04:09:50.762816',3),(9,'TEST 345','fsgse fes fes f esfeseshdrdrdttj','in_progress','2026-01-22','fullname1','2025-12-19 05:25:28.071744','2025-12-19 05:25:28.071744',2),(10,'gdrgdrg','rfdrgdrg','in_progress','2026-09-08','fullname1','2025-12-19 05:25:49.235911','2025-12-19 05:25:49.235911',2),(11,'fsfef','esfesf es','todo','2026-04-02','fullname1','2025-12-19 05:26:04.621414','2025-12-19 05:26:04.621414',2),(12,'testing 15','lorem ipsum dolor','todo','2030-06-20','fullname1','2025-12-19 06:26:22.778755','2025-12-19 06:26:22.778755',2);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testing full name','test123','test@testing.com','$2b$10$TAsUuALY0lp2nBQPMpPymuXenEtH.RsXmAW6mjtWRrCSboqR71RpS','2025-12-18 07:59:23.785112','2025-12-18 07:59:23.785112'),(2,'full name one','fullname1','test123@testing.com','$2b$10$nDO27ifnPXsT/w0plFKitOEIppAPqEUtcZfM7sLHKkVe0cYvWryCa','2025-12-18 10:46:31.890075','2025-12-18 10:46:31.890075'),(3,'Muhammad Naufal Ghozi','naufalg','naufal@mail.com','$2b$10$TApl7ahBkkenf1ZPmxCXueT3q2MZEAtlLXsY3uW5Lk1iWAuNWE81K','2025-12-19 01:45:36.033478','2025-12-19 01:45:36.033478');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'task_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-19 13:35:22
