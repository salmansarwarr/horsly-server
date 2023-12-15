import mongoose from "mongoose";

const viewsSchema = mongoose.Schema({
    tokenId: { type: String, require: true },
    type: { type: String, require: true },
    views: { type: Number, require: true },
});

export default mongoose.model("views", viewsSchema);
