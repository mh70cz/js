function validate_rc(rc_raw){
    let rc = rc_raw.trim();
    rc = rc.replace("/", "");
    rc = rc.replace(" ", "");

    let rc_obj = {};
    rc_obj.rc_raw = rc_raw;
    rc_obj.rc = rc;
    rc_obj.valid = false;
    rc_obj.dob = "";
    rc_obj.sex = "";
    rc_obj.note = "";
    
    function check_get_date(rc){
        let year = parseInt(rc.slice(0,2));
        if (rc.length == 9){
            year += 1900;
        }
        else if (year > 54) {
            year += 1900;
        } else {
            year += 2000;
        }
    
        let month = parseInt(rc.slice(2,4));
        // ženy mají k měsíci narození připočteno 50
        if (month > 50 && month < 63){
            month -= 50;
        }
    
        // Od roku 2004 (zák. 53/2004 Sb.) je navíc zavedena možnost v případě,
        // že jsou v některý den vyčerpána všechna platná čtyřčíslí,
        // použít alternativní rodné číslo, kde se k číslu měsíce přičte ještě 20
        // (u žen tedy celkem 70).
        if (month > 20 && month < 33 && year >= 2004){
            month -= 20;
        }
    
        if (month > 70 && month < 83 && year >= 2004){
            month -= 70;
        }
    
        let day = parseInt(rc.slice(4,6));
        
        // https://stackoverflow.com/questions/7445328/check-if-a-string-is-a-date-value
        let isoDate = `${year.toString()}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`
        //console.log(isoDate);
    
            if(new Date(isoDate) !== "Invalid Date" && !isNaN(new Date(isoDate)) ) {
                if(isoDate==new Date(isoDate).toISOString()){
                return [true, isoDate];
                } else {
                    return [false, ""];
                    }
                    
                }
                else {
                    return [false, ""];
                }
    
    }

    if (isNaN(rc)){
        rc_obj.note = "Not a number";
        return rc_obj;
    }

    if (rc.length < 9 ) {
        rc_obj.note = "Too short";
        return rc_obj;
    }

    if (rc.length > 10 ) {
        rc_obj.note = "Too long";
        return rc_obj;
    }

    cg_date = check_get_date(rc);
    if (cg_date[0] == false){
        rc_obj.note = "Wrong date";
        return rc_obj;
    } else
    {
        rc_obj.dob = cg_date[1].slice(0,10) // date string in yyyy-mm-dd format
    }

    if (rc.slice(2,3) in ["0", "1", "2", "3"]) {
        rc_obj.sex = "M";
    } else {
        rc_obj.sex = "F";
    }


    
    


    return rc_obj;
}

let rcs_raw = [
    "7003150044",
    "700315/0044",
    " 700315/0044 ",
    "x7003150044",
    "70031500445",
    "70031500",
];

for (let rc_raw of rcs_raw) { 
    let rc = validate_rc(rc_raw);
    console.log(rc_raw); 
    console.log(rc);
    console.log("\n") 
 }