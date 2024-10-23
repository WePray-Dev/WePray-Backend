const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.subscriptions = require("./role.model");

db.SUBSCRIPTIONS = [ "FREE", "PREMIUM" , "ENTERPRISE" ];

module.exports = db;
