import mongoose = require("mongoose");

export var init = () => {
    console.log('connecting to db');
    mongoose.connect('mongodb://127.0.0.1:27017/ngTetris');
};
