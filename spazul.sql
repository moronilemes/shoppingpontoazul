-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 15-Maio-2017 às 07:34
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zizap`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Information Technologies'),
(2, 'Eletronics'),
(3, 'Clothing'),
(4, 'Music'),
(5, 'Games'),
(6, 'Telephony'),
(7, 'Food'),
(8, 'Tools');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chat`
--

CREATE TABLE `chat` (
  `store` int(11) NOT NULL,
  `customer` int(11) NOT NULL,
  `message` varchar(350) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `store` int(11) NOT NULL,
  `name` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `image`
--

CREATE TABLE `image` (
  `url` varchar(150) NOT NULL,
  `product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `description` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `migration`
--

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1484136363),
('m170111_115914_create_users_table', 1484136369);

-- --------------------------------------------------------

--
-- Estrutura da tabela `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float DEFAULT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Records relation between internal product id with Anymarket''s';

--
-- Extraindo dados da tabela `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `store_id`) VALUES
(10, 'Placa de vídeo', 120, 1),
(12, 'Camiseta da paz', 15, 1),
(15, 'Coleção Sertanejo', 20, 2),
(16, 'Pirulito', 1, 2),
(20, 'Acácia', 2, 1),
(23, 'Arco-íris', 45, 1),
(24, 'Estátua do José', 18, 1),
(25, 'Arretados - o Filme', 1, 1),
(26, 'produto novo', 500, 1),
(27, 'coisa boa', 12, 1),
(28, 'coisa boa', 12, 1),
(29, 'roupa nova', 12, 1),
(30, 'roupa velha', 515151, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `store`
--

CREATE TABLE `store` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `observation` varchar(200) DEFAULT NULL,
  `slot` varchar(45) NOT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `CNPJ` varchar(15) DEFAULT NULL,
  `IE` varchar(12) DEFAULT NULL,
  `RG` varchar(15) DEFAULT NULL,
  `plan` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `store`
--

INSERT INTO `store` (`id`, `name`, `phone`, `mobile`, `observation`, `slot`, `CPF`, `CNPJ`, `IE`, `RG`, `plan`) VALUES
(1, 'Boot Informática', '(19) 3329-4133', '', 'Informática, Eletrônicos', '10', '', '', '', '', 'D'),
(2, 'SR Celulares', '', '', 'adsda', '31', '', '', '', '', 'N'),
(3, 'TC Games', '19332255446', '', '', '11', '', '', '', '', 'D'),
(4, 'Angel\'s Modas', '1999998888', '1999998888', '', '46', '', '', '', '', 'D'),
(5, 'Box 37', '190', '190', 'Loja de roupas, etc', '37', NULL, NULL, NULL, NULL, 'N'),
(6, 'Alemão', '5556664442', '111552246', 'Eletrônicos e presentes', '7', NULL, NULL, NULL, NULL, 'D'),
(7, 'Sol Jóias', '12312312312321', '1231232131', 'Jóias e bijus', '15', NULL, NULL, NULL, NULL, 'N'),
(8, 'Casa da Chica', NULL, NULL, NULL, '9', NULL, NULL, NULL, NULL, 'D'),
(9, 'Games e Cia', '12123131232', '345345345', 'Games e games', '1', NULL, NULL, NULL, NULL, 'N'),
(10, 'Ferramentas Gerais', '3453453454', '56756756756', 'Super', '23', NULL, NULL, NULL, NULL, 'D');

-- --------------------------------------------------------

--
-- Estrutura da tabela `store_category`
--

CREATE TABLE `store_category` (
  `id` int(11) NOT NULL,
  `store` int(11) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'moronilemes', 'OZlsd1TBM7LV-Bhmi63og7msqqBZHSHN', '$2y$13$.BaQTvABqntMkHmyeDmXneq3GZcOBLZLKcjeeqc6hWb5268JdIycS', NULL, 'moronilemes@live.com', 10, 1484146338, 1484146338),
(2, 'yes', 'rA5xO7lqGCRzpycl6z6J-jwduENbR4EE', '$2y$13$WdCH.3TiMR9SEPGZ3rs3Oeu2.OkYnvNIN04mryLHgef.5BCdpg7SS', NULL, 'yespoltronas@gmail.com', 10, 1484150109, 1484150109),
(3, 'mestrejedi', 'XqljSKljP0Jo-9BeUEOh6J1N_rgzXVHs', '$2y$13$YvOfaY4WMGndcTfqPo.gqeK9SDsmoMH2eISh3fmiIGkFWv2YMchpe', NULL, 'mestre@live.com', 10, 1485184894, 1485184894),
(4, 'michelnunes', 'DpF76uuetfgvv64QzVtePXNHjxOSzeX8', '$2y$13$qM32VH9a4cKiPFDYSeM34um9YCXWQLYtvgPt3I.kTm/SdmxVLUIP6', NULL, 'michel@bol.com.br', 10, 1485186828, 1485186828),
(5, 'alegria', '-X5msXLOX0Nun-7rmcSqSRIgprfVBgxD', '$2y$13$Zhk1bgbJSQ.DUnx6doxtae3VILOh7.XEwIerHEp/Sm0gsPWgacNjm', NULL, 'asd@gomail.com', 10, 1485186920, 1485186920),
(6, 'guifarias', 'XmlIRGagRXzxNyDSRM689eUIipi6xv25', '$2y$13$9xzDAoZDknxqFMi9.0KazeKmeiJTJZSUAVzc3qUz.ApO.n6a/su6e', NULL, 'guifarias94@gmail.com', 10, 1491249677, 1491249677),
(7, 'Alexandre', 'ee8XWvwwEOeh9e3on9m9sDh9SJgzxkS1', '$2y$13$KenRG/rnrt949eGYrCYR.eleny5D8UeM/X6sdVIRgnQNJf1wKEboS', NULL, 'alexmirisola@hotmail.com', 10, 1491262483, 1491262483),
(8, 'claudio', 'a46qIQpxVIUL7ZxmOXds8iM1K2m_-hTv', '$2y$13$7Ms/zjbFxYL59dzO9sqJQO9sXMLnQYVafnTN51B/tbMCnnW.AT.6u', NULL, 'claudio.boot@gmail.com', 10, 1494807557, 1494807557);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_store_role`
--

CREATE TABLE `user_store_role` (
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `role` enum('admin','manager','operator') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user_store_role`
--

INSERT INTO `user_store_role` (`user_id`, `store_id`, `role`) VALUES
(1, 1, 'admin'),
(8, 1, 'manager'),
(2, 3, 'manager'),
(5, 3, 'operator'),
(4, 4, 'manager'),
(7, 4, 'manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`store`,`customer`),
  ADD KEY `fk_chat_store` (`store`),
  ADD KEY `fk_chat_customer` (`customer`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`,`store`),
  ADD KEY `fk_customer_store` (`store`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD UNIQUE KEY `url` (`url`,`product`),
  ADD KEY `fk_image_product` (`product`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_log_user` (`user`);

--
-- Indexes for table `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_user` (`store_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_category`
--
ALTER TABLE `store_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_store_category` (`store`),
  ADD KEY `fk_category_store` (`category`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`);

--
-- Indexes for table `user_store_role`
--
ALTER TABLE `user_store_role`
  ADD PRIMARY KEY (`user_id`,`store_id`,`role`),
  ADD KEY `fk_store_idx` (`store_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `store_category`
--
ALTER TABLE `store_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_chat_customer` FOREIGN KEY (`customer`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chat_store` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_customer_store` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_image_product` FOREIGN KEY (`product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `fk_log_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `store_category`
--
ALTER TABLE `store_category`
  ADD CONSTRAINT `fk_category_store` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_store_category` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `user_store_role`
--
ALTER TABLE `user_store_role`
  ADD CONSTRAINT `fk_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
