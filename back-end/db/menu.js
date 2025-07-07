const mongoose = require('mongoose');

const menusSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String
});

module.exports = mongoose.model("menu", menusSchema);