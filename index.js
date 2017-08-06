//server-side: common modules use 'require'

const express = require('express');
const app = express();

console.log('Server running');

//watch for incoming requests with this method
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);