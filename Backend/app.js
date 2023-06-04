const express = require('express');
require('dotenv').config();
require('./models/db');
var cors = require('cors')
const router = require('./routes/routes');

const app = express();
app.use(cors())
app.use(express.json());
app.use(router);

app.listen(5000, () => {
    console.log('server is running at port 5000');
});