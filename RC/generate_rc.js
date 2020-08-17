function generate_rc(dob_raw, order_raw, sex="M", add20=false){
    dob_raw = dob_raw.trim();
    dob_raw = dob_raw.replace(" ", "");



    function getIsoDate(isoDateMayBe){
        if(new Date(isoDateMayBe) !== "Invalid Date" && !isNaN(new Date(isoDateMayBe)) ) {
            if(isoDateMayBe==new Date(isoDateMayBe).toISOString()){
            return  isoDateMayBe;
            } else {
                return false;
                }                
            }
            else {
                return false;
            }
    }    

    let isoDateMayBe, dob
    if(dob_raw.includes("-") && dob_raw.length >= 10){         // pokus o parsing iso date        
        isoDateMayBe = dob_raw.slice(0,10) + "T00:00:00.000Z";

    } else if (dob_raw.includes(".") && dob_raw.length >= 8 && ob_raw.length <= 10) {  // pokus o parsing (d)d.(m)m.yyyy
        let dobSplit = dob_raw.split(".");
        if (dobSplit.length != 3){
            // nevalidni datum
        }

        let day = dobSplit[0];
        let month = dobSplit[1];
        let year = dobdobSplit[2];

        isoDateMayBe = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`;
    } else {
        // nevalidni datum
    }

    dob = getIsoDate(isoDateMayBe);
    if (!dob){
        // nevalidni datum
    } else {
        dob = dob.slice(0, 10);
    }

    console.log(isoDateMayBe, dob);
    let dobSplit = dob.split("-");
    let day =   parseInt(dobSplit[2]);
    let month = parseInt(dobSplit[1]);
    let year =  parseInt(dobSplit[0]);

    console.log(dob, year, month, day );

    if(year < 1900 && year > 2054){
        // nevalidni datum
    }
    
    if(add20){
        if(year < 2004){
            // nevalidni datum
        }
        month += 20;
    }

    if(sex=="F"){
        month += 50;
    }

    
    order_raw = order_raw.trim();
    if (order_raw.lengt > 3){
        order_raw = order_raw.slice(0,3);
    }
    
    let order;
    if (isNaN(order_raw)){
        // nevalidni order
    } else {
        order = parseInt(order_raw);
    }
    let rcShort
    rcShort = (year%100) * 10000000 + month* 100000 + day*1000 + order;
    console.log(dob, year, month, day );

    let rc;    
    if (year >= 1954){
        let check = rcShort % 11;
        rc = rcShort.toString() + check.toString();
    } else {
        rc = rcShort.toString() 
    }
    
    return rc;
    

}
//rc = generate_rc("1970-03-15", "004", "M", false);
rc = generate_rc("2014-11-28", "101", "M", false);
console.log(rc);