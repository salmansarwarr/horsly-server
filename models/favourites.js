import mongoose from "mongoose";

const favouritesSchema = mongoose.Schema({
    tokenId: { type: String, require: true },
    type: { type: String, require: true },
    favourites: { type: Number, require: true },
});

export default mongoose.model("favourites", favouritesSchema);
