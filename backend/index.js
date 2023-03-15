const cors = require('cors');
const sequelize = require('sequelize');
const express = require('express');
const routing = require('./routes');
require('./models');

const app = express();
app.use(express.json());
app.use(cors());
routing(app);

app.listen(3333, () => {
	console.log("Server is running on port 3333");
});