const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('images'));

app.use('/mysuper/auth', require('./authRoutes'));
app.use('/mysuper/admin', require('./adminRoutes'));
app.use('/mysuper/products', require('./productsRoutes'));



app.listen(1000, console.log("Server is working :)"));