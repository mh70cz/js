'use strict';

var app = angular.module('SVK_SocialnaPoistovna_Detail', []);

app.controller('MainController', function ($scope) {

    var selectedLang = InputData.reportData.metaDataMC.Language;

    var supportedLanguages = ["en-US", "cs-CZ", "sk-SK", "fa-IR"];
    if (supportedLanguages.indexOf(selectedLang) === -1) {
        selectedLang = "en-US";
    }

    var LLoVinSelectedLanguage = {};

    LLoVinSelectedLanguage.request = {};
    LLoVinSelectedLanguage.response = {};
    LLoVinSelectedLanguage.report = {};

    var key;
    for (key in LLoV.request) {
        LLoVinSelectedLanguage.request[key] = LLoV.request[key][selectedLang];
    }

    for (key in LLoV.response) {
        LLoVinSelectedLanguage.response[key] = LLoV.response[key][selectedLang];
    }

    for (key in LLoV.report) {
        LLoVinSelectedLanguage.report[key] = LLoV.report[key][selectedLang];
    }
    console.log(LLoVinSelectedLanguage);

    var dFormat;
    var dtFormat;
    var lngFormat;
    switch (selectedLang) {
        case "cs-CZ":
        case "sk-SK":
            dFormat = "d.M.yyyy";
            dtFormat = "d.M.yyyy HH:mm:ss";
            lngFormat = "ltr";
            break;
        case "fa-IR":
            dFormat = "yyyy/M/d";
            dtFormat = "yyyy/M/d ss:mm:HH";
            lngFormat = "rtl";
            break;
        case "en-US":
        default:
            dFormat = "yyyy-MM-dd";
            dtFormat = "yyyy-MM-dd HH:mm:ss";
            lngFormat = "ltr";
    }

    var requestToMC = InputData.reportData.requestToMC;
    var responseFromMC = InputData.reportData.responseFromMC;

    $scope.rqu = requestToMC;
    $scope.rsp = responseFromMC;
    $scope.rspLLoV = LLoVinSelectedLanguage.response;
    $scope.rquLLoV = LLoVinSelectedLanguage.request;
    $scope.rptLLoV = LLoVinSelectedLanguage.report;
    $scope.dFormat = dFormat;
    $scope.dtFormat = dtFormat;

    /* Data processing */
    Object.prototype.get = function (prop) {
        var parts = prop.split('.');
        var obj = this;
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            if (obj[p] === undefined) {
                obj[p] = LLoVinSelectedLanguage.report.Undefined;
            }
            obj = obj[p];
        }
        return obj;
    };

    var clientData = InputData.get("reportData").get("requestToMC").get("BasicParam");
    var response = InputData.get("reportData").get("responseFromMC");
    var metaDataMC = InputData.reportData.metaDataMC;
    $scope.mtd = metaDataMC;

    /* Data for SubjectDetails */
    $scope.subjectDetails = {
        subjectId: clientData.get("Pin"), /* Rodné číslo / IČO bez lomitok */
        clientName: parseObj(clientData.get("Name")),
        clientSurname: parseObj(clientData.get("Surname")),
        requestDate: "", /* Missing!!! */ /* clientData.get("requestDate"), */
        responseDate: response.get("ControlArea").get("ResponseTimeStamp"),
        clientId: parseObj(clientData.get("ClientId")), /* parseObj(clientData.get("clientName")) + " " + parseObj(clientData.get("clientSurname")), */

        request: {
            monthsNr: clientData.get("MonthCount"),
            employer: {
                employerIco: clientData.get("RegistrationNumber"),
                employerDic: clientData.get("TaxPayerNumber")
            },
            employment: {
                employedFrom: parseObj(clientData.get("MonthFrom")) + "/" + parseObj(clientData.get("YearFrom")),
                employmentDays: clientData.get("NumberOfDaysEmployment"),
                minBaseSalaryAmount: clientData.get("BaseIncome"),
                avgBaseSalaryInMonthsAmount: clientData.get("AverageIncomeBase"),
                alternativeSalaryAmount: clientData.get("AgreementAmount")
            },
            socialSecurity: {
                insuredDays: clientData.get("NumberOfDaysInsurance"),
                socialSecurityAmmount: clientData.get("PensionAmount"),
                signedUpDays: clientData.get("NumberOfDaysRegistration")
            },
        }
    };

    /* Data for SocialSecurityAnsweres */
    $scope.socialSecurityResponse = response;
    $scope.findAnswerText = function (array, questionNr) {

        var selLang = selectedLang; /* selectedLang is set "globally" */

        var ans1 = {
            "en-US": "Yes",
            "cs-CZ": "Ano",
            "sk-SK": "Áno"
        };
        var ans0 = {
            "en-US": "No",
            "cs-CZ": "Ne",
            "sk-SK": "Nie"
        };
        var ans2 = {
            "en-US": "An error occured during execution",
            "cs-CZ": "Při zpracování došlo k chybě",
            "sk-SK": "Pri spracovaní došlo k chybe"
        };
        var ans9 = {
            "en-US": "The answer is not available",
            "cs-CZ": "Odpověď na otázku není dostupná",
            "sk-SK": "Odpoveď na otázku nie je dostupná"
        };

        var ans1InSelectedLanguage = ans1[selLang];
        var ans0InSelectedLanguage = ans0[selLang];
        var ans2InSelectedLanguage = ans2[selLang];
        var ans9InSelectedLanguage = ans9[selLang];

        var answerId = $scope.findAnswer(array, questionNr);
        if (answerId === '1') return ans1InSelectedLanguage; /* ANO */
        if (answerId === '0') return ans0InSelectedLanguage; /* NIE */
        if (answerId === '2') return ans2InSelectedLanguage; /* Chyba */
        if (answerId === '9') return ans9InSelectedLanguage; /* Nie je dostupná */
    };

    $scope.findAnswer = function (array, questionNr) {
        if (array === undefined) return {};

        var obj = array.filter(function (obj) {
            return obj.get("@Number") === questionNr.toString();
        })[0];

        return obj.get("@Answer");
    };

    $scope.getAnswerClass = function (answerId) {
        if (answerId === '1') return "rptSuccess";
        if (answerId === '0') return "";
        if (answerId === '2') return "rptError";
        if (answerId === '9') return "rptFault";
    };

    function parseObj(obj) {
        if (JSON.stringify({}) == JSON.stringify(obj)) return "";
        else return obj.toString();
    };

    /* Sociálna poisťovňa - Questions */
    /* var questions = [
        1. Je {{subjectDetails.clientId}} zamestnaný kdekoľvek?
        2. Je {{subjectDetails.clientId}} zamestnaný u {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}}?
        3. Je {{subjectDetails.clientId}} zamestnaný u {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} aspoň od {{subjectDetails.request.employment.employedFrom}}, {{subjectDetails.request.employment.employedFrom}}?
        4. Je {{subjectDetails.clientId}} zamestnaný aspoň {{subjectDetails.request.employment.employmentDays}} dní?
        5. Má {{subjectDetails.clientId}} za posledný mesiac, t.j. minulý kalendárny u zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} vymeriavací základ aspoň {{subjectDetails.request.employment.minBaseSalaryAmount}} EUR?
        6. Má {{subjectDetails.clientId}} za predposledný mesiac u zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} vymeriavací základ aspoň {{subjectDetails.request.employment.minBaseSalaryAmount}} EUR?
        7. Má {{subjectDetails.clientId}} za predpredposledný mesiac u zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} vymeriavací základ aspoň {{subjectDetails.request.employment.minBaseSalaryAmount}} EUR?
        8. Má {{subjectDetails.clientId}} za posledný mesiac (t.j. minulý kalendárny) vymeriavací základ od všetkých zamestnávateľov aspoň {{subjectDetails.request.employment.minBaseSalaryAmount}} EUR?
        9. Má {{subjectDetails.clientId}} za predposledný mesiac vymeriavací základ od všetkých zamestnávateľov aspoň {{subjectDetails.request.employment.minBaseSalaryAmount}} EUR?
        10. Má {{subjectDetails.clientId}} za predpredposledný mesiac vymeriavací základ od všetkých zamestnávateľov aspoň {{subjectDetails.request.employment.minBaseSalaryAmount}} EUR?
        11. Trvalo poistenie {{subjectDetails.clientId}} u zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} za posledných {{subjectDetails.request.monthsNr}} mesiacov viac ako {{subjectDetails.request.socialSecurity.insuredDays}} dní?
        12. Je {{subjectDetails.clientId}} poberateľom invalidného dôchodku?
        13. Je {{subjectDetails.clientId}} poberateľom starobného dôchodku (vrátane predčasného starobného dôchodku)?
        14. Je {{subjectDetails.clientId}} poberateľom dôchodku aspoň (súhrnná výška dôchodkov) vo výške {{subjectDetails.request.socialSecurity.socialSecurityAmmount}}?
        15. Má {{subjectDetails.clientId}} zrážky z dôchodku?
        16. Má {{subjectDetails.clientId}} u zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} priemerný vymeriavací základ za posledných {{subjectDetails.request.monthsNr}} mesiacov aspoň {{subjectDetails.request.employment.avgBaseSalaryInMonthsAmount}}?
        17. Má {{subjectDetails.clientId}} priemerný vymeriavací základ za posledných {{subjectDetails.request.monthsNr}} mesiacov aspoň {{subjectDetails.request.employment.avgBaseSalaryInMonthsAmount}}?
        18. Je {{subjectDetails.clientId}} zamestnaný na základe dohody o pracovnej činnosti?
        19. Je {{subjectDetails.clientId}} zamestnaný u zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} na základe dohody o pracovnej činnosti?
        20. Má {{subjectDetails.clientId}} z dohody o pracovnej činnosti priemerný vymeriavací základ za posledných {{subjectDetails.request.monthsNr}} mesiacov aspoň {{subjectDetails.request.employment.alternativeSalaryAnount}}?
        21. Je počet dní od prijatia prihlášky {{subjectDetails.clientId}} od zamestnávateľa {{subjectDetails.request.employer.employerIco}}/{{subjectDetails.request.employer.employerDic}} väčší ako {{subjectDetails.request.socialSecurity.signedUpDays}}?
        22. Bol {{subjectDetails.clientId}} zamestnaný u viacerých zamestnávateľov súčasne ku koncu predchádzajúceho kalendárneho mesiaca?
        23. Je {{subjectDetails.clientId}} registrovaný ako SZČO v systéme SP ku koncu predchádzajúceho obdobia?
    ]; */
});