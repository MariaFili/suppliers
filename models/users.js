const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    name: String,
    password: String,
});



module.exports = mongoose.model('Users', usersSchema);