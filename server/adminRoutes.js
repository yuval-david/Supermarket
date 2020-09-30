/* ADMIN */

const router = require('express').Router();
const db = require('./connectDB');
const { onlyAdmin } = require('./mw');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');


/** POST - ADD a PRODUCT **/
router.post("/add", onlyAdmin, async (req, res) => {
    let q = `INSERT INTO products
    (productName, category_id, price, image)
    VALUES
    (?,?,?,?)`;
    const { productName, category_id, price, image } = req.body;

    let pathImage = image.split("fakepath")[1];

    try {
        let data = await Query(q, productName, category_id, price, pathImage);
        res.status(201).json(data);
    } catch (err) {
        res.status(500);
        throw err;
    }
});

/** PUT - EDIT a PRODUCT **/
router.put("/edit/:id", onlyAdmin, async (req, res) => {

    const { productName, category_id, price, image } = req.body;

    let pathImage = image.split("fakepath")[1];

    // image.split("fakepath")[1]  במקום פרמס

    let q = `UPDATE products
    SET productName=?,category_id=?, price=?, image=?
    WHERE productID=?`;

    try {
        /* לוודא שנתיב התמונה נשמר נכון בבסיס הנתונים */
        let data = await Query(q, productName, category_id, price, pathImage, req.params.id);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).send("The edited failed...");
        throw err;
    }
});

/** POST - UPLOAD IMAGE **/
router.post("/upload/:imageName", onlyAdmin, async (req, res) => {
    let form = new formidable.IncomingForm();
    console.log(form);

    form.parse(req, (err, fields, files) => {

        console.log(files.file.path);
        let oldpath = files.file.path;
        // let oldpath = "C:/Users/יובל/Pictures/dog.jpg";
        let newpath = path.join(__dirname + "/images/" + req.params.imageName);

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.send('File uploaded!');
        });
    });

});


module.exports = router;


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