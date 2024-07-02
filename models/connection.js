const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://mmanriquecobos:P3iyc_Lit!yQAYD@cluster0.qajzklx.mongodb.net/tickethack'

mongoose.connect(connectionString, { connectTimeoutMS:2000})
.then(() => console.log('Database connected'))
.catch(error => console.error(error));

module.export = connectionString