const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/devsondeck", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the database called ${process.env.DB_NAME}`))
    .catch(err => console.log(`Something went wrong when connecting to ${process.env.DB_NAME} Here is your error:`, err));

