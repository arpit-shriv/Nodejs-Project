const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./reviews.js');

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url : String,
    filename : String,
    // type: String,
    // default:
    //   "https://c4.wallpaperflare.com/wallpaper/140/362/401/man-made-room-new-york-penthouse-wallpaper-preview.jpg",
    // set: (v) =>
    //   v === ""
    //     ? "https://c4.wallpaperflare.com/wallpaper/140/362/401/man-made-room-new-york-penthouse-wallpaper-preview.jpg"
    //     : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner : {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry : {
    type : {
      type : String,
      enum : ['Point'],
      required : true
    },
    coordinates: {
      type : [Number],
      required : true
    }
  }
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
