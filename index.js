var fs = require('fs');
var async = require('async');
/**
 * Created by Scott on 5/24/2015.
 */

console.log(fs.readdirSync(__dirname));

function showFiles(err, files) {
    console.log(files);
}

fs.readdir('.',showFiles);

var express = require('express');
var mongoose= require('mongoose');
var asset = require('./asset.js');

mongoose.connect("mongodb://127.0.0.1/financials");
var db = mongoose.connection;


function reset_ledger(callback) {
    console.log('reset ledger');
    callback(null);

}

function reset_collections(db,callback) {
    console.log('reset collections');
    db.db.dropCollection('ledgers',function(err,result) {
        if (err) {
            console.log('error: ' + err);
        } else {

            console.log('dropped ledger collection');
        }
    });
    callback(null);
}


db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(callback) {
    console.log("database open");
    reset_collections(db, function (err, callback) {


    var myAsset = new asset({name: 'Home'});
    myAsset.areyouthere();
    myAsset.save( function(err,myAsset) {
        if (err) return console.error(err);
        myAsset.areyouthere();
        console.log('002 end save')
    });
        // don't write new entries yet
    //myAsset.writeLedgerEntries('999', function(err) {
    //    if (err) return console.error(err);
    //    console.log('003 end write ledger');
    //});

    //
    // sequence 2 threads.  first are all the async calculations like mortgage payments that don't
    // really matter about balances, etc.
    // then sequence by date that we're planning for
    //
    // async
    //   mortgage, readiloans, paychecks, monthly bills

});
db.close(function(err) {
    console.log('db closed');
})
});