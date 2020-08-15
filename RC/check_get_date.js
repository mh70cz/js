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

let rcs = [
    "7003150044",
    "1411281014", 
    "7662150892", 
    "0002291234",
    "0002291234",  //wrong check digit
    
    // wrong dates
    "0102291234",  //wrong check digit
    '7113011235', 
    '7202301238', 
    '7363113219', 
    '7754318528',    
    '530230753', 
    '131320753',
];

for (let rc of rcs){
    let result = check_get_date(rc)
    console.log(result);
}