import express from "express";
import {
    deleteDownloadsByOwner,
    deleteDownloadsByTokenId,
    getAllDownloads,
    getDownloadsByOwner,
    getDownloadsByTokenId,
    insertDownload,
} from "../controllers/downloads.js";

const router = express.Router();

router.get("/", getAllDownloads);
router.get("/:ownerAddress", getDownloadsByOwner);
router.get("/:tokenId", getDownloadsByTokenId);
router.post("/", insertDownload);
router.delete("/deleteById/:tokenId", deleteDownloadsByTokenId);
router.delete("/deleteByAddress/:ownerAddress", deleteDownloadsByOwner);

export default router;

// ALCHEMY_API=vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S
