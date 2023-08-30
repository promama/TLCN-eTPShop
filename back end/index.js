const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to my online shop')
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is listening to port: ${port}`));