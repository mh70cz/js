Promise.resolve(42)
    .then(value => value * 2)        // returns Promise<84>
    .then(value => "hello")          // returns Promise<"hello">
    .then(value => null)             // returns Promise<null>
    .then(value => {                 // returns Promise<{num: 42}>
        return { num: 42 };
    })
    .then(value => {
        // even if you don't return anything
    });                              // returns Promise<undefined>

// Even if you return a plain value, it gets wrapped in a Promise
function processValue(value) {
    return value * 2;  // returns 84
}

Promise.resolve(42)
    .then(value => processValue(value))  // still returns Promise<84>
    .then(result => {
        console.log(result);  // 84
    });