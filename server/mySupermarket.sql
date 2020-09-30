CREATE DATABASE mySuperMarketDB;

use mysupermarketdb;

CREATE TABLE users
(
userID int,
firstName varchar(255),
lastName varchar(255),
email varchar(255),
password varchar(1000),
city varchar(255),
street varchar(255),
isAdmin boolean,
primary key (userID),
UNIQUE KEY uniqe_username (email)
);

CREATE TABLE categories
(
categoryID int auto_increment,
categoryName varchar(255),
primary key (categoryID)
);

CREATE TABLE products
(
productID int auto_increment,
productName varchar(255),
category_id int,
price varchar(255),
image text,
primary key (productID),
foreign key (category_id) references categories(categoryID)
);


CREATE TABLE carts_of_users
(
cartID int auto_increment,
user_id int,
cartDate timestamp default now(),
primary key (cartID)
);

CREATE TABLE products_of_cart
(
rowId int auto_increment,
product_id int,
amount int,
cart_id int,
primary key (rowID),
foreign key (product_id) references products(productID)

);

CREATE TABLE orders
(
orderID int auto_increment,
user_id int,
cart_id int,
sendCity varchar(255),
sendStreet varchar(255),
sendDate date,
orderDate date default now(),
payEnd varchar(4),
primary key (orderID),
foreign key (user_id) references users(userID)
); 


INSERT INTO categories
(categoryName)
VALUES
("Milk & Eggs"),
("Vegetables & Fruits"),
("Meat & Fish"),
("Drinks"),
("Bread/Bakery"),
("Frozen"),
("Candys"),
("Cleaners");


INSERT INTO products
(productName, category_id, price, image)
VALUES
("Milk",1,"5.90","/milk.jpg"),
("Yolo", 1, "4.70", "/yolo.jpg"),
("Cottage", 1, "5.90", "/cottage.jpg"),
("Eggs", 1, "25", "/eggs.jpg"),
("Chocolate milk - Tnuva", 1, "7.90", "/shoko.jpg"),
("Bannana", 2, "7.90", "/bannana.jpg"),
("Strawberry", 2, "12.90", "/strawbery.jpg"),
("Clementine", 2, "13", "/clementine.jpg"),
("Potatoes", 2, "5", "/potato.jpg"),
("Pineapple", 2, "40", "/pineapple.jpg"),
("Cucember", 2, "5", "/cucember.jpg"),
("Cucember", 2, "4", "/onion.jpg"),
("Chicken", 3, "30", "/cheeken.jpg"),
("Meat", 3, "35", "/meat.jpg"),
("Fish - Amnon",3,"25.90", "/fishAmnon.jpg"),
("Water - Neviot", 4, "15", "/51.jpg"),
("Orange juice", 4, "8.90", "/tapuzim2.jpg"),
("Coca Cola", 4, "7.90", "/colla.jpg"),
("Goldstart Beer",4, "36", "/6goldstar.jpg"),
("Bread", 5, "4.90", "/breadAngle.jpg"),
("Buns", 5, "10", "/buns.jpg"),
("Buns", 5, "12.50", "/roladaElit.jpg"),
("Corn schnitzel", 6, "36", "/TivolShnizel.jpg"),
("Melawah", 6, "10", "/melawah.jpg"),
("Jahnun", 6, "9", "/jahnun.jpg"),
("Potato balls", 6, "25.90", "/potatoballs.jpg"),
("Bamba nougat", 7, "3.90", "/BambaNougat.jpg"),
("Bamba Bisli mix", 7, "5.90", "/47.jpg"),
("Bamba", 7, "3.90", "/bamba.jpg"),
("Click", 7, "4", "/click.jpg"),
("Nutella", 7, "12.50", "/nutella.jpg"),
("Loacker - chocolate", 7, "8.90", "/loackerChocolate.jpg"),
("Oreo", 7, "8.90", "/oreoCookies.jpg"),
("Cilit Bang", 8, "10", "/CilitBang.jpg"),
("Economica - Sano", 8, "14.90", "/EconomicaSano.jpg"),
("Tissue", 8, "15.90", "/Tissue5.jpg"),
("Ritspaz - Sano", 8, "16.90", "/RitspazSano.jpg"),
("Softener - Sano Maxima", 8, "19.90", "/SoftenerSanoMaxima.jpg");

