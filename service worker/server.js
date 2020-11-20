const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

//Middleware to serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
