/* PRODUCTS */

const router = require('express').Router();
const db = require('./connectDB');
const { onlyUsers } = require('./mw');
const fs = require('fs');
const moment = require('moment');


/** GET products by CATEGORY **/
router.get("/bycategory/:id", onlyUsers, async (req, res) => {
    let q = `SELECT * FROM products WHERE category_id=?`;
    try {
        let data = await Query(q, req.params.id);
        res.json(data);

    } catch (err) {
        res.send(500, "ooops..");
        throw err;

    }
});

/** GET the NUMBER of all PRODUCTS **/
router.get("/prodsamount", async (req, res) => {
    let q = `SELECT COUNT(productID)
    FROM products`;
    try {
        let data = await Query(q);
        res.json(data);
    } catch (err) {
        res.send(500, "ooops..");
        throw err;
    }
});

/** GET the NUMBER of all ORDERS **/
router.get("/ordersamount", async (req, res) => {
    let q = `SELECT COUNT(orderID)
    FROM orders`;
    try {
        let data = await Query(q);
        res.json(data);
    } catch (err) {
        res.send(500, "ooops..");
        throw err;
    }
});

/** GET all CATEGORYS **/
router.get("/categories", onlyUsers, async (req, res) => {
    let q = `SELECT *
    FROM categories`;
    try {
        let data = await Query(q);
        res.json(data);
    } catch (err) {
        res.send(500, "ooops..");
        throw err;
    }
});

/** GET total price of a specific PRODUCT in a specific CART **/
/* By cart ID & product ID */
router.get("/totalprice/:cartId/:prodId", async (req, res) => {
    let q = `SELECT 
    products_of_cart.amount * products.price as total
    FROM mysupermarketdb.products_of_cart
    INNER JOIN products on products.productID = products_of_cart.product_id
    INNER JOIN carts_of_users on carts_of_users.cartID = products_of_cart.cart_id
    WHERE carts_of_users.cartID=? AND products.productID=?`;
    try {
        let data = await Query(q, req.params.cartId, req.params.prodId);
        res.json(data);
    } catch (err) {
        res.send(500, "ooops..");
        throw err;
    }
});

/** SEARCH - HOME **/
router.post("/search", onlyUsers, async (req, res) => {
    const { searchValue } = req.body;
    let q = `SELECT * FROM products
    WHERE productName LIKE ?`;

    try {
        const data = await Query(q, "%" + searchValue + "%");
        res.send(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/** ADD a CART **/
router.post("/newcart", onlyUsers, async (req, res) => {
    const { user_id } = req.body;
    let q = `INSERT INTO carts_of_users
    (user_id)
    VALUES
    (?)
    `;
    try {
        const data = await Query(q, user_id);
        res.send(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/** REMOVE a CART by ID **/
router.delete("/removecart/:id", async (req, res) => {
    let q = `DELETE FROM carts_of_users
    WHERE cartID =?;`;
    try {
        const data = await Query(q, req.params.id);
        res.send(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/** DISPLAY specific CART by cart ID **/
router.get("/displaycart/:cartId", async (req, res) => {
    let q = `SELECT
    carts_of_users.cartID,
    products.productName,
    products.price, 
    products_of_cart.amount,
    products.image,
    products.productID
    FROM mysupermarketdb.products_of_cart
    INNER JOIN products ON products_of_cart.product_id = products.productID
    INNER JOIN carts_of_users ON products_of_cart.cart_id = carts_of_users.cartID
    WHERE carts_of_users.cartID = ?`;

    try {
        const data = await Query(q, req.params.cartId);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send("Prolem with the cart");
    };
});

/** GET the CART ID of a specific USER by user ID **/
router.get("/getcartid/:userId", async (req, res) => {
    let q = `SELECT 
    cartID
    FROM carts_of_users
    where user_id =?`;

    try {
        const data = await Query(q, req.params.userId);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send("Prolem with the cart");
    };

});

/** ADD product to the CART **/
router.post("/addtocart", onlyUsers, async (req, res) => {
    const { product_id, amount, cart_id } = req.body;
    let q = `INSERT INTO products_of_cart
            (product_id, amount,cart_id)
            VALUES
            (?,?,?)`;
    try {
        const data = await Query(q, product_id, amount, cart_id);
        res.send(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/** ADD new ORDER **/
router.post("/neworder", onlyUsers, async (req, res) => {
    const { user_id, cart_id, sendCity, sendStreet, sendDate, payEnd } = req.body;
    let q = `INSERT INTO orders
    (user_id, cart_id, sendCity, sendStreet, sendDate , payEnd)
    VALUES
    (?,?,?,?,?,?)`;

    try {
        let shipDate;
        shipDate = (new Date(sendDate) + 1);
        let a = moment(shipDate).format();
        const b = a.split("+")[0];
        const c = b + ".000Z"
        const data = await Query(q, user_id, cart_id, sendCity, sendStreet, c, payEnd);

        console.log({ 'sendDate': sendDate })
        console.log({ 'shipDate': c })

        res.send(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/** GET DATES with 3 ORDERS **/
router.get("/busydate", async (req, res) => {
    let q = `SELECT 
    sendDate 
    ,count(*) AS c
    FROM orders
    group by sendDate
    HAVING c>2`;

    try {
        const data = await Query(q);
        res.status(200).json(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

/* GET CART DATE by CART ID */
router.post("/cartdate", async (req, res) => {
    const { user_id } = req.body;
    let q = `SELECT cartDate FROM carts_of_users
    WHERE user_id = ?`;

    try {
        const data = await Query(q, user_id);
        res.status(200).send(data);

    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* GET LAST ORDER DATE */
router.get("/lastorderdate/:userId", async (req, res) => {
    let q = `SELECT orderDate FROM orders
    WHERE user_id=?
    order by orderDate desc`;

    try {
        const data = await Query(q, req.params.userId);
        res.status(200).send(data[0]);
        console.log(data[0])

    } catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

/* DELETE specific product from a CART - by CART ID & PRODUCT ID */
router.delete("/deleteCartProduct/:cartId/:prodId", onlyUsers, async (req, res) => {
    let q = `DELETE from products_of_cart
    WHERE cart_id =?
    AND product_id =?`;


    try {
        const data = await Query(q, req.params.cartId, req.params.prodId);
        res.status(201).send("The product deleted!");
        console.log(data);



    } catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

/** DELETE all products of a specific CART by CART ID **/
router.delete("/deleteallproducts/:cartId", onlyUsers, async (req, res) => {
    let q = `DELETE from products_of_cart
    WHERE cart_id =?`

    try {
        const data = await Query(q, req.params.cartId);
        res.status(201)
        console.log(data)

    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* CREATE THE RECEIPT FILE */
router.post("/receiptFile", onlyUsers, async (req, res) => {
    const { content } = req.body;
    // const a = { "content": "apple, melon" };
    console.log(req.body)

    fs.writeFile('Receipt.txt', content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
        res.status(201).send('File is created successfully.');
    });

});

/* DOWNLOAD THE RECEIPT FILE */
router.get('/downloadReceip', function (req, res) {
    const file = `${__dirname}/Receipt.txt`;
    res.download(file, "Receipt.txt");
});





/***********************************************/

let Query = (q, ...p) => {
    return new Promise((resolve, reject) => {
        db.query(q, p, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            };
        });
    });
};

module.exports = router;