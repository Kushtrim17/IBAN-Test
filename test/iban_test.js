var expect = require('chai').expect;
//Test suite
describe('IBAN', function() {
    var IBAN = require('../js/iban_validator').IBAN;

    it ('it should check if the entered IBAN nr is valid', function() {
        expect(IBAN.validateIBAN('GB82 WEST 1234 5698 7654 32')).to.be.true;
        expect(IBAN.validateIBAN('Gb82 West 1234 5698 7654 32')).to.be.true;
        expect(IBAN.validateIBAN('GB82 TEST 1234 5698 7654 32')).to.be.false;
        expect(IBAN.validateIBAN('GR16 0110 1250 0000 0001 2300 695')).to.be.true;
        expect(IBAN.validateIBAN('GB29 NWBK 6016 1331 9268 19')).to.be.true;
        expect(IBAN.validateIBAN('SA03 8000 0000 6080 1016 7519')).to.be.true;
        expect(IBAN.validateIBAN('CH93 0076 2011 6238 5295 7')).to.be.true;
        expect(IBAN.validateIBAN('IL62 0108 0000 0009 9999 999')).to.be.true;
        expect(IBAN.validateIBAN('GT11 2222 3333 4444 5555 6666 7777')).to.be.false;
        expect(IBAN.validateIBAN('MK11 2222 3333 4444 555')).to.be.false;

        expect(IBAN.validateIBAN('IL62-0108-0000-0009-9999-999')).to.be.false;
        expect(IBAN.validateIBAN('US12 3456 7890 0987 6543 210')).to.be.false;
        expect(IBAN.validateIBAN('GR16 0110 1250 0000 0001 2300 695X')).to.be.false;
        
    });
});