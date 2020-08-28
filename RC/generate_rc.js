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

    let dob, dobSplit, isoDateMayBe, day, month, year;

    let  order, rcShort, rc, check;

    let rcObj = {};
    rcObj.success = false;
    rcObj.rc = "";
    rcObj.dob = "";
    rcObj.note = "";


    if(dob_raw.includes("-") && dob_raw.length >= 10){ 
        // pokus o parsing iso date        
        isoDateMayBe = dob_raw.slice(0,10) + "T00:00:00.000Z";

    } else if (dob_raw.includes(".") && dob_raw.length >= 8 && dob_raw.length <= 10) {  
        // pokus o parsing (d)d.(m)m.yyyy
        let dobSplit = dob_raw.split(".");
        if (dobSplit.length != 3){
            rcObj.note="Invalid date";
            return rcObj;
        }

        let day = dobSplit[0];
        let month = dobSplit[1];
        let year = dobSplit[2];

        isoDateMayBe = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`;
    } else {
        rcObj.note="Invalid date";
        return rcObj;
    }

    dob = getIsoDate(isoDateMayBe);
    if (!dob){
        rcObj.note="Invalid date";
        return rcObj;
    } else {
        dob = dob.slice(0, 10);
    }

    console.log(isoDateMayBe, dob);
    dobSplit = dob.split("-");
    day =   parseInt(dobSplit[2]);
    month = parseInt(dobSplit[1]);
    year =  parseInt(dobSplit[0]);

    console.log(dob, year, month, day );

    if(year < 1900 || year > 2053){
        rcObj.note="Invalid date";
        return rcObj;
    }
    
    if(add20){
        if(year < 2004){
            rcObj.note="Invalid date";
            return rcObj;
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
    
    order;
    if (isNaN(order_raw)){
        rcObj.note="Nevalidní pořadové číslo";
        return rcObj;
    } else {
        order = parseInt(order_raw);
    }

    rcShort = (year%100) * 10000000 + month* 100000 + day*1000 + order;
    console.log(dob, year, month, day );

       
    if (year >= 1954){
        check = rcShort % 11;
        rc = rcShort.toString() + check.toString();
    } else {
        rc = rcShort.toString() 
    }

    if ( (year%100) < 10){
       rc = "0" + rc;
    }
    
    rcObj.success = true;
    rcObj.rc = rc;
    rcObj.dob = dob;
    return rcObj;
    

}
//rc = generate_rc("1970-03-15", "004", "M", false);
//rc = generate_rc("2014-11-28", "101", "M", false);
//let inp = ["1970-03-15", "004", "M", false];

//rc = generate_rc(...inp);

//console.log(rc);