-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: kitchening_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Arrowood 9718','Wilmington','Delaware',7317,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(2,'Victoria 4214','Zephyrhills','Florida',2251,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(3,'General Pico 10631','Loma Hermosa','Buenos Aires',1657,'2023-03-28 13:43:05','2023-03-29 14:57:54'),(4,NULL,NULL,NULL,NULL,'2023-03-28 13:47:36','2023-03-28 13:47:36'),(5,NULL,NULL,NULL,NULL,'2023-03-28 13:48:39','2023-03-28 13:48:39'),(6,NULL,NULL,NULL,NULL,'2023-03-29 12:42:29','2023-03-29 12:42:29');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cocina',NULL,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(2,'Pastelería',NULL,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(3,'Panadería',NULL,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(4,'Vinos y bebidas',NULL,'2023-03-28 12:40:41','2023-03-28 12:40:41');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chefs`
--

LOCK TABLES `chefs` WRITE;
/*!40000 ALTER TABLE `chefs` DISABLE KEYS */;
INSERT INTO `chefs` VALUES (1,'Roberto Nishida','profesor-sushi.png','Japón','2023-03-28 12:40:41',NULL,NULL),(2,'Guillermo Calabrese','profesor-carnes.png','Italia','2023-03-28 12:40:41',NULL,NULL),(3,'Cubano Vega','profesor-cocteleria.png','Cuba','2023-03-28 12:40:41',NULL,NULL),(4,'Mariano Martini','profesor-pastas.png','Argentina','2023-03-28 12:40:41',NULL,NULL),(5,'Gustavo Nari','cara-nari.png','España','2023-03-28 12:40:41',NULL,NULL),(6,'Hernán Pérez Velásquez','profesor-panaderia.png','Argentina','2023-03-28 12:40:41',NULL,NULL),(7,'Borja Blazquez','profesor-espanola.png','España','2023-03-28 12:40:41',NULL,NULL),(8,'Silvia Di Ciancio','profesora-saludable.png','Italia','2023-03-28 12:40:41',NULL,NULL),(9,'Fabian Mahr','fabian.png','Turquía','2023-03-28 12:40:41',NULL,NULL),(10,'Ariel Gravano','cara-gravano-posta.png','Argentina','2023-03-28 12:40:41',NULL,NULL),(11,'Roberto Petersen','caraPetersen.png','EEUU','2023-03-28 12:40:41',NULL,NULL),(12,'Mauro Massimino','caraMauro.png','Italia','2023-03-28 12:40:41',NULL,NULL),(13,'Leandro Palmeiro','leandro-cara.png','Argentina','2023-03-28 12:40:41',NULL,NULL),(14,'Olivier Falchi','profesor-francesa.png','Francia','2023-03-28 12:40:41',NULL,NULL),(15,'Luis Badillo','profesor-mexicana.png','Mexico','2023-03-28 12:40:41',NULL,NULL);
/*!40000 ALTER TABLE `chefs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'SUSHI PROFESIONAL',10530,0,'Con una gran experiencia Roberto Nishida te enseña los secretos de las técnicas básicas en la elaboración del sushi, vas a descubrir la importancia de cada ingrediente para que realices una gran variedad de rolls, sashimis y niguiris.',0,1,1,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(2,'ABCD DE LA COCINA',9530,0,'Tu comida puede transformarse en platos de restaurante de la mano de Guillermo Calabrese que te enseñará a combinar ingredientes simples con productos gourmet para darle un sabor distinto a tus recetas.',1,1,2,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(3,'COCTELERÍA Y BEBIDAS',9720,0,'Si querés ser Bartender hay conocimientos que debes tener y el Cubano Vega te da la fórmula para que prepares los tragos y bebidas más pedidos.',1,1,3,4,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(4,'PANADERÍA CASERA',12530,0,'En este curso aprenderás todas las tecnicas básicas de la panadería casera y artesanal. En cada elaboración tendrás un soporte teórico y demostrativo para comprender el proceso que se realiza en cada producto, las diferentes formas y el paso a paso fundamental de las variedades más relevantes de la panadería.',0,1,9,3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(5,'ALIMENTACIÓN SALUDABLE 1',9720,0,'Si querés comer rico y sano con estas recetas vas a aprender a combinar los ingredientes más nobles para crear platos que sean saludables y equilibrados.',0,1,8,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(6,'ESPECIAL CARNES',10530,0,'Como las carnes no son todas iguales te enseñamos a preparar las más básicas: ternera, cordero, cerdo y pollo. Para que puedas hacer cada uno de estos platos en su punto justo y disfrutes de la textura y jugosidad de cada tipo.',0,1,2,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(7,'COCINERO AFICIONADO 1',10530,0,'CEste curso online está orientado a todas aquellas personas que disfrutan de la gastronomía. Un curso en el cual aprenderán las bases de la cocina, aplicándolas en diferentes recetas todas las clases. Se  conjuga lo descontracturado de un curso para aficionado con las bases de la cocina.',1,1,13,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(8,'PASTELERÍA DE MESA DULCE',10530,0,'Si sos amante de lo dulce, Gustavo Nari te enseña paso a paso deliciosas recetas que no podés dejar de probar. Para paladares exquisitos que les gusta prepara una buena mesa disfrutando de lo mejor de la pastelería.',0,1,5,2,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(9,'PASTAS Y SALSAS',9720,0,'Para los amantes de la pasta esta es una oportunidad de aprender a realizar las recetas más conocidas de la cocina italiana, te enseñamos el secreto del amasado de las pastas frescas con las salsas más sabrosas.',0,1,4,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(10,'PANADERÍA DULCE',9720,0,'Para hacer en tu casa o para vender, podés aprender a preparar las mejores facturas con nuestro Profesor Hernán que te enseña los ingredientes y la técnica correcta de amasado para que siempre te salgan perfectas.',0,1,6,3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(11,'COCINA ESPAÑOLA',10530,0,'Entre paellas y cazuelas, los platos típicos de España llegan a tu mesa. Borja Blazquez te enseña los secretos de las mejores recetas de esta región para compartir con familiares y amigos.',0,1,7,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(12,'ALIMENTACIÓN SALUDABLE II',9720,0,'En este curso la Licenciada en Nutrición y Cocinera, Silvia Di Ciandio, les enseñara recetas fáciles y nutritivas que incluyan proteínas, carbohidratos, grasas saludables, agua, vitaminas y minerales, combinados en los distintos platos para ayudar al cuerpo con una alimentación fuerte y saludable. (No es necesario haber realizado Alimentación Saludable I)',0,1,8,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(13,'ABC DE LOS POSTRES',10530,0,'Si querés disfrutar todos los días de los postres tradicionales ahora podés aprender con esta variedad de recetas y que siempre te salgan perfectos.',1,1,9,3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(14,'CHOCOLATERÍA ARTESANAL',11178,0,'Descubrirás los secretos en el arte de la Chocolatería, el chef Ariel Gravano te enseña las técnicas para que puedas hacer recetas clásicas y modernas con chocolate. Podrás preparar delicias para disfrutar y compartir aprendiendo como un profesional.',1,1,10,3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(15,'COCINA DE AUTOR',10530,0,'Para que puedas hacer pastas, pizzas y postres con un toque distinto, Roberto Petersen te enseña la forma fácil de darle un gusto especial a tus comidas preferidas.',0,1,11,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(16,'COCINA NATURAL',10530,0,'PSi estás buscando una nueva forma de alimentarte, más consciente y sana para tu cuerpo, este curso te ayudará a incorporar las recetas vegetarianas para lograrlo. Mauro Massimino, egresado del instituto Gato Dumas y dueño de la cadena de restaurantes Buenos Aires Verde, te enseña cómo utilizar ingredientes saludables en sabrosas preparaciones y estar en armonía con la naturaleza.',0,1,12,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(17,'COCINA FRANCESA',10530,0,'En este curso desarrollará las recetas más representativas y emblemáticas de la cocina clásica francesa, identificando los productos propios de esta cocina, según su interpretación y combinación de sabores en un menú; utilizando una conjugación de técnicas tradicionales y modernas. El profesor de este curso es el reconocido chef francés Olivier Falchi.',0,1,14,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(18,'COCINA MEXICANA',9720,0,'Luis Badillo nos trae desde México las recetas típicas para que aprendas de manera fácil a preparar tacos, quesadillas, tamales y tortillas con todo el sabor para renovar tu menú.',0,1,15,1,'2023-03-28 12:40:41','2023-03-28 12:40:41');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'1676658519148_courses_.jpg',1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(2,'1676658519145_courses_.jpg',1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(3,'1676658519142_courses_.jpg',1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(4,'1676659234345_courses_.jpg',2,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(5,'1676659234346_courses_.jpg',2,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(6,'1676659234348_courses_.jpg',2,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(7,'1676660318511_courses_.jpg',3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(8,'1676660318513_courses_.jpg',3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(9,'1676660318522_courses_.jpg',3,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(10,'panaderiaCasera.jpg',4,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(11,'saludable.jpg',5,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(12,'carnes.jpg',6,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(13,'aficionado1.jpg',7,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(14,'pasteleriaAficionado1.jpg',8,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(15,'pastas.jpg',9,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(16,'panaderiaDulce.jpg',10,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(17,'española.jpg',11,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(18,'saludable2.jpg',12,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(19,'abcPostres.jpg',13,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(20,'chocolateria.jpg',14,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(21,'cocinaAutor.jpg',15,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(22,'cocinaNatural.jpg',16,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(23,'1676655236854_courses_.jpg',17,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(24,'1676655236857_courses_.jpg',17,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(25,'1676655236858_courses_.jpg',17,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(26,'1676659338947_courses_.jpg',18,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(27,'1676659338949_courses_.jpg',18,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(28,'1676659338950_courses_.jpg',18,'2023-03-28 12:40:41','2023-03-28 12:40:41');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin','2023-03-28 12:40:41','2023-03-28 12:40:41'),(2,'user','2023-03-28 12:40:41','2023-03-28 12:40:41');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230317132656-create-chef.js'),('20230317134102-create-category.js'),('20230317134103-create-course.js'),('20230317134232-create-image.js'),('20230317134317-create-rol.js'),('20230317134504-create-address.js'),('20230317134505-create-user.js'),('20230328112345-create-order.js'),('20230328112543-create-cart.js'),('20230328122927-create-user-course.js'),('20230331115452-create-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usercourses`
--

LOCK TABLES `usercourses` WRITE;
/*!40000 ALTER TABLE `usercourses` DISABLE KEYS */;
/*!40000 ALTER TABLE `usercourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Test','admin@test.com','$2a$10$Ks5TccrnzkRr7ooqNGOFXeyAzIsKnSAhU/LlSziv9vxJWZmXmNYyq',NULL,1,1,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(2,'User','Test','user@test.com','$2a$10$nz47uSaLwkFKzb5zB6i3JelE1EJoHeGOijcZ1M4F1h/c9qtQlVtca',NULL,2,2,'2023-03-28 12:40:41','2023-03-28 12:40:41'),(3,'Eric','Mena','menaeric@hotmail.com','$2a$10$7yLydIBc76z9eKco6wKYNuJylhOkBKyZQrINuoyRwIMFhGBAWmOlS','1680101874679_users_.jpg',1,3,'2023-03-28 13:43:05','2023-03-29 14:57:54'),(4,'Juan','Gonzalez','juan@gonzalez.com','$2a$10$FYMhkbg1ELjt7iC.S9OM.uD.0sgCqbYNFxqsMo2AcCL/mlKbA13s.',NULL,2,4,'2023-03-28 13:47:36','2023-03-28 13:47:36'),(5,'Jose','Benavidez','jose@benavidez.com','$2a$10$yUqzLPDlnJGQBApZQic0XeOvB6RQYHDjifFtGR3R5ejAB.OYBmSr2',NULL,2,5,'2023-03-28 13:48:40','2023-03-28 13:48:40'),(6,'Lorenzo','Lamas','lorenzo@lamas.com','$2a$10$dsJ/j5tplFFHJy3IyQA48.sO1QN/97xhbieozcci8hSRZ7w1srLMa',NULL,2,6,'2023-03-29 12:42:29','2023-03-29 12:42:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-31  9:49:02
