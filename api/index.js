const express = require('express');
const cors = require('cors');
const app= express();

app.use(cors({
    credentials: true,
    // origin
}));
app.get('/test', (req, res) => {
    res.json('test is ok')
});

app.listen(4000);