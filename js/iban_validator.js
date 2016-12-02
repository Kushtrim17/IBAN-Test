/**
 * The IBAN consists of up to 34 alphanumeric characters comprising: a country code; two check digits; 
 * and a number that includes the domestic bank account number, branch identifier, and potential routing information. 
 * The check digits enable a sanity check of the bank account number to confirm its integrity before submitting a transaction.
 * SOURCE : WIKIPEDIA
 */
var IBAN = {

    ibanNR : "",

    /**
     * this is an object that contains the country code and the length of the IBAN nr of each country
     * taken from WIKIPEDIA - https://en.wikipedia.org/wiki/International_Bank_Account_Number#IBAN_formats_by_country
     */
    ibanEntryAndLength : { 
        NO:15, BE:16, DK:18, FI:18, FO:18, GL:18, NL:18, MK:19,
        SI:19, AT:20, BA:20, EE:20, KZ:20, LT:20, LU:20, CR:21,
        CH:21, HR:21, LI:21, LV:21, BG:22, BH:22, DE:22, GB:22,
        GE:22, IE:22, ME:22, RS:22, AE:23, GI:23, IL:23, AD:24,
        CZ:24, ES:24, MD:24, PK:24, RO:24, SA:24, SE:24, SK:24,
        VG:24, TN:24, PT:25, IS:26, TR:26, FR:27, GR:27, IT:27,
        MC:27, MR:27, SM:27, AL:28, AZ:28, CY:28, DO:28, GT:28,
        HU:28, LB:28, PL:28, BR:29, PS:29, KW:30, MU:30, MT:31
    },

    /**
     * the error message
     */
    ERROR_MESSAGE   : "The IBAN number you provided is wrong!",
    
    /**
     * the success message
     */
    SUCCESS_MESSAGE : "The IBAN number you provided was correct!",

    /**
     * the IBAN validation status
     */
    validationMSG : "",

    /**
     * validateIBAN - is the function called after we have called setIBAN
     * this function is called from OUTSIDE i.e. public
     * @param String ibanNR - the iban nr to validated
     * @return Bool
     */
    validateIBAN : function(ibanNR) {
        //the users might put it in with spaces between like e.g. DE44 5001 0517 5407 3249 31
        //we remove the spaces
        this.ibanNR = ibanNR.replace(/\s/g, "");

        if(this.isValidEntryAndLength() == true) {
            //rearrange iban by moving the first 4 characters at the end
            var iban = this.ibanNR.substring(4) + this.ibanNR.substring(0, 4);
            
            if (this.modulo(this.finalizeIBAN(iban), 97) == 1) {
                this.setStatus(this.SUCCESS_MESSAGE);
                return true;
            }
        }
        
        this.setStatus(this.ERROR_MESSAGE);
        return false;
    },

    /**
     * isValidEntryAndLength
     * @return Bool
     */
    isValidEntryAndLength : function() {
        //get only the first two letters from the iban nr
        var countryEntry = this.ibanNR.substring(0, 2).toUpperCase();
        //check if the country entry i.e. the first two letters are correct
        if (this.ibanEntryAndLength[countryEntry] != undefined) {
            //check if the length of the ibanNr entered is correct
            var validLength = parseInt(this.ibanEntryAndLength[countryEntry]);
            if (this.ibanNR.length  == validLength) {
                //console.log('the entry and the length are correct');
                return true;
            }
        }

        this.setStatus(this.ERROR_MESSAGE); 
        //console.log('the entry/length or both are wrong');
        return false;
    },

    /**
     * finalizeIBAN - converts the characters in the IBAN into numbers
     * @param String  iban 
     * @return String ibanFinal - the normalized form of iban ready to be validated
     */
    finalizeIBAN : function(iban) {
        var ibanFinal = "";
        //we iterate through all the characters if iban and replace string characters with nrs
        // A : 10 , B : 11, C : 12 .... Z : 35
        for (i = 0; i < iban.length; i++) {
            //a trick to detect if character is a letter
            var tmp = iban[i].toUpperCase();
            if (tmp.toLowerCase() != tmp) {
                //it is a letter so convert it to ASCII - 55
                ibanFinal += (tmp.charCodeAt() - 55);
            }
            else {
                ibanFinal += tmp;
            }
        }

        return ibanFinal;
    },

    /**
     * modulo - javascript cannot handle divisions with very larg numbers
     * such as the iban number therefore we have to do it in this way 
     */
    modulo: function(divident, divisor) {
        var partLength = 10; 
        while (divident.length > partLength) {
            var part = divident.substring(0, partLength);
            divident = (part % divisor) +  divident.substring(partLength);  
        }

        return divident % divisor;
    },

    /**
     * setStatus - sets the IBAN status message
     */
    setStatus : function(statusMSG) {
        this.validationMSG = statusMSG;
    },

   /**
    * getStatus
    */
    getStatus : function() {
        return this.validationMSG;
    }
}

exports.IBAN = IBAN;