CREATE TYPE user_role AS ENUM ('жолаушы', 'жүргізуші');

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    role user_role NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE createpass(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
    location1 VARCHAR(255),
    location2 VARCHAR(255),
    count INTEGER,
    date VARCHAR(30),
    comment VARCHAR(255),
    price INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE deliverypass(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
    location1 VARCHAR(255),
    location2 VARCHAR(255),
    date VARCHAR(30),
    comment VARCHAR(255),
    price INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE createdriver(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
    location1 VARCHAR(255),
    location2 VARCHAR(255),
    count INTEGER,
    date VARCHAR(30),
    comment VARCHAR(255),
    price INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);