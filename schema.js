const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    category: Joi.string()
      .valid(
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
        "eco retreats"
      ),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5),
  }).required(),
});
