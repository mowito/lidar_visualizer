var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); //__dir and not _dir
const PORT = process.env.PORT || 5000; // you can use any port
app.listen(PORT);
console.log('server on ' + PORT);
