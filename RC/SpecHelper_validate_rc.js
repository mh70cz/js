describe("Validete RC", function() {


    describe("trivial validation", function() {
        let rc_raw = "7003150044";

        it(rc_raw + "should be a valid RC", function() {            
        expect(validate_rc(rc_raw).valid).toEqual(true);
        });
    
        it("sex should be male", function() {
        expect(validate_rc(rc_raw).sex).toEqual("M");
        });

        let dob = "1970-03-15";
        it("Date of Birth should be " + dob, function() {
            expect(validate_rc(rc_raw).dob).toEqual(dob);
            });

    });


    describe("spaces + / ", function() {
        let rcs_raw = [
            "700315/0044",
            " 700315/0044 ",
            "70 03150044 ",
        ];
        for (const rc_raw of rcs_raw) {
            it(rc_raw + " should be a valid RC", function() {            
            expect(validate_rc(rc_raw).valid).toEqual(true);
            });            
        }
    });

    describe("pre 1.1. 1954", function(){
        let rcs_raw_ok = [
            "290317022",
            "275317/022",
            "535317022",
        ];
        let rcs_raw_fail = [
            "590317022",
            "575317/022",
            "545317022",
        ];

        for (const rc_raw of rcs_raw_ok) {
            it(rc_raw + " should be a valid RC", function() {            
            expect(validate_rc(rc_raw).valid).toEqual(true);
            });
        }      

        for (const rc_raw of rcs_raw_fail) {
            it(rc_raw + " should NOT be a valid RC", function() {            
            expect(validate_rc(rc_raw).valid).toEqual(false);
            });            
        }
    });


    describe("exceptional RC", function(){
        // výjimka: pokud je zbytek po dělení devítimístného čísla roven deseti 
        // (a neexistuje tedy žádná kontrolní číslice, která by splňovala předchozí podmínku), 
        // jako kontrolní číslice se použije nula (a celé rodné číslo pak dělitelné jedenácti není).


        let rcs_raw_ok = ["7012115760", "7203045070", "6909107360", "6306258080",
            "7206251900", "5711193280", "5905250330", "6705026780",
            "8105183670", "5904225240"];

        for (const rc_raw of rcs_raw_ok) {
            it(rc_raw + " should be a valid RC", function() {            
            expect(validate_rc(rc_raw).valid).toEqual(true);
            });
        }      
    });


    describe("wrong check digit RC", function(){

        let rcs_raw_fail = ["7003150045", "1411281013", "7662150890",
        "6412161021", "6307249629", '7113011235', '7202301238', '7363113219', '7754318528',
        '530230753', '131320753', '256931/852', '266611/951', '275431/456'];

        for (const rc_raw of rcs_raw_fail) {
            it(rc_raw + " should NOT be a valid RC", function() {            
            expect(validate_rc(rc_raw).valid).toEqual(false);
            });
        }      
    });



  });
  