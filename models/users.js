const mongoose = require("mongoose");
const moment = require("moment");
const { ObjectId } = mongoose.Schema.Types;
const Advertisement = require("./ads");
const Response = require("./responses");

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  buyer: Boolean,
  advertisements: [{ type: ObjectId, ref: "Advertisement" }],
  responses: [{ type: ObjectId, ref: "Response" }],
  info: {
    phone: Number,
    email: String,
    inn: String,
    companyname: String
  },
  approvedAds: [{ type: ObjectId, ref: "Advertisement" }]
});

userSchema.methods.addAdvertisement = async function(
  title,
  description,
  category,
  district,
  city
) {
  let AddGenerated = new Advertisement({
    title: title,
    description: description,
    category: category,
    author: this.id,
    // executor: null,
    district: district,
    city: city,
    responses: [],
    expdate: moment(new Date())
      .add(3, "d")
      .toDate()
  });
  this.advertisements.push(AddGenerated);
  await AddGenerated.save();
  await this.save();
};

userSchema.methods.addResponse = async function(price, advertisement_id) {
  let ResponseGenerated = new Response({
    author: this.id,
    advertisement: advertisement_id,
    price: price
  });
  this.responses.push(ResponseGenerated);
  await ResponseGenerated.save();
  await this.save();
  const add = await Advertisement.findById(advertisement_id);
  add.responses.push(ResponseGenerated);
  // add.executor = this.id;
  await add.save();
};

userSchema.methods.chooseSupplier = async function(
  advertisement_id,
  supplier_id
) {
  const add = await Advertisement.findById(advertisement_id);
  add.executor = supplier_id;
  await add.save();
// const supplier = await Advertisement.findById(advertisement_id);
//   approvedAds;
//    await supplier.save();
  // todo

};

module.exports = mongoose.model("User", userSchema);

// date comparision
// Current Date
// var g1 = new Date();
// var g2 = new Date();
// if (g1.getTime() === g2.getTime())
