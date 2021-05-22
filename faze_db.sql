-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2021 at 03:38 AM
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
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `age` varchar(200) NOT NULL,
  `country` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL,
  `usertype` varchar(100) NOT NULL,
  `mobile_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buyer`
--

INSERT INTO `buyer` (`id`, `username`, `email`, `password`, `age`, `country`, `address`, `usertype`, `mobile_number`) VALUES
(14, 'user2', 'user2@gmail.com', '$2a$10$atPNtXQCf0oqf.LFjczZs.vs9aA3JTKP2fSOB6gJ9/4f4jQ5scFZy', '23', 'Sri Lanka', 'Kandy,Sri Lanka', 'Buyer', '0777862541');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_name` varchar(1000) NOT NULL,
  `item_qty` varchar(1000) NOT NULL,
  `item_category` varchar(1000) NOT NULL,
  `unit_price` varchar(1000) NOT NULL,
  `total_price` varchar(1000) NOT NULL,
  `total_items` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `delivary_option` varchar(1000) NOT NULL,
  `billing_address` varchar(1000) NOT NULL,
  `shipping_address` varchar(1000) NOT NULL,
  `delivery_amount` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_stock` varchar(1000) NOT NULL,
  `item_category` varchar(100) NOT NULL,
  `unit_price` varchar(1000) NOT NULL,
  `item_description` varchar(1000) NOT NULL,
  `item_image` varchar(900) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_billing`
--

CREATE TABLE `mobile_billing` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `mobile_number` varchar(100) NOT NULL,
  `pin_code` varchar(100) NOT NULL,
  `amount` varchar(1000) NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_name` varchar(1000) NOT NULL,
  `item_qty` varchar(1000) NOT NULL,
  `item_category` varchar(1000) NOT NULL,
  `unit_price` varchar(1000) NOT NULL,
  `total_price` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment_details`
--

CREATE TABLE `payment_details` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `payment_type` varchar(100) NOT NULL,
  `card_no` varchar(100) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `card_exp_date` varchar(100) NOT NULL,
  `card_cvv` varchar(100) NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `age` varchar(200) NOT NULL,
  `country` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL,
  `usertype` varchar(100) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `company_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`id`, `username`, `email`, `password`, `age`, `country`, `address`, `usertype`, `mobile_number`, `company_name`) VALUES
(9, 'user1', 'user1@gmail.com', '$2a$10$YjjO8JHNq8m1Iaq8BuM/h.SJ8EnslDH87Y8dJIX4TsChKx0LGoHj6', '23', 'Sri Lanka', 'Kandy,Sri Lanka', 'Seller', '0777862541', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_item` (`seller_id`);

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
  ADD KEY `buyer_history` (`buyer_id`),
  ADD KEY `item_history` (`item_id`),
  ADD KEY `seller_history` (`seller_id`);

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buyer`
--
ALTER TABLE `buyer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `mobile_billing`
--
ALTER TABLE `mobile_billing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_details`
--
ALTER TABLE `payment_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `buyer_cart` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`),
  ADD CONSTRAINT `item_cart` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `buyer_delivery` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `seller_item` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`);

--
-- Constraints for table `mobile_billing`
--
ALTER TABLE `mobile_billing`
  ADD CONSTRAINT `buyer_mobile` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`);

--
-- Constraints for table `order_history`
--
ALTER TABLE `order_history`
  ADD CONSTRAINT `buyer_history` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`),
  ADD CONSTRAINT `item_history` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  ADD CONSTRAINT `seller_history` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`);

--
-- Constraints for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `buyer_payment` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
