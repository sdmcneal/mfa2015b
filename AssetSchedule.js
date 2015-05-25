/**
 * Created by Scott on 5/24/2015.
 */

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

module.exports - new AssetSchedule();
