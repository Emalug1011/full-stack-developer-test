CREATE DATABASE  IF NOT EXISTS `bd_uni` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;
USE `bd_uni`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bd_uni
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `tc_estudiantes`
--

DROP TABLE IF EXISTS `tc_estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tc_estudiantes` (
  `Id_estudiante` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Correo` varchar(30) NOT NULL,
  PRIMARY KEY (`Id_estudiante`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tc_sesiones`
--

DROP TABLE IF EXISTS `tc_sesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tc_sesiones` (
  `Id_sesion` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Start_datetime` datetime NOT NULL,
  `End_datetime` datetime NOT NULL,
  `Cupo` int(15) NOT NULL,
  PRIMARY KEY (`Id_sesion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tt_asignaciones`
--

DROP TABLE IF EXISTS `tt_asignaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tt_asignaciones` (
  `ID_ASIGNACION` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA_ASIGNACION` date NOT NULL,
  `ID_ESTUDIANTE` int(11) NOT NULL,
  `ID_SESION` int(11) NOT NULL,
  `ESTADO` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`ID_ASIGNACION`),
  KEY `FK_TT_ASIGNACIONES_TC_ESTUDIANTES_IDX` (`ID_ESTUDIANTE`),
  KEY `FK_TT_ASIGNACIONES_TC_SESIONES1_IDX` (`ID_SESION`),
  CONSTRAINT `FK_TT_ASIGNACIONES_TC_ESTUDIANTES` FOREIGN KEY (`ID_ESTUDIANTE`) REFERENCES `tc_estudiantes` (`Id_estudiante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_TT_ASIGNACIONES_TC_SESIONES1` FOREIGN KEY (`ID_SESION`) REFERENCES `tc_sesiones` (`Id_sesion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bd_uni'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_CreateAsignacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CreateAsignacion`(   
    IN p_id_estudiante INT,
    IN p_id_sesion INT)
BEGIN
    DECLARE v_cupo INT;
    DECLARE v_asignados INT;
    DECLARE v_fecha_finalizacion DATETIME;

    -- Obtener el cupo total, la fecha de finalización y el número de estudiantes asignados en una sola consulta
    SELECT ses.Cupo, ses.End_datetime, COUNT(asi.ID_ASIGNACION) INTO v_cupo, v_fecha_finalizacion, v_asignados
    FROM tc_sesiones ses
    LEFT JOIN tt_asignaciones asi ON ses.Id_sesion = asi.ID_SESION
    WHERE ses.Id_sesion = p_id_sesion
    GROUP BY ses.Id_sesion;

    -- Verificar si la sesión existe
    IF v_cupo IS NULL THEN
        -- La sesión no existe
        SELECT 'La sesión especificada no existe' AS error;
    ELSE
        -- Verificar si la fecha de finalización de la sesión ha pasado
        IF NOW() > v_fecha_finalizacion THEN
            -- La fecha de finalización de la sesión ha pasado, no se puede asignar
            SELECT 'La fecha de finalización de la sesión ha pasado, no se puede asignar' AS error;
        ELSE
            -- Verificar si aún hay cupo disponible
            IF v_asignados < v_cupo THEN
                -- Insertar la nueva asignación
                INSERT INTO tt_asignaciones (FECHA_ASIGNACION, ID_ESTUDIANTE, ID_SESION)
                VALUES (NOW(), p_id_estudiante, p_id_sesion);
                SELECT 'Asignación creada exitosamente' AS message, LAST_INSERT_ID() AS ID_ASIGNACION;
            ELSE
                -- Si no hay cupo disponible, mostrar un mensaje de error
                SELECT 'Cupo lleno de la sesión'  AS error;
            END IF;
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_CreateEstudiante` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CreateEstudiante`(
    IN p_nombre VARCHAR(50),
    IN p_correo VARCHAR(50)
)
BEGIN
    INSERT INTO TC_ESTUDIANTES (NOMBRE, CORREO) VALUES (p_nombre, p_correo);
      SELECT LAST_INSERT_ID() AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_CreateSesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CreateSesion`(
    IN p_nombre VARCHAR(50),
    IN p_start_datetime DATETIME,
    IN p_end_datetime DATETIME,
    IN p_cupo INT
)
BEGIN
    INSERT INTO tc_sesiones (Nombre, Start_datetime, End_datetime, Cupo)
    VALUES (p_nombre, p_start_datetime, p_end_datetime, p_cupo);
    SELECT LAST_INSERT_ID() AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DeleteEstudiante` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DeleteEstudiante`(
    IN p_id INT
 
)
BEGIN
    DECLARE p_success INT DEFAULT 0;

    -- Verificar si hay asignaciones activas para esta sesión
    SELECT COUNT(*) INTO p_success
    FROM tt_asignaciones
    WHERE ID_SESION = p_id AND ESTADO = 1;

    IF p_success > 0 THEN
        -- Si hay asignaciones activas, no se puede eliminar la sesión
        SELECT 0 AS p_success;
    ELSE
        -- Si no hay asignaciones activas, eliminar la sesión
        DELETE FROM tc_sesiones WHERE Id_sesion = p_id;
        SELECT 1 AS p_success;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DeleteSesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_DeleteSesion`(
    IN p_id_sesion INT
)
BEGIN
    DELETE FROM tc_sesiones WHERE Id_sesion = p_id_sesion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetAsignaciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetAsignaciones`(IN p_fecha VARCHAR(50))
BEGIN
    -- Convertir la fecha de entrada a un formato de fecha adecuado
    SET @fecha = STR_TO_DATE(p_fecha, '%d-%m-%Y');

    -- Obtener las asignaciones de sesiones para la fecha proporcionada
    SELECT
		S.Id_sesion ,
        S.Nombre AS sesion,
        DATE_FORMAT(S.Start_datetime, '%d/%m/%Y %H:%i') AS fecha_inicio,
        DATE_FORMAT(S.End_datetime, '%d/%m/%Y %H:%i') AS fecha_fin,
		DATE_FORMAT(TIME(S.Start_datetime), '%h:%i %p') AS hora_inicio,
		DATE_FORMAT(TIME(S.End_datetime), '%h:%i %p') AS hora_fin,
        DATE_FORMAT(S.Start_datetime, '%W %e de %M') AS Descripcion_dia,
        S.cupo , 
        S.Cupo - COUNT(A.ID_ASIGNACION) AS cupo_disponible  
    FROM
        tc_sesiones S
    LEFT JOIN
        tt_asignaciones A ON S.Id_sesion = A.ID_SESION 
    WHERE
        DATE(S.Start_datetime) = STR_TO_DATE(p_fecha, '%d-%m-%Y')
    GROUP BY
        S.Id_sesion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetEstudianteById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetEstudianteById`(IN p_id INT)
BEGIN
    SELECT * FROM TC_ESTUDIANTES WHERE id_estudiante = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetEstudiantes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetEstudiantes`()
BEGIN
	SELECT * FROM tc_estudiantes;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetEstudiantesDisponibles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetEstudiantesDisponibles`(IN p_id_sesion INT)
BEGIN
    SELECT Id_estudiante, Nombre
    FROM tc_estudiantes
    WHERE Id_estudiante NOT IN (
        SELECT ID_ESTUDIANTE
        FROM tt_asignaciones
        where ID_SESION = p_id_sesion and estado = 1
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetSesiones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GetSesiones`()
BEGIN
    SELECT 
		Id_sesion,
        Nombre,
        DATE_FORMAT(Start_datetime, '%d-%m-%Y') AS FechaInicio,
        DATE_FORMAT(End_datetime, '%d-%m-%Y') AS FechaFin,
        TIME(Start_datetime) AS horaInicio,
        TIME(End_datetime) AS horaFin,
        Cupo
    FROM 
        tc_sesiones;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateEstudiante` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UpdateEstudiante`(
    IN p_id INT,
    IN p_nombre VARCHAR(50),
    IN p_correo VARCHAR(50)
)
BEGIN
    UPDATE TC_ESTUDIANTES SET NOMBRE = p_nombre, CORREO = p_correo WHERE id_estudiante = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateSesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UpdateSesion`(
    IN p_id_sesion INT,
    IN p_nombre VARCHAR(50),
    IN p_start_datetime DATETIME,
    IN p_end_datetime DATETIME,
    IN p_cupo INT
)
BEGIN
    UPDATE tc_sesiones
    SET Nombre = p_nombre, Start_datetime = p_start_datetime, End_datetime = p_end_datetime, Cupo = p_cupo
    WHERE Id_sesion = p_id_sesion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-21 14:27:23
