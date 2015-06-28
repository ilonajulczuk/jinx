var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SiteSchema = new Schema({
    name: String,
    address: String,
    cname: String,
    active: Boolean,
    https: Boolean
});
module.exports = mongoose.model('Site', SiteSchema);
