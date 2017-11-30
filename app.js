const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(5000, () => {
    console.log('app listening on port 3000');
});
