const mongoose = require("mongoose");
 const connection = mongoose.connect('mongodb://localhost:27017/mychat', {
 useNewUrlParser: true,
 useUnifiedTopology: true
 })
 .then(() => console.log('Connected to MongoDB ...'))
 .catch(err => console.error('Could not connect to MongoDB:27017', err));
mongoose.set('useCreateIndex', true);

module.exports = [].concat(connection);
