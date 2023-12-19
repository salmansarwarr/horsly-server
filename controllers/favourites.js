import FavouritesModel from "../models/favourites.js";
import OwnerFavouritesModel from "../models/ownerFavourites.js";

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
    const { ownerAddress, tokenId, type, isFavourite } = req.body;

    if (!tokenId) {
        return res.status(400).json({
            error: "tokenId is required field",
        });
    }

    try {
        // Try to find an existing document with the given tokenId
        const existingFavourites = await FavouritesModel.findOne({ tokenId });

        const ownedFavourite = await OwnerFavouritesModel.findOne({
            ownerAddress,
            tokenId,
        });

        if (existingFavourites) {
            // If the document exists, update its favourites
            if (isFavourite == true) {
                existingFavourites.favourites = existingFavourites.favourites + 1;

                ownedFavourite.isFavourite = true;
                
            } else if (existingFavourites.favourites > 0) {
                existingFavourites.favourites = existingFavourites.favourites - 1;

                ownedFavourite.isFavourite = false;
            }
            const updatedFavourites = await existingFavourites.save();
            const updatedOwnedFavourites = await ownedFavourite.save();
            res.status(200).json(updatedFavourites, updatedOwnedFavourites);
        } else {
            // If the document doesn't exist, create a new one
            const newFavourites = new FavouritesModel({
                tokenId,
                type,
                favourites: 1,
                ownerAddress,
            });
            const newOwnedFavourite = new FavouritesModel({
                ownerAddress,
                tokenId,
                isFavourite: true
            })
            const savedFavourites = await newFavourites.save();
            const savedOwnedFavourites = await newOwnedFavourite.save();
            res.status(201).json(savedFavourites, savedOwnedFavourites);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const isFavouritedByOwner = async (req, res) => {
    const { tokenId, ownerAddress } = req.params;

    if (!tokenId || !ownerAddress) {
        return res.status(400).json({
            error: "tokenId, ownerAddress are required fields",
        });
    }

    try {
        // Check if there is a document with the given tokenId and ownerAddress
        const existingFavourites = await OwnerFavouritesModel.findOne({
            tokenId,
            ownerAddress,
        });

        if (existingFavourites && existingFavourites.isFavourite == true) {
            // The owner has favorited the tokenId
            res.status(200).json({ isFavourited: true });
        } else {
            // The owner has not favorited the tokenId
            res.status(200).json({ isFavourited: false });
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
    isFavouritedByOwner,
};
