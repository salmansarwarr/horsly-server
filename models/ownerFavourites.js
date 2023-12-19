import mongoose from "mongoose";

const ownedFavourites = mongoose.Schema({
    ownerAddress: { type: String, require: true },
    tokenId: { type: Number, require: true },
    isFavourite: { type: Boolean, require: true },
});

export default mongoose.model("ownedFavourites", ownedFavourites);
