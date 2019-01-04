const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

//BodyParser MIddleware
app.use(bodyParser.json());


//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log("Mongo DB connected..."))
    .catch(error => console.log(error))

//Use Routes
app.use('/api/items', items)


//Server Port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))