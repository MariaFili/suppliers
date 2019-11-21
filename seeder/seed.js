const mongoose = require("mongoose");
const User = require("../models/users");
const Advertisement = require("../models/ads");
mongoose.connect("mongodb://localhost:27017/tender", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
async function seedall() {
  let user = new User({
    login: "userOne",
    password: "password1",
    buyer: true,
    advertisements: [],
    responses: [],
    info: {
      phone: 1111111,
      email: "userOne@email.ru",
      inn: 1111111000,
      companyname: "ИП Иванов"
    }
  });
  await user.save();
  let user2 = new User({
    login: "userTwo",
    password: "password2",
    buyer: true,
    advertisements: [],
    responses: [],
    info: {
      phone: 2222222,
      email: "userTwo@email.ru",
      inn: 22222220000,
      companyname: "ИП Петров"
    }
  });
  await user2.save();
  user3 = new User({
    login: "userThree",
    password: "password3",
    buyer: true,
    advertisements: [],
    responses: [],
    info: {
      phone: 3333333,
      email: "useThree@email.ru",
      inn: 33333330000,
      companyname: "ИП Сидоров"
    }
  });
  await user3.save();
  user4 = new User({
    login: "sellerOne",
    password: "password4",
    buyer: false,
    advertisements: [],
    responses: [],
    info: {
      phone: 2222000,
      email: "sellerOne@email.ru",
      inn: 00022220000,
      companyname: "Lukoil"
    }
  });
  await user4.save();
  user5 = new User({
    login: "sellerTwo",
    password: "password5",
    buyer: false,
    advertisements: [],
    responses: [],
    info: {
      phone: 1111000,
      email: "sellerTwo@email.ru",
      inn: 00011110000,
      companyname: "Gazprom"
    }
  });
  await user5.save();
  user6 = new User({
    login: "sellerThree",
    password: "password6",
    buyer: false,
    advertisements: [],
    responses: [],
    info: {
      phone: 3333000,
      email: "sellerThree@email.ru",
      inn: 000033330000,
      companyname: "BP"
    }
  });
  await user6.save();
  let userOne = await User.findOne({ login: "userOne" });
  // let add=['Куплю цемент',"Куплю 5 мешков цемента","Стройматериалы","Центральный","Москва"]
  await userOne.addAdvertisement(
    "Куплю гравий",
    "Куплю 5 мешков гравия",
    "Стройматериалы",
    "Центральный",
    "Москва"
  );
  await userOne.addAdvertisement(
    "Куплю цемент",
    "Куплю 5 мешков цемента",
    "Стройматериалы",
    "Центральный",
    "Москва"
  );
  await userOne.addAdvertisement(
    "Куплю цемент",
    "Куплю 15 мешков цемента",
    "Стройматериалы",
    "Уральский",
    "Екатеринбург"
  );
  await userOne.addAdvertisement(
    "Куплю ацетон",
    "Куплю 100 литров ацетона",
    "Химическая продукция",
    "Уральский",
    "Екатеринбург"
  );
  let userTwo = await User.findOne({ login: "userTwo" });
  await userTwo.addAdvertisement(
    "Куплю щебенку",
    "Куплю 22 мешков щебня",
    "Стройматериалы",
    "Центральный",
    "Москва"
  );
  await userTwo.addAdvertisement(
    "Куплю ацетон в Екб",
    "Куплю 200 литров ацетона",
    "Химическая продукция",
    "Уральский",
    "Екатеринбург"
  );
  await userTwo.addAdvertisement(
    "Куплю МРТ",
    "Куплю MRT Toyota",
    "Медицинское оборудование",
    "Центральный",
    "Москва"
  );
  await userTwo.addAdvertisement(
    "Куплю МРТ",
    "Куплю MRT Toyota",
    "Медицинское оборудование",
    "Приволжский",
    "Нижний Новгород"
  );
  let userThree = await User.findOne({ login: "userThree" });
  await userThree.addAdvertisement(
    "Куплю буклеты",
    "Куплю 3000 буклетов ко дню города",
    "Полиграфия",
    "Центральный",
    "Москва"
  );
  await userThree.addAdvertisement(
    "Куплю буклеты",
    "Куплю 2000 буклетов ко дню города",
    "Полиграфия",
    "Приволжский",
    "Нижний Новгород"
  );
  await userThree.addAdvertisement(
    "Куплю станки",
    "Куплю 3 станка DF678",
    "Промышленное оборудование",
    "Центральный",
    "Москва"
  );
  await userThree.addAdvertisement(
    "Куплю станки",
    "Куплю 3 станка DF678",
    "Промышленное оборудование",
    "Приволжский",
    "Нижний Новгород"
  );
  // let add1 = await Advertisement.findOne({ title: "Куплю цемент" });
  // console.log("add1", add1);
  let add1Moscow = await Advertisement.findOne({
    title: "Куплю цемент",
    city: "Москва"
  });
  let add2EKB = await Advertisement.findOne({
    title: "Куплю цемент",
    city: "Екатеринбург"
  });
  console.log("finished adding addvertisements");
  // console.log("add1Moscow", add1Moscow);
  let sellerOne = await User.findOne({ login: "sellerOne" });
  await sellerOne.addResponse(100500, add1Moscow);
  let sellerTwo = await User.findOne({ login: "sellerTwo" });
  await sellerTwo.addResponse(120500, add1Moscow);
  await sellerTwo.addResponse(20500, add2EKB);
  let sellerThree = await User.findOne({ login: "sellerThree" });
  await sellerThree.addResponse(130500, add1Moscow);
  await sellerThree.addResponse(30500, add2EKB);
  console.log("finished adding responses");
  mongoose.disconnect();
}
seedall();
