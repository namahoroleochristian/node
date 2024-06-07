-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2024 at 07:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `l4sod`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(120) NOT NULL,
  `name` varchar(234) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(1, 'peter', '$2b$10$zSVWCboY16jX/5OYAwx11.mzmPuO/7HFsci1tT0Mo0AYCJseTnM96'),
(2, 'peter', '$2b$10$HAfOKMwo0m68EoORaTDRtuBdiaNjXlsF3Nu3E1T80EhaAcf39eXMi'),
(3, 'pete', '$2b$10$3s/CR4s24GcBdUiGV7CZpuvjTqFiIipLDi14P7AKMv0hX/w/aTHwG'),
(4, 'eric', '$2b$10$bo3hS5diKtQTezuQ3Y9Ofe1w..hrNjQXvM57T/r2jGpAfyEOvHZIa'),
(5, '99', '$2b$10$yOaBYpO2jwmheDyTGy.PZ.KHC1VjgXRm9IuISPAm15t9TKn6Xk9Q2'),
(6, 'eric', '$2b$10$V7G7k0gBkKreOZK4haSUxuH.fQ1wPkzA2PQp0BcPlcGqaBiECbScy'),
(7, 'peter', '$2b$10$EXqp.aSIbqPtKFf4NPT6vOvLM3UVTtAH9JdFAYCJ/9uPQsBVpiJIO'),
(8, 'peter', '$2b$10$0RQ/leoIqN205f7KGUfSneScIDnNoO2tEqoOgHagjnpFaoL.ZClg.'),
(9, 'peter', '$2b$10$lfhdtKc8uJH5oIrnblj8yeD21R4DLFbdLuBYHg09Yh2Bdq4gyJApW'),
(10, 'hirwa', '$2b$10$pW8UWs9dM7gzV3kOSGFbCuyIn4pqDv4YyxujtvkzDAMfb753cJUHi'),
(11, 'evelyne', '$2b$10$d3KXSIr.Yt0ctIn82FMy1uREWMbBsPIeRjbtfGyK/xyCMxrU/ibqu'),
(12, 'honorine', '$2b$10$O81R0Zerhg7ukIlYnc.nbec9TeAjjFNa.pvq.fwiYRxMf0f1H.1Zq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(120) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
