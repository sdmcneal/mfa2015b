
/**
 * Created by Scott on 5/24/2015.
 */

var mongoose = require('mongoose');
var async = require('async');

var balanceSchema = mongoose.Schema ( {
   account: String,
    balance: Number,
    date: Date,
    forecast_model_id: String,
    asset_type: String
});

balanceSchema.prototype.toString = function() {
    var result = "account: " + this.account +
            ", balance: " + this.balance +
            ", date: " + this.date +
            ", forcast_model_id: " + this.forecast_model_id +
            ", asset_type: " + this.asset_type;
    return result;
};
