require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/developer.routes')(app);
require('./routes/company.routes')(app);
require('./routes/jobs.routes')(app);


app.listen(process.env.MY_PORT, () =>
    console.log(`Listening on port ${process.env.MY_PORT}! Lets go baby!`) 
); 
