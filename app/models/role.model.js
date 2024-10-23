const mongoose = require("mongoose");

const Subscription = mongoose.model( "Role", new mongoose.Schema({
    name: String
  })
);

module.exports = Subscription;
