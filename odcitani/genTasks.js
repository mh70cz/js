function genTaskArr() {
  let taskArr = [];
  for (let outer_index = 11; outer_index < 19; outer_index++) {
    for (let inner_index = outer_index - 9; inner_index < 10; inner_index++) {
      //console.log(outer_index, inner_index);
      taskArr.push([outer_index, inner_index]);
    }
  }
  return taskArr;
}

const taskArr = genTaskArr();
// console.log(taskArr);

//console.log("taskArr length " + taskArr.length);

let rndIdx = Math.floor(Math.random() * taskArr.length);
console.log(rndIdx);
