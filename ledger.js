/**
 * Created by Scott on 5/24/2015.
 */
var mongoose = require('mongoose');

var ledgerSchema = mongoose.Schema( {
    user_id: Number,
    account: String,
    description: String,
    amount: Number,
    date: Date,
    forecast_model_id: String

});

ledgerSchema.methods.toString = function() {
    var result =
        "user_id: " + this.user_id +
            ", account: " + this.account +
            ", description: " + this.description +
            ", amount: " + this.amount +
            ", forecast: " + this.forecast_model_id;

    return result;
};

ledgerSchema.statics.resetForecast = function(connection) {
//
};

module.exports = mongoose.model('Ledger',ledgerSchema);