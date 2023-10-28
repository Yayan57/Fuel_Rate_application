CREATE DATABASE fuel_rate_application;
USE fuel_rate_application;

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE FuelQuote (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    gallonsRequested INT NOT NULL,
    deliveryAddress VARCHAR(255) NOT NULL,
    deliveryDate DATE NOT NULL,
    ppg DECIMAL(10,4) NOT NULL,
    totalPrice DECIMAL(10,4) NOT NULL
);

CREATE TABLE UserCredentials {
  id VARCHAR(25) PRIMARY KEY,
  password VARCHAR(60) NOT NULL
};
