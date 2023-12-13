import Downloads from "../models/downloads.js";

export const insertDownload = async (req, res) => {
    try {
        const { ownerAddress, tokenId, type } = req.body;
        const download = new Downloads({ ownerAddress, tokenId, type });
        await download.save();
        res.status(201).json({ message: "Download data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllDownloads = async (req, res) => {
    try {
        const downloadData = await Downloads.find();
        res.json(downloadData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDownloadsByOwner = async (req, res) => {
    const { ownerAddress } = req.params;
    try {
        const items = await Downloads.find({ ownerAddress });
        return items;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching items by owner");
    }
};

export const getDownloadsByTokenId = async (req, res) => {
    const { tokenId } = req.params;
    try {
        const items = await Downloads.find({ tokenId });
        return items;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching items by token ID");
    }
};

export const getDownloadsByTokenType = async (req, res) => {
    const { type } = req.params;
    try {
        const items = await Downloads.find({ type });
        return items;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching items by Horse type");
    }
};

export const deleteDownloadsByOwner = async (req, res) => {
    const { ownerAddress } = req.params;
    try {
        await Downloads.deleteMany({ ownerAddress });
        res.json({
            message: "Downloads deleted successfully for owner address",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteDownloadsByTokenId = async (req, res) => {
    const { tokenId } = req.params;
    try {
        await Downloads.deleteMany({ tokenId });
        res.json({ message: "Downloads deleted successfully for token ID" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteDownloadsByType = async (req, res) => {
    const { type } = req.params;
    try {
        await Downloads.deleteMany({ type });
        res.json({ message: "Downloads deleted successfully for token ID" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
