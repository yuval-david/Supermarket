/* AUTHENTICATION */

const router = require('express').Router();
const db = require('./connectDB');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passwords = require('./passwords');
let userID;

/* POST - REGISTER */
router.post("/register", async (req, res) => {
    const { userID, firstName, lastName, email, password, city, street, isAdmin = false } = req.body;
    if (userID && firstName && lastName && email && password && city && street && isAdmin != undefined) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let q = `INSERT INTO users
                (userID, firstName, lastName, email, password, city, street, isAdmin)
                VALUES
                (?,?,?,?,?,?,?,?)
                `;
                try {
                    const data = await Query(q, userID, firstName, lastName, email, hash, city, street, isAdmin);
                    console.log(data);
                    res.sendStatus(201);
                } catch (err) {
                    res.sendStatus(500);
                    throw err;
                }
            })
        })
    } else {
        res.status(400).send("Missing some info");
    }
});

/* POST - LOGIN */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {

        const q = `SELECT * FROM USERS
        WHERE email = ? `

        const user = await Query(q, email);
        console.log(user[0]);

        if (user[0]) {
            if (bcrypt.compareSync(password, user[0].password)) {
                jwt.sign(
                    {
                        email: user[0].email,
                        isAdmin: user[0].isAdmin,
                        userID: user[0].userID,
                        firstName: user[0].firstName,
                        street: user[0].street,
                        city: user[0].city
                    },
                    passwords.JWT_Secret,
                    // { expiresIn: "10m" },
                    (err, token) => {
                        if (err) {
                            res.status(400).send("Token not found");

                        }
                        res.status(201).json({
                            token: token,
                            userID: user[0].userID,
                            firstName: user[0].firstName,
                            isAdmin: user[0].isAdmin

                        });
                        userID = user[0].userID;
                    }
                )
            } else {
                res.status(400).send("Wrong password");
            }
        } else {
            res.status(400).send("User not found");
        }
    } else {
        res.status(400).send("Missing some info");
    }
});

/* GET if there is a CART to specific USER BY his ID */
router.get("/hascart/:userId", async (req, res) => {
    let q = `SELECT COUNT(cartID)
    FROM carts_of_users
    WHERE user_id =?`;

    try {
        const data = await Query(q, req.params.userId);
        res.json(data[0]["COUNT(cartID)"]);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* GET if there were ORDERS to specific USER BY his ID */
router.get("/hadorders/:userId", async (req, res) => {
    let q = `SELECT COUNT(orderID)
    FROM orders
    WHERE user_id =?`;

    try {
        const data = await Query(q, req.params.userId);
        res.json(data[0]["COUNT(orderID)"]);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }

});

/* GET city of USER by user ID */
router.get("/getcity/:userId", async (req, res) => {
    let q = `SELECT
    city
    from users
    WHERE userID = ?`;

    try {
        const data = await Query(q, req.params.userId);
        res.status(200).json(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* GET street of USER by user ID */
router.get("/getstreet/:userId", async (req, res) => {
    let q = `SELECT
    street
    from users
    WHERE userID = ?`;

    try {
        const data = await Query(q, req.params.userId);
        res.status(200).json(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* GET all user's ID NUMBERS (FOR REGISTER PROCESS) */
router.get("/allUsersID", async (req, res) => {
    let q = `SELECT userID FROM users`;

    try {
        const data = await Query(q);
        res.status(200).json(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

/* GET all user's EMAILS (FOR REGISTER PROCESS) */
router.get("/allUsersEmail", async (req, res) => {
    let q = `SELECT email FROM users`;

    try {
        const data = await Query(q);
        res.status(200).json(data);
    } catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


/********************************/

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


