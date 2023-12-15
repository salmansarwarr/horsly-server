import ViewsModel from "../models/views.js";

const getAllViews = async (req, res) => {
    try {
        const views = await ViewsModel.find();
        res.status(200).json(views);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getViewsByTokenId = async (req, res) => {
    const { tokenId } = req.params;
    try {
        const views = await ViewsModel.findOne({ tokenId });
        if (!views) {
            return res
                .status(404)
                .json({ error: "Views not found for the given tokenId" });
        }
        res.status(200).json(views);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addViews = async (req, res) => {
    const { tokenId, type, views } = req.body;

    if (!tokenId || !type || !views) {
        return res
            .status(400)
            .json({ error: "tokenId, type, and views are required fields" });
    }

    try {
        const newViews = new ViewsModel({ tokenId, type, views });
        const savedViews = await newViews.save();
        res.status(201).json(savedViews);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getViewsByType = async (req, res) => {
    const { type } = req.params;
    try {
        const views = await ViewsModel.find({ type });
        if (!views || views.length === 0) {
            return res
                .status(404)
                .json({ error: "Views not found for the given type" });
        }
        res.status(200).json(views);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { getAllViews, getViewsByTokenId, addViews, getViewsByType };
