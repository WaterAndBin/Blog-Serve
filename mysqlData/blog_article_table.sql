CREATE DATABASE  IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;
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
-- Table structure for table `article_table`
--

DROP TABLE IF EXISTS `article_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(45) NOT NULL,
  `article_cover` varchar(100) DEFAULT NULL,
  `article_content` varchar(10000) NOT NULL,
  `author_id` int NOT NULL,
  `created_time` varchar(45) NOT NULL,
  `updated_time` varchar(45) DEFAULT NULL,
  `tabs_id` varchar(100) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `is_deleted` int NOT NULL DEFAULT '0',
  `type` int NOT NULL DEFAULT '0',
  `auditors` int DEFAULT NULL COMMENT '审核人员',
  `review_time` varchar(45) DEFAULT NULL COMMENT '审核时间',
  `reject_reason` varchar(200) DEFAULT NULL COMMENT '驳回原因',
  `reject_type` int DEFAULT '-1' COMMENT '驳回类型',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_table`
--

LOCK TABLES `article_table` WRITE;
/*!40000 ALTER TABLE `article_table` DISABLE KEYS */;
INSERT INTO `article_table` VALUES (1,'123123123','public/images/file-17099822811581709630237972.jpg','<p>123 <strong>4<s>6</s>5</strong> <strong>test</strong> ddd <strong><u>a<i>sd78</i>9123</u></strong></p><p><strong><u>123213</u></strong></p>',6,'2024/3/9 19:04',NULL,NULL,3,0,0,6,'2024/3/11 17:00','测试123',3),(2,'王冰冰','public/images/file-171015259395320210414194657_cf14d.jpg','<p>123 <strong>4<s>6</s>5</strong> <strong>test</strong> ddd <strong><u>a<i>sd78</i>9</u></strong></p><p><strong><u>213123213123123</u></strong></p><hr><p>12312313</p><h1>测试标题</h1><div class=\"pre-box\" contenteditable=\"false\"><div class=\"pre-header\"><div class=\"pre-header-left\"><div></div><div></div><div></div></div><div class=\"pre-header-right\"><button>删除</button></div></div><pre class=\"pre-body\"><code contenteditable=\"true\"><span class=\"pre-code\">213123测试<br></span><span class=\"pre-code\"><div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: Consolas, &quot;Courier New&quot;, monospace; font-weight: normal; font-size: 14px; line-height: 19px; text-wrap: nowrap;\"><div><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">el-dialog</span></div><div>&nbsp; &nbsp; &nbsp; <span style=\"color: #9cdcfe;\">v-model</span>=\"<span style=\"color: #9cdcfe;\">show</span>\"</div><div>&nbsp; &nbsp; &nbsp; <span style=\"color: #9cdcfe;\">width</span>=<span style=\"color: #ce9178;\">\"1100px\"</span></div><div>&nbsp; &nbsp; &nbsp; <span style=\"color: #9cdcfe;\">center</span></div><div>&nbsp; &nbsp; &nbsp; :<span style=\"color: #9cdcfe;\">before-close</span>=\"</div><div>&nbsp; &nbsp; &nbsp; &nbsp; () <span style=\"color: #569cd6;\">=&gt;</span> {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style=\"color: #dcdcaa;\">handleClose</span>(<span style=\"color: #ce9178;\">\'cancel\'</span>)</div><div>&nbsp; &nbsp; &nbsp; &nbsp; }</div><div>&nbsp; &nbsp; &nbsp; \"</div><div>&nbsp; &nbsp; &nbsp; :<span style=\"color: #9cdcfe;\">close-on-click-modal</span>=\"<span style=\"color: #569cd6;\">false</span>\"</div><div>&nbsp; &nbsp; &nbsp; :<span style=\"color: #9cdcfe;\">close-on-press-escape</span>=\"<span style=\"color: #569cd6;\">false</span>\"</div><div>&nbsp; &nbsp; <span style=\"color: #808080;\">&gt;</span></div></div></span></code></pre></div>',6,'2024/3/11 18:23',NULL,NULL,2,0,0,6,'2024/3/11 18:24','',-1);
/*!40000 ALTER TABLE `article_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-12 10:14:15
