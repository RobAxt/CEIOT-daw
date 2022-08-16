-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-server:3306
-- Tiempo de generación: 16-08-2022 a las 02:54:55
-- Versión del servidor: 5.7.38
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `smart_home`
--
CREATE DATABASE IF NOT EXISTS `smart_home` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `smart_home`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Devices`
--

DROP TABLE IF EXISTS `Devices`;
CREATE TABLE IF NOT EXISTS `Devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` varchar(128) NOT NULL,
  `state` float NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Devices`
--

INSERT INTO `Devices` (`id`, `name`, `description`, `state`, `type`) VALUES
(1, 'Lampara 1', 'Luz living', 0.47, 0),
(2, 'Lampara 2', 'Luz cocina', 0.07, 0),
(3, 'Velador', 'Velador living', 0.6, 0),
(4, 'Persiana 1', 'Persiana living', 0.75, 1),
(5, 'Persiana 2', 'Persiana de la cocina', 1, 1),
(6, 'Persiana 3', 'Persiana balcon', 0.88, 1),
(7, 'Lampara 3', 'luz dormitorio', 0.38, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
