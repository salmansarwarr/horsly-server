import Downloads from "../models/downloads.js";
import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";
import { ethers } from "ethers";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.ALCHEMY_API,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET,
    },
});

export const insertDownload = async (req, res) => {
    try {
        const {
            ownerAddress,
            tokenId,
            type,
            signature,
            message,
            contractAddress,
        } = req.body;

        const recoveredAddress = await ethers.verifyMessage(message, signature);

        // Step 2: Compare ownerAddress and recoveredAddress (converted to lowercase)
        if (ownerAddress.toLowerCase() !== recoveredAddress.toLowerCase()) {
            throw new Error("Signature verification failed");
        }

        // Verification for owned nft
        const ownedURL = `https://horsly-server.vercel.app/nfts/${contractAddress}/${tokenId}`;

        const response = await fetch(ownedURL);
        const { data } = await response.json();

        if (
            data?.mint?.mintAddress.toLowerCase() !== ownerAddress.toLowerCase()
        ) {
            throw new Error("Signature verification failed");
        }

        // Step 3: Select the download URL from download-type object store and save the download data
        const downloadUrl = await getDownloadUrl(type.toLowerCase());
        const download = new Downloads({
            ownerAddress,
            tokenId,
            type,
            downloadUrl,
        });
        await download.save();

        // Step 6: Return the selected PDF URL in the response
        res.status(201).json({
            message: "Download data saved successfully",
            downloadUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Helper function to get downrload URL based on the type
const getDownloadUrl = async (key) => {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    const finalKey = capitalizedKey + ".pdf";

    const command = new GetObjectCommand({
        Bucket: 'nftproyect',
        Key: finalKey,
    })
    
    const url = await getSignedUrl(s3Client, command, {expiresIn: 60});
    
    return url;
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
        res.json(items);
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching items by owner");
    }
};

export const getDownloadsByTokenId = async (req, res) => {
    const { tokenId } = req.params;
    try {
        const items = await Downloads.find({ tokenId });
        res.json(items);
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching items by token ID");
    }
};

export const getDownloadsByTokenType = async (req, res) => {
    const { type } = req.params;
    try {
        const items = await Downloads.find({ type });
        res.json(items);
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
