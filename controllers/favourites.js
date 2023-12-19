import FavouritesModel from "../models/favourites.js";

const getAllFavourites = async (req, res) => {
    try {
        const favourites = await FavouritesModel.find();
        res.status(200).json(favourites);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getFavouritesByTokenId = async (req, res) => {
    const { tokenId } = req.params;
    try {
        const favourites = await FavouritesModel.findOne({ tokenId });
        res.status(200).json(favourites);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getFavouritesByType = async (req, res) => {
    const { type } = req.params;
    try {
        const favourites = await FavouritesModel.find({ type });
        if (!favourites || favourites.length === 0) {
            return res
                .status(404)
                .json({ error: "Favourites not found for the given type" });
        }
        res.status(200).json(favourites);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addFavourites = async (req, res) => {
    const { tokenId, type, favourites } = req.body;

    if (!tokenId || !type || !favourites) {
        return res
            .status(400)
            .json({
                error: "tokenId, type, and favourites are required fields",
            });
    }

    try {
        // Try to find an existing document with the given tokenId
        const existingFavourites = await FavouritesModel.findOne({ tokenId });

        if (existingFavourites) {
            // If the document exists, update its favourites
            existingFavourites.favourites = favourites;
            const updatedFavourites = await existingFavourites.save();
            res.status(200).json(updatedFavourites);
        } else {
            // If the document doesn't exist, create a new one
            const newFavourites = new FavouritesModel({
                tokenId,
                type,
                favourites,
            });
            const savedFavourites = await newFavourites.save();
            res.status(201).json(savedFavourites);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export {
    getAllFavourites,
    getFavouritesByTokenId,
    getFavouritesByType,
    addFavourites,
};
