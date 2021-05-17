-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2021 at 12:09 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faze_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

CREATE TABLE `buyer` (
  `Id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `age` varchar(10) NOT NULL,
  `country` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `usertype` varchar(50) NOT NULL,
  `mobile_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` varchar(50) NOT NULL,
  `buyer_id` varchar(50) NOT NULL,
  `cart_id` varchar(50) NOT NULL,
  `item_id` varchar(50) NOT NULL,
  `item_name` varchar(1000) NOT NULL,
  `item_qty` varchar(10000) NOT NULL,
  `item_color` varchar(100) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `unit_price` mediumtext NOT NULL,
  `total_price` mediumtext NOT NULL,
  `total_items` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` varchar(50) NOT NULL,
  `buyer_id` varchar(50) NOT NULL,
  `delivery_option` varchar(50) NOT NULL,
  `billing_address` varchar(100) NOT NULL,
  `shipping_address` varchar(100) NOT NULL,
  `delivery_amount` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` varchar(50) NOT NULL,
  `seller_id` varchar(50) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_stock` varchar(1000) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `unit_price` mediumtext NOT NULL,
  `item_description` longtext NOT NULL,
  `item_photo` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_billing`
--

CREATE TABLE `mobile_billing` (
  `id` varchar(50) NOT NULL,
  `buyer_id` varchar(50) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `pin_code` varchar(10) NOT NULL,
  `amount` mediumtext NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` varchar(50) NOT NULL,
  `buyer_id` varchar(50) NOT NULL,
  `item_id` varchar(50) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_qty` varchar(1000) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `unit_price` varchar(10000) NOT NULL,
  `total_price` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment_details`
--

CREATE TABLE `payment_details` (
  `id` varchar(50) NOT NULL,
  `buyer_id` varchar(50) NOT NULL,
  `payment_type` varchar(50) NOT NULL,
  `card_no` varchar(50) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `card_exp_date` varchar(50) NOT NULL,
  `card_cvv` varchar(50) NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `Id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `age` varchar(10) NOT NULL,
  `country` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `usertype` varchar(20) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `company_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `test1` varchar(50) NOT NULL,
  `test2` varchar(50) NOT NULL,
  `test3` varchar(50) NOT NULL,
  `test4` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_cart` (`buyer_id`),
  ADD KEY `item_cart` (`item_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_delivery` (`buyer_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `item_seller` (`seller_id`);

--
-- Indexes for table `mobile_billing`
--
ALTER TABLE `mobile_billing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_mobile` (`buyer_id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buuer_history` (`buyer_id`),
  ADD KEY `item_history` (`item_id`);

--
-- Indexes for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyer_payment` (`buyer_id`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`Id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `buyer_cart` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`Id`),
  ADD CONSTRAINT `item_cart` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `buyer_delivery` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`Id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `item_seller` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`Id`);

--
-- Constraints for table `mobile_billing`
--
ALTER TABLE `mobile_billing`
  ADD CONSTRAINT `buyer_mobile` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`Id`);

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `buuer_history` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`Id`),
  ADD CONSTRAINT `item_history` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

--
-- Constraints for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `buyer_payment` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
