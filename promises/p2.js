function prVal(val){
    const pVal = Promise.resolve(val);
    console.log("from prVal; type of pVal ", typeof(pVal));
    return pVal;
}


function outerFunc(){
    const pVal = prVal(42);
    console.log("from prVal; type of pVal ", typeof(pVal));
    return pVal;
}


outerFunc()
// first then in outerFunc
.then(value => {
    console.log(value)
    return value;    
})

// second then in outerFunc
.then(() => {
    const five = 5;
    return five;
})

// thirth then in outerFunc
.then(value => console.log(value))

// fourth then in outerFunc
.then(() => {
    return prVal(7);
})

// fifth then in outerFunc
.then(value => console.log(value))



/* prVal(42)
.then(value => console.log(value)) */
