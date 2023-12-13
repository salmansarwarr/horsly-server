import mongoose from "mongoose";

const downloadsSchema = mongoose.Schema({
    ownerAddress: { type: String, require: true },
    tokenId: { type: String, require: true },
    type: { type: String, require: true },
});

export default mongoose.model("downloads", downloadsSchema);
