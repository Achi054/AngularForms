const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyparser.json);

app.post('/enrollment', function (req, res) {
    console.log(req.body);
    res.status(401).send({
        'message': 'Data recieved'
    });
});

app.listen(PORT, function () {
    console.log(`Server has started at port ${PORT}`);
});