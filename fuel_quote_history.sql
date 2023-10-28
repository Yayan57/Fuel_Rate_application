CREATE TABLE FuelQuotes (
    id INT PRIMARY KEY AUTO_INCREMENT,  
    gallonsRequested INT NOT NULL,
    deliveryAddress VARCHAR(255) NOT NULL,
    deliveryDate DATE NOT NULL,
    suggestedPrice DECIMAL(10, 2) NOT NULL
);