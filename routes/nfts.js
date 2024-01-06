import express from 'express';
import { getNftDetails, getMintedNftsForContract, getOwnedNfts } from '../controllers/nfts.js';

const router = express.Router();

router.get('/owned/:contractAddress/:owner', getOwnedNfts);
router.get('/nftsByContract/:contractAddress', getMintedNftsForContract)
router.get('/:contractAddress/:tokenId', getNftDetails);

export default router;

/**
 * @swagger
 * /nfts/{contractAddress}/owners/{owner}:
 *   get:
 *     summary: Get owned NFTs
 *     parameters:
 *       - in: path
 *         name: contractAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: Address of the NFT contract
 *       - in: path
 *         name: owner
 *         schema:
 *           type: string
 *         required: true
 *         description: Owner address for filtering owned NFTs
 *     responses:
 *       200:
 *         description: Returns an array of owned NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /nfts/{contractAddress}/details/{tokenId}:
 *   get:
 *     summary: Get details of a specific NFT
 *     parameters:
 *       - in: path
 *         name: contractAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: Address of the NFT contract
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Token ID of the NFT
 *     responses:
 *       200:
 *         description: Returns details of the specified NFT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NFTDetails:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 */
