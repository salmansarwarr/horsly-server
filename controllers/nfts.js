import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config();

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.ALCHEMY_API,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export const getOwnedNfts = async (req, res) => {
    const { contractAddress, owner } = req.params;

    try {
        const nfts = await alchemy.nft.getNftsForOwner(owner, {
            contractAddresses: [contractAddress],
        });
        res.status(200).json({
            data: nfts,
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getNftDetails = async (req, res) => {
    const { contractAddress, tokenId } = req.params;

    try {
        const nftDetails = await alchemy.nft.getNftMetadata(
            contractAddress,
            tokenId
        );
        res.status(200).json({
            data: nftDetails,
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
