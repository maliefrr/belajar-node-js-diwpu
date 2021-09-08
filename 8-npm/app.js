const validator = require('validator');
const chalk = require('chalk')

// console.log(validator.isEmail('aliefm144@gmail.ac'));
console.log(validator.isMobilePhone('+6281363818152','id-ID'))

const tulisan = chalk`
    Aku Mau tes menulis kata , aku gk tau {black.bgGreen mau nulis apa} tapi karena masih belajar yaudah lah ya wkwk
    Yeaaay Ternyata {black.bgYellow Berhasil}
`;

console.log(tulisan)