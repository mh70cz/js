let srcStr_xsi = `<request RequestID="dba3157c-1ff7-4060-98e7-2deece50745f" OwnerID="54c12c05-21da-4591-838d-4bc814d34a9c" DirectoryID="306740ac-3301-483f-9213-a21dd37c9095" Code="L210502N7ETZ642" Type="LC" Created="2021-05-02T07:46:47.233Z" LastUpdate="2021-05-02T07:49:14.787Z" Status="0" VersionNumber="1" BranchId="" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" >
<LCContract name="contract" isNew="false" version="2" >
    <CalculatedOfferNumber>1</CalculatedOfferNumber>
    <CampaignCode>KAMPAN_PRO_FC_KREDIT_V_18_118</CampaignCode>`;

let srcStr = `<request RequestID="dba3157c-1ff7-4060-98e7-2deece50745f" OwnerID="54c12c05-21da-4591-838d-4bc814d34a9c" DirectoryID="306740ac-3301-483f-9213-a21dd37c9095" Code="L210502N7ETZ642" Type="LC" Created="2021-05-02T07:46:47.233Z" LastUpdate="2021-05-02T07:49:14.787Z" Status="0" VersionNumber="1" BranchId="" 
 >
<LCContract name="contract" isNew="false" version="2" >
    <CalculatedOfferNumber>1</CalculatedOfferNumber>
    <CampaignCode>KAMPAN_PRO_FC_KREDIT_V_18_118</CampaignCode>`;

// let inStr = srcStr;
// inStr = inStr.replace("\n", " ");

// let reRquElem = /<request RequestID.*>/gm;
// let arrRe = reRquElem.exec(inStr);

// // console.log(arr);

// let rquElem = arrRe[0];

// // console.log(rquElem);

// if (!rquElem.includes("xmlns:xsi")) {
//   // console.log("neobsahuje xmlns:xsi");
//   rquElem = rquElem.replace(
//     ">",
//     'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance >"'
//   );
//   let outStr = inStr.replace(reRquElem, rquElem);
//   console.log("added xmlns:xsi");
//   // console.log(outStr);
// } else {
//   // console.log("uz obsahuje xmlns:xsi - neni co resit");
// }

let addXmlns = function (inStr) {
  nsToAdd = 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';

  inStr = inStr.replace("\n", " ");

  let reRquElem = /<request RequestID.*>/gm;
  let arrRe = reRquElem.exec(inStr);

  // console.log(arr);

  let rquElem = arrRe[0];

  // console.log(rquElem);

  if (!rquElem.includes("xmlns:xsi")) {
    // console.log("neobsahuje xmlns:xsi");
    rquElem = rquElem.replace(">", nsToAdd + " >");
    let outStr = inStr.replace(reRquElem, rquElem);
    console.log("added xmlns:xsi");
    // console.log(outStr);
    return outStr;
  } else {
    // console.log("uz obsahuje xmlns:xsi - neni co resit");
    return inStr;
  }
};


let out = addXmlns(srcStr_xsi);
console.log(out);