const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../model/listing.js");

main()
  .then(() => {
    console.log("connected to  DB");
  })
  .catch((err) => {
    console.console.log(err);
  });
async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "678f46da9920a84c277bf1ce",
  }));
  Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
