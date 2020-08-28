describe("Generate RC", function () {


    describe("iso dates", function () {
        let inpexps = [
            [["1970-03-15", "004", "M", false], "7003150044"],
            [["2014-11-28", "101", "M", false], "1411281014"],
            [["1974-04-17", "003", "F", false], "7454170031"],

        ];
        for (const inpexp of inpexps) {
            let inp = inpexp[0];
            let expected = inpexp[1];
            it(inp.join() + "  should successfuly generate RC", function () {
                let rcObj = generate_rc(...inp);
                expect(rcObj.success).toEqual(true);
                expect(rcObj.rc).toEqual(expected);
            });
        }
    });

    describe("d.m.yyyy dates", function () {
        let inpexps2 = [
            [["15.3.1970", "004", "M", false], "7003150044"],
            [["28.11.2014", "101", "M", false], "1411281014"],
            [["17.4.1974", "003", "F", false], "7454170031"],
            [["07.07.1977", "777", "F", false], "7757077779"],
            [["05.05.1955", "555", "M", false], "5505055556"],
            [["15.3.2004", "006", "M", false], "0403150066"],

        ];
        for (const inpexp of inpexps2) {
            let inp = inpexp[0];
            let expected = inpexp[1];
            it(inp.join() + "  should successfuly generate RC", function () {
                let rcObj = generate_rc(...inp);
                expect(rcObj.success).toEqual(true);
                expect(rcObj.rc).toEqual(expected);
            });
        }
    });

    describe("invalid iso dates", function () {
        it("should fail and note should be Invalid date ",
            function () {
                rcObj = generate_rc("1970-13-15", "004", "M", false);
                expect(rcObj.success).toEqual(false);
                expect(rcObj.note).toEqual("Invalid date");
            });
    });

    describe("invalid d.m.yyyy dates - it should fail and note should be Invalid date",
        function () {

            wrongDates = [
                "15.13.1970",
                "35.1.1970",
                "29.2.2001",
                "31.12.1899",
                "2.2.2054"
            ]
            for (const wDate of wrongDates) {
                it(wDate, function () {

                    rcObj = generate_rc(wDate, "004", "M", false);
                    expect(rcObj.success).toEqual(false);
                    expect(rcObj.note).toEqual("Invalid date");
                });
            }
        });


    // describe("", function(){
    //      it("", function(){        
    //      });        
    // });

});
