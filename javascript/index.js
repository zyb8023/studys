// const arr = [1, 2, 3, 4];



// // json去重
// const filterTds = getFontIds(objects).filter((item, index, self) => {
//   return self.findIndex(el => el.worksId === item.worksId) === index;
// });


const obj = {
  a: '1',
  b: '2',
  c: '3'
}


for(const k in obj) {
  console.log(k);
  console.log(obj[k])
}