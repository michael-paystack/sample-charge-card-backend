var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;


describe("Paystack Subaccount", function() {

  var subaccount_id, subaccount_code;

  // New Subaccount
  it("should create a new subaccount", function(done) {
    paystack.subaccount.create({
      business_name: 'Super Cool Inc',
      settlement_bank: 'Access Bank',
      account_number: '0193274682',
      percentage_charge: 18.2
    }, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');
      expect(body.data).to.have.property('subaccount_code');

      subaccount_id = body.data.id;
      subaccount_code = body.data.subaccount_code;

      done();
    });
  });

  // Update Subaccount
  it("should update a subaccount", function(done) {
    paystack.subaccount.update(subaccount_code, {
      primary_contact_email: 'wale@obo.com',
      percentage_charge: 98.9
    }, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      done();
    });
  });

  // Fetch Subaccount
  it("should get details of a subaccount", function(done) {
    paystack.subaccount.get(subaccount_code, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.have.property('id');

      done();
    });
  });

  // list Banks
  it("should list supported banks", function(done) {
    paystack.subaccount.listBanks(function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);

      done();
    });
  });


  // List Subaccounts
  it("should list subaccounts", function(done) {
    paystack.subaccount.list(function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);

      done();
    });
  });

});
