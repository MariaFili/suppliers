const moment = require("moment");


//  день в виде объекта Date
let dateNow = new Date();
// console.log("datenow", dateNow);
// получение дня истечения (+3 дня) ТАКЖЕ в виде объекта Date
const dateExpiry = moment(dateNow).add(3, "d").toDate();
// console.log("dateExpiry", dateExpiry);
// возможно пригодится - другой обеъект типа времени с библиотекой moment
const newdateExpiryObj = moment(dateExpiry);
// из этого нового объекта типа moment получаем понятную нам дату по свойству _d
console.log("newdateExpiryObj day", newdateExpiryObj._d);
