-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu_table`
--

DROP TABLE IF EXISTS `menu_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(45) NOT NULL,
  `menu_path` varchar(45) DEFAULT NULL,
  `menu_parent` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '0',
  `is_deleted` int NOT NULL DEFAULT '0',
  `created_id` int NOT NULL,
  `created_time` varchar(45) NOT NULL,
  `updated_id` int DEFAULT NULL,
  `updated_time` varchar(45) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_table`
--

LOCK TABLES `menu_table` WRITE;
/*!40000 ALTER TABLE `menu_table` DISABLE KEYS */;
INSERT INTO `menu_table` VALUES (1,'测试','/测试',0,0,1,6,'2024/2/29 20:25',6,'2024/3/1 15:11',NULL),(2,'测试123','/测试123',0,1,1,6,'2024/3/1 12:49',6,'2024/3/1 15:11',NULL),(3,'测试333','/测试333',1,0,1,6,'2024/3/1 12:49',6,'2024/3/1 15:11',NULL),(4,'测试666','/测试666',3,1,1,6,'2024/3/1 13:58',6,'2024/3/1 15:6',NULL),(5,'123','123',3,1,0,6,'2024/3/1 15:8',6,'2024/3/1 15:10',NULL),(6,'123','123',1,0,1,6,'2024/3/1 15:9',6,'2024/3/1 15:11',NULL),(7,'1234','1234',6,0,1,6,'2024/3/1 15:10',6,'2024/3/1 15:11',NULL),(8,'12344','12344',7,0,1,6,'2024/3/1 15:11',6,'2024/3/1 15:11',NULL),(9,'系统管理','',0,0,0,6,'2024/3/1 15:14',6,'2024/3/4 14:19','carbon:application-web'),(10,'菜单管理','/system/menu',9,0,0,6,'2024/3/1 15:15',NULL,NULL,NULL),(11,'角色管理','/system/role',9,0,0,6,'2024/3/1 15:16',NULL,NULL,NULL),(12,'用户管理','/system/user',9,0,0,6,'2024/3/1 15:16',NULL,NULL,NULL),(13,'标签管理','/system/tabs',9,0,0,6,'2024/3/1 15:16',6,'2024/3/1 15:22',NULL),(14,'文章管理','',0,0,0,6,'2024/3/1 17:55',6,'2024/3/4 14:21','pixelarticons:calendar-text'),(15,'文章审核','/article/audit',14,0,0,6,'2024/3/1 18:5',NULL,NULL,NULL),(16,'权限管理','',0,0,0,6,'2024/3/4 10:42',6,'2024/3/4 14:22','icon-park-twotone:folder-lock-one'),(17,'菜单权限','/permissions/menuPermissions',16,0,0,6,'2024/3/4 10:43',NULL,NULL,NULL);
/*!40000 ALTER TABLE `menu_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05 19:38:28
