CREATE TABLE usuarios(
    id INT AUTO_INCREMENT NOT NULL
    nome VARCHAR(50),
    email VARCHAR(100), 
    idade INT
);

INSERT INTO usuarios (nome, email, idade) VALUES(
    "Rainer Resende",
    "rainer@rainer.com",
    19
);