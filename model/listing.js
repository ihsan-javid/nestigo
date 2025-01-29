const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
      "all",
      "trending",
      "rooms",
      "iconic cities",
      "mountains",
      "castles",
      "arctic",
      "camping",
      "forms",
      "boats",
      "domes",
      "beaches",
      "deserts",
      "forests",
      "lakes",
      "caves",
      "villas",
      "treehouses",
      "luxury stays",
      "tiny homes",
      "farm stays",
      "hiking spots",
      "glamping",
      "eco retreats",
    ],
    reduired: true,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
