var shippo = require('shippo')('shippo_live_e420be1e0a6e13e3d6334cfad5064b8958354f81');

function sendDelivery(req,res){
    shippo.address.create({
        'name' : 'Mr Hippo',
        'company' : 'SF Zoo',
        'street1' : '2945 Sloat Blvd',
        'city' : 'San Francisco',
        'state' : 'CA',
        'zip' : '94132',
        'country' : 'US',
        'phone' : '+1 555 341 9393',
        'email' : 'mrhippo@goshippo.com'
    }).then(function(address){
        console.log("shipment : %s", JSON.stringify(address));
    });

    var addressFrom  = {
        "name":"Ms Hippo",
        "company":"Shippo",
        "street1":"215 Clayton St.",
        "city":"San Francisco",
        "state":"CA",
        "zip":"94117",
        "country":"US", //iso2 country code
        "phone":"+1 555 341 9393",
        "email":"support@goshippo.com",
    };

    var addressTo = {
        "name":"Ms Hippo",
        "company":"Shippo",
        "street1":"803 Clayton St.",
        "city":"San Francisco",
        "state":"CA",
        "zip":"94117",
        "country":"US", //iso2 country code
        "phone":"+1 555 341 9393",
        "email":"support@goshippo.com",
    };

    var parcelOne = {
        "length":"5",
        "width":"5",
        "height":"5",
        "distance_unit":"in",
        "weight":"2",
        "mass_unit":"lb"
    };

    var parcelTwo = {
        "length":"5",
        "width":"5",
        "height":"5",
        "distance_unit":"in",
        "weight":"2",
        "mass_unit":"lb"
    };

    var shipment = {
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcelOne, parcelTwo],
    };

    shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcelOne, parcelTwo],
        "async": false
    }, function(err, shipment){
        // asynchronously called
    });

    shippo.transaction.create({
        "shipment": shipment,
        "servicelevel_token": "ups_ground",
        "carrier_account": "b741b99f95e841639b54272834bc478c",
        "label_file_type": "png"
    })
    .then(function(transaction) {
        shippo.transaction.list({
          "rate": transaction.rate
        })
        .then(function(mpsTransactions) {
            mpsTransactions.results.forEach(function(mpsTransaction){
                if(mpsTransaction.status == "SUCCESS") {
                    console.log("Label URL: %s", mpsTransaction.label_url);
                    console.log("Tracking Number: %s", mpsTransaction.tracking_number);
                } else {
                    // hanlde error transactions
                    console.log("Message: %s", mpsTransactions.messages);
                }
            });
        })
    }, function(err) {
        // Deal with an error
        console.log("There was an error creating transaction : %s", err.detail);
    });
}

module.exports = {
    sendDelivery: sendDelivery
}