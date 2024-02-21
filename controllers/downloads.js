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
        console.log(data);

        if (
            data?.mint?.mintAddress?.toLowerCase() !== ownerAddress?.toLowerCase()
        ) {
            throw new Error("Signature verification failed");
        }

        // Step 3: Select the download URL from download-type object store and save the download data
        const urlsArray = await getDownloadUrl(type.toLowerCase());
        const downloadUrls = urlsArray.map((url, i) => (
            {
                name: `${type.toLowerCase()}-${i + 1}`,
                url
            }
        ))
        const download = new Downloads({
            ownerAddress,
            tokenId,
            type,
            downloadUrls,
        });
        await download.save();

        // Step 6: Return the selected PDF URL in the response
        res.status(201).json({
            message: "Download data saved successfully",
            downloadUrls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Helper function to get downrload URL based on the type
const getDownloadUrl = async (key) => {
    let file1, file2, file3, file4
    
    if(key.toLowerCase().includes("sparkatto")) {
        file1 = "Sparkatto-1 of 4-V350163399.gz";
        file2 = "Sparkatto-2 of 4-V350163399.gz";
        file3 = "Sparkatto-3 of 4-V350163399.gz";
        file4 = "Sparkatto-4 of 4-V350163399.gz";
    } else if(key.toLowerCase().includes("quitena") || key.toLowerCase().includes("quiteña")) {
        file1 = "Quitena-1 of 4-V350163399.gz";
        file2 = "Quitena-2 of  4-V350163399.gz";
        file3 = "Quitena-3 of 4-V350163399.gz";
        file4 = "Quitena-4 of 4-V350163399.gz";
    }

    const command1 = new GetObjectCommand({
        Bucket: 'nftproyect',
        Key: file1,
    })
    const command2 = new GetObjectCommand({
        Bucket: 'nftproyect',
        Key: file2,
    })
    const command3 = new GetObjectCommand({
        Bucket: 'nftproyect',
        Key: file3,
    })
    const command4 = new GetObjectCommand({
        Bucket: 'nftproyect',
        Key: file4,
    })
    
    const url1 = await getSignedUrl(s3Client, command1, {expiresIn: 40});
    const url2 = await getSignedUrl(s3Client, command2, {expiresIn: 40});
    const url3 = await getSignedUrl(s3Client, command3, {expiresIn: 40});   
    const url4 = await getSignedUrl(s3Client, command4, {expiresIn: 40});
    
    return [encodeURI(url1), encodeURI(url2), encodeURI(url3), encodeURI(url4)];
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
