
/**
 * Created by Scott on 5/24/2015.
 */

var mongoose = require('mongoose');
var Ledger = require('./ledger.js');
var async = require('async');
//var AssetSchedule = require('./AssetSchedule.js');
function pad(
    a, // the number to convert
    b // number of resulting characters
){
    return (
        1e15 + a + // combine with large number
        "" // convert to string
    ).slice(-b) // cut leading "1"
}
function AssetSchedule (principle,payment,interest) {
    this.principle = principle;
    this.payment = payment;
    this.interest = interest;
}

AssetSchedule.prototype = {
    principle: 0.0,
    payment: 0.0,
    interest: 0.0
};

AssetSchedule.prototype.toString = function() {
    return 'Principle: ' + this.principle +
        ', Payment: ' + this.payment +
        '. Interest: ' + this.interest;
};
function loan() {
    var a = 425600; //loan amount
    var b = 3.375; //interest rate
    var c = 15; //years
    var n = c * 12;
    var r = b/(12*100);
    var p = (a * r *Math.pow((1+r),n))/(Math.pow((1+r),n)-1);
    var prin = Math.round(p*100)/100;

    var mon = Math.round(((n * prin) - a)*100)/100;

    var tot = Math.round((mon/n)*100)/100;

    var year = 2015;
    var month = 1;

    var ledger_array = [];

    var start = Date.now();

    for(var i=0;i<n;i++)
    {
        var z = a * r * 1;
        var q = Math.round(z*100)/100;
        var t = p - z;
        var w = Math.round(t*100)/100;
        var e = a-t;
        var l = Math.round(e*100)/100;
        a=e;

        // transaction date in ISO format
        var isodate = "" + year + "-" + pad(month,2) + "-01T00:00:00Z";
        month++;
        if (month==13) {
            month=1;
            year++;
        }
        //print("date=" + isodate + " q=" + q + " w=" + w + " l=" + l);

        // insert principle balance in Home Loan
        ledger_array.push( new Ledger( {
            user_id: 1,
            account: "Falls Drive Loan",
            description: "Loan",
            amount: l,
            date: new Date(isodate),
            forecast_model_id: "999"
        }));
        //var principle_entry = {
        //    "accountname" : "Falls Drive Loan",
        //    "balance" : l,
        //    "date": new ISODate(isodate),
        //    "scenarioid": "1",
        //    "scenariodescription" : "1 Fixed (Jan 2015)"
        //}
        //db.balances.insert(principle_entry);
        //
        //// insert interest transaction for tax purposes in Home Loan
        //var interest_entry = {
        //    "accountname" : "Falls Drive Loan",
        //    "amount" : q,
        //    "tax" : 1,
        //    "taximpact" : "deduction",
        //    "date" : new ISODate(isodate),
        //    "scenarioid": "1",
        //    "scenariodescription" : "1 Fixed (Jan 2015)"
        //}
        //db.ledger.insert(interest_entry);
        //
        //// insert payment transaction in checking
        //var checking_entry = {
        //    "accountname" : "Checking",
        //    "amount" : -3428.16,
        //    "date" : new ISODate(isodate),
        //    "scenarioid": "1",
        //    "scenariodescription" : "1 Fixed (Jan 2015)"
        //}
        //db.ledger.insert(checking_entry);
    }
    //console.log(ledger_array);


    var asyncTasks = [];

    ledger_array.forEach(function(item) {
        asyncTasks.push(function(callback) {
            item.save(callback);
            console.log("005 saved " + item); // does it make it here?
            callback();
        })
    });

    asyncTasks.push(function(callback) {
        setTimeout(function(){
            console.log('it\'s been 3 seconds');
            callback();
        },3000);
    });

    async.parallel(asyncTasks, function(err) {
        console.log('004 all done');
    });
    console.log(Date.now() - start);
}


var assetSchema = mongoose.Schema( {
    name : String,
    start_balance: Number,
    yearly_appreciation: Number,
    start_liability: Number,
    asset_account: String,
    liability_account: String,
    liability_interest: Number
});

assetSchema.methods.areyouthere = function() {
    console.log('Asset is here.');
};

assetSchema.methods.writeLedgerEntries = function(scenario, cb) {
    var myledger = new Ledger({ account: "Checking", amount: 123.45, forecast_model_id: "999"});
    //var schedule = new AssetSchedule(1.0,2.0,3.0);
    loan();
    //console.log();
    myledger.save(cb);
};

// Usage: var Asset = require('asset.js');
// var myAsset = new Asset
module.exports = mongoose.model('Asset',assetSchema);
