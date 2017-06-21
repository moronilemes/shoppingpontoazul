-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: zizap
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Information Technologies'),(2,'Eletronics'),(3,'Clothing'),(4,'Music'),(5,'Games'),(6,'Telephony'),(7,'Food'),(8,'Tools');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `store` int(11) NOT NULL,
  `customer` int(11) NOT NULL,
  `message` varchar(350) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`store`,`timestamp`),
  KEY `fk_chat_store` (`store`),
  KEY `fk_chat_customer_idx` (`customer`),
  CONSTRAINT `fk_chat_customer` FOREIGN KEY (`customer`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_store` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,2,'cucarachas!','2017-06-21 02:50:16'),(1,2,'oi','2017-06-21 03:17:34'),(1,2,'o que tem feito?','2017-06-21 03:18:03'),(1,2,'ok','2017-06-21 03:18:42'),(1,2,'ok','2017-06-21 03:18:43'),(1,2,'ok','2017-06-21 03:18:44'),(1,2,'ok','2017-06-21 03:18:45'),(1,2,'pkpk','2017-06-21 03:18:46'),(1,2,'pkpk','2017-06-21 03:18:47'),(1,2,'ppk','2017-06-21 03:18:49'),(1,2,'pkpk','2017-06-21 03:18:50'),(1,2,'asdas','2017-06-21 03:18:52'),(1,2,'ok','2017-06-21 03:22:28'),(1,2,'asdasd','2017-06-21 03:22:29'),(1,2,'spdofksd','2017-06-21 03:22:30'),(1,2,'pokaspodka','2017-06-21 03:22:31'),(1,2,'pakspodkasp','2017-06-21 03:22:32'),(1,2,'paoskpdaso','2017-06-21 03:22:33'),(1,2,'oksdmsolkds','2017-06-21 03:22:34'),(1,2,'lknvlskv','2017-06-21 03:22:35'),(1,2,'poakspdokas','2017-06-21 03:22:37'),(1,2,'ksdvlksdvl','2017-06-21 03:22:38'),(1,2,'oaisjdoasijd','2017-06-21 03:22:40'),(1,2,'osidfosdijf','2017-06-21 03:22:42'),(1,2,'oiaoasd','2017-06-21 03:22:44');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store` int(11) NOT NULL,
  `name` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`,`store`),
  KEY `fk_customer_store` (`store`),
  CONSTRAINT `fk_customer_store` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,1,'Moroni Lemes','moronilemes@live.com','5555555');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `url` varchar(150) NOT NULL,
  `product` int(11) NOT NULL,
  UNIQUE KEY `url` (`url`,`product`),
  KEY `fk_image_product` (`product`),
  CONSTRAINT `fk_image_product` FOREIGN KEY (`product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `description` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_log_user` (`user`),
  CONSTRAINT `fk_log_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,1,'User logged in.','2017-06-06 00:30:54'),(2,1,'User logged in.','2017-06-06 01:30:42'),(3,1,'User logged in.','2017-06-06 01:32:35'),(4,1,'User logged out.','2017-06-06 02:09:10'),(5,1,'User logged in.','2017-06-06 02:11:50'),(6,1,'New user related to store.','2017-06-06 02:12:26'),(7,1,'User related to store updated.','2017-06-06 02:13:10'),(8,1,'User related to store deleted.','2017-06-06 02:13:22'),(9,1,'Category added to store.','2017-06-06 02:15:49'),(10,1,'Category altered to store.','2017-06-06 02:16:06'),(11,1,'Category deleted to store.','2017-06-06 02:16:18'),(12,1,'New category added.','2017-06-06 02:18:53'),(13,1,'Categories data changed.','2017-06-06 02:19:07'),(14,1,'Category deleted.','2017-06-06 02:19:15'),(15,1,'Store created.','2017-06-06 02:29:56'),(16,1,'Store data altered.','2017-06-06 02:32:56'),(17,1,'Store deleted.','2017-06-06 02:33:09'),(18,1,'User logged out.','2017-06-06 02:37:35'),(19,1,'User logged in.','2017-06-06 02:37:47'),(20,1,'User data updated.','2017-06-06 02:40:30'),(21,1,'User logged in.','2017-06-06 15:44:32'),(22,1,'User logged out.','2017-06-06 15:59:40'),(23,1,'User logged in.','2017-06-06 16:23:51'),(24,1,'User logged in.','2017-06-10 18:55:53'),(25,1,'Category added to store.','2017-06-10 19:10:33'),(26,1,'Category added to store.','2017-06-10 19:10:47'),(27,1,'User logged out.','2017-06-10 20:10:15'),(28,8,'User logged in.','2017-06-10 20:10:28'),(29,8,'User logged in.','2017-06-12 14:44:46'),(30,8,'User logged out.','2017-06-12 16:13:55'),(31,1,'User logged in.','2017-06-12 16:14:46'),(32,1,'Store created.','2017-06-12 16:38:50'),(33,1,'Store deleted.','2017-06-12 16:42:39'),(34,1,'Store created.','2017-06-12 17:19:01'),(35,1,'Store data altered.','2017-06-12 18:01:15'),(36,1,'User logged out.','2017-06-12 19:16:42'),(37,1,'User logged in.','2017-06-12 19:31:55'),(38,1,'User logged out.','2017-06-12 19:34:54'),(39,8,'User logged in.','2017-06-12 19:37:21'),(40,8,'User logged out.','2017-06-12 21:10:07'),(41,1,'User logged in.','2017-06-12 22:37:09'),(42,1,'New user related to store.','2017-06-12 22:38:22'),(43,1,'User logged out.','2017-06-12 22:39:46'),(44,8,'User logged in.','2017-06-12 22:40:01'),(45,8,'User logged out.','2017-06-12 22:42:22'),(46,1,'User logged in.','2017-06-12 22:42:35'),(47,1,'Store data altered.','2017-06-12 22:42:52'),(48,1,'Store data altered.','2017-06-12 22:43:07');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES ('m000000_000000_base',1484136363),('m170111_115914_create_users_table',1484136369);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` float DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT 'logo-placeholder.jpg',
  PRIMARY KEY (`id`),
  KEY `fk_product_user` (`store_id`),
  CONSTRAINT `fk_product_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COMMENT='Records relation between internal product id with Anymarket''s';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (10,'Placa de vídeo',120,1,'logo-placeholder.jpg'),(12,'Camiseta da paz',15,1,'logo-placeholder.jpg'),(15,'Coleção Sertanejo',20,2,'logo-placeholder.jpg'),(16,'Pirulito',1,2,'logo-placeholder.jpg'),(20,'Acácia',2,1,'logo-placeholder.jpg'),(23,'Arco-íris',45,1,'logo-placeholder.jpg'),(24,'Estátua do José',18,1,'logo-placeholder.jpg'),(26,'produto novo',500,1,'logo-placeholder.jpg'),(28,'coisa boa',12,1,'logo-placeholder.jpg'),(29,'roupa nova',12,1,'logo-placeholder.jpg'),(30,'roupa velha',515151,1,'logo-placeholder.jpg'),(32,'Camiseta',14,5,'logo-placeholder.jpg'),(33,'Camiseta',55,8,'logo-placeholder.jpg'),(34,'Alegria',66,8,'logo-placeholder.jpg'),(35,'asdasd',99,8,'logo-placeholder.jpg'),(36,'Peças',3,8,'logo-placeholder.jpg'),(37,'Jovem 2',99,8,'logo-placeholder.jpg'),(38,'JJJJJJJJJJJJJ',44,1,'pinocchio2418.png'),(39,'Cartazes',2,1,'vySrd11339.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `observation` varchar(200) DEFAULT NULL,
  `slot` varchar(45) NOT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `CNPJ` varchar(15) DEFAULT NULL,
  `IE` varchar(12) DEFAULT NULL,
  `RG` varchar(15) DEFAULT NULL,
  `plan` char(1) NOT NULL,
  `image` varchar(255) DEFAULT 'logo-placeholder.jpg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Boot Informática','(19) 3329-4133','','Informática, Eletrônicos','10','','','','','D','boot-informatica-logo12875.jpg'),(2,'SR Celulares','','','adsda','31','','','','','N','logo-placeholder.jpg'),(3,'TC Games','19332255446','','','11','','','','','D','logo-placeholder.jpg'),(4,'Angel\'s Modas','1999998888','1999998888','','46','','','','','D','logo-placeholder.jpg'),(5,'Box 37','190','190','Loja de roupas, etc','37',NULL,NULL,NULL,NULL,'N','logo-placeholder.jpg'),(6,'Alemão','5556664442','111552246','Eletrônicos e presentes','7',NULL,NULL,NULL,NULL,'D','logo-placeholder.jpg'),(7,'Sol Jóias','12312312312321','1231232131','Jóias e bijus','15',NULL,NULL,NULL,NULL,'N','logo-placeholder.jpg'),(8,'Casa da Chica','','','','9','','','','','D','logo-placeholder.jpg'),(9,'Games e Cia','12123131232','345345345','Games e games','1',NULL,NULL,NULL,NULL,'N','logo-placeholder.jpg'),(10,'Ferramentas Gerais','3453453454','56756756756','Super','23',NULL,NULL,NULL,NULL,'D','logo-placeholder.jpg'),(12,'Loja do Valdir','','','','3','','','','','D','logo-fenac16858.png');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_category`
--

DROP TABLE IF EXISTS `store_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_store_category` (`store`),
  KEY `fk_category_store` (`category`),
  CONSTRAINT `fk_category_store` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_store_category` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_category`
--

LOCK TABLES `store_category` WRITE;
/*!40000 ALTER TABLE `store_category` DISABLE KEYS */;
INSERT INTO `store_category` VALUES (1,5,1),(2,2,1),(3,9,1);
/*!40000 ALTER TABLE `store_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'moronilemes','OZlsd1TBM7LV-Bhmi63og7msqqBZHSHN','$2y$13$.BaQTvABqntMkHmyeDmXneq3GZcOBLZLKcjeeqc6hWb5268JdIycS',NULL,'moronilemes@live.com',10,1484146338,1496716830),(2,'yes','rA5xO7lqGCRzpycl6z6J-jwduENbR4EE','$2y$13$WdCH.3TiMR9SEPGZ3rs3Oeu2.OkYnvNIN04mryLHgef.5BCdpg7SS',NULL,'yespoltronas@gmail.com',10,1484150109,1484150109),(3,'mestrejedi','XqljSKljP0Jo-9BeUEOh6J1N_rgzXVHs','$2y$13$YvOfaY4WMGndcTfqPo.gqeK9SDsmoMH2eISh3fmiIGkFWv2YMchpe',NULL,'mestre@live.com',10,1485184894,1485184894),(4,'michelnunes','DpF76uuetfgvv64QzVtePXNHjxOSzeX8','$2y$13$qM32VH9a4cKiPFDYSeM34um9YCXWQLYtvgPt3I.kTm/SdmxVLUIP6',NULL,'michel@bol.com.br',10,1485186828,1485186828),(5,'alegria','-X5msXLOX0Nun-7rmcSqSRIgprfVBgxD','$2y$13$Zhk1bgbJSQ.DUnx6doxtae3VILOh7.XEwIerHEp/Sm0gsPWgacNjm',NULL,'asd@gomail.com',10,1485186920,1485186920),(6,'guifarias','XmlIRGagRXzxNyDSRM689eUIipi6xv25','$2y$13$9xzDAoZDknxqFMi9.0KazeKmeiJTJZSUAVzc3qUz.ApO.n6a/su6e',NULL,'guifarias94@gmail.com',10,1491249677,1491249677),(7,'Alexandre','ee8XWvwwEOeh9e3on9m9sDh9SJgzxkS1','$2y$13$KenRG/rnrt949eGYrCYR.eleny5D8UeM/X6sdVIRgnQNJf1wKEboS',NULL,'alexmirisola@hotmail.com',10,1491262483,1491262483),(8,'claudio','a46qIQpxVIUL7ZxmOXds8iM1K2m_-hTv','$2y$13$7Ms/zjbFxYL59dzO9sqJQO9sXMLnQYVafnTN51B/tbMCnnW.AT.6u',NULL,'claudio.boot@gmail.com',10,1494807557,1494807557);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_store_role`
--

DROP TABLE IF EXISTS `user_store_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_store_role` (
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `role` enum('admin','manager','operator') NOT NULL,
  PRIMARY KEY (`user_id`,`store_id`,`role`),
  KEY `fk_store_idx` (`store_id`),
  CONSTRAINT `fk_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_store_role`
--

LOCK TABLES `user_store_role` WRITE;
/*!40000 ALTER TABLE `user_store_role` DISABLE KEYS */;
INSERT INTO `user_store_role` VALUES (1,1,'admin'),(8,1,'manager'),(2,3,'manager'),(5,3,'operator'),(4,4,'manager'),(7,4,'manager'),(6,12,'manager');
/*!40000 ALTER TABLE `user_store_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21  1:10:42
